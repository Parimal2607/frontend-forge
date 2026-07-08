import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import type { ProjectStructure } from "./detectProjectStructure.js";
import { resolveTemplatePath, shouldSkipTemplatePath } from "./resolveTemplatePath.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export type CopyStats = {
  created: number;
  skipped: number;
  failed: number;
};

type CopyOptions = {
  exclude?: (filePath: string) => boolean;
  structure: ProjectStructure;
  architecture?: string;
  remapCore?: boolean;
};

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function copyTemplateDir(
  relativePath: string,
  options: CopyOptions
): Promise<CopyStats> {
  const templatePath = path.resolve(__dirname, "../templates", relativePath);
  const targetPath = process.cwd();
  const files = await getAllFiles(templatePath);
  const createdDirs = new Set<string>();

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    if (options.exclude?.(file)) {
      continue;
    }

    const relativeFile = path.relative(templatePath, file);

    if (shouldSkipTemplatePath(relativeFile)) {
      continue;
    }

    const destRelative = resolveTemplatePath(relativeFile, {
      structure: options.structure,
      architecture: options.architecture,
      remapCore: options.remapCore,
    });

    if (!destRelative) {
      continue;
    }

    const dest = path.join(targetPath, destRelative);
    const destDir = path.dirname(dest);

    try {
      if (await fs.pathExists(dest)) {
        skipped++;
        continue;
      }

      if (!createdDirs.has(destDir)) {
        await fs.ensureDir(destDir);
        createdDirs.add(destDir);
      }

      await fs.copy(file, dest);
      created++;
    } catch {
      failed++;
    }
  }

  return { created, skipped, failed };
}
