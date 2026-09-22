import { createTemplate } from "bingo";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import pkgJson from "../package.json" with { type: "json" };

interface TemplateDirectory {
  [key: string]: TemplateEntry | undefined;
}

type TemplateEntry = TemplateDirectory | string | [string] | [string, { executable?: boolean }];

async function readTemplateDirectory(directoryPath: string): Promise<TemplateDirectory> {
  const directory: TemplateDirectory = {};
  const entries = await readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const childPath = path.join(directoryPath, entry.name);
    const childStats = await stat(childPath);

    if (entry.isDirectory()) {
      directory[entry.name] = await readTemplateDirectory(childPath);
      continue;
    }

    const content = await readFile(childPath, "utf8");
    const executable = childStats.mode & 0o111 ? true : undefined;
    const targetName = entry.name.endsWith(".template")
      ? entry.name.slice(0, -".template".length)
      : entry.name;

    directory[targetName] = [content, { executable }];
  }

  return directory;
}

const templateDirectory = fileURLToPath(new URL("./files", import.meta.url));
const templateFiles = await readTemplateDirectory(templateDirectory);

function resolvePackageName(name: string) {
  const normalizedName = name.trim();
  return normalizedName.startsWith("@") ? normalizedName : `@template/${normalizedName}`;
}

export default createTemplate({
  about: {
    name: pkgJson.name,
    description: pkgJson.description,
  },

  // Define your options using Zod schemas
  options: {
    name: z.string().describe(pkgJson.name),
  },

  // Generate files based on options
  async produce({ options }) {
    const files = structuredClone(templateFiles);
    const packageName = resolvePackageName(options.name);
    const packageJsonEntry = files["package.json"];

    if (Array.isArray(packageJsonEntry) && typeof packageJsonEntry[0] === "string") {
      const updatedPackageJson = packageJsonEntry[0].replace(
        /"name"\s*:\s*"[^"]+"/,
        `"name": "${packageName}"`,
      );

      files["package.json"] = [updatedPackageJson, packageJsonEntry[1] ?? {}];
    }

    return {
      files,
      suggestions: [
        // Optional: Add suggestions for users
      ],
    };
  },
});
