import { createTemplate } from "bingo";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import pkgJson from "../package.json" with { type: "json" };

type TemplateDirectory = Record<string, TemplateEntry | undefined>;
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
    directory[entry.name] = [content, { executable }];
  }

  return directory;
}

const templateDirectory = fileURLToPath(new URL("./files", import.meta.url));
const templateFiles = await readTemplateDirectory(templateDirectory);

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
    return {
      // see https://www.create.bingo/build/concepts/creations#files
      files: templateFiles,
      // see https://www.create.bingo/build/concepts/creations#scripts
      // see https://www.create.bingo/build/concepts/creations#suggestions
      suggestions: [
        // Optional: Add suggestions for users
      ],
    };
  },
});
