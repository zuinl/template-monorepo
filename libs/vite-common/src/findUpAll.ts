import path from "node:path";
import fs from "node:fs";

export function findUpAll(fileNames: string[], startDir: string) {
  let currentDir = path.resolve(startDir);

  while (true) {
    const found = fileNames.every((file) => fs.existsSync(path.join(currentDir, file)));

    if (found) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return undefined;
    }

    currentDir = parentDir;
  }
}
