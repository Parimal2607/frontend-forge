import path from "path";
import { copyTemplateDir, type CopyStats } from "./copyTemplate.js";
import type { ProjectStructure } from "./detectProjectStructure.js";

export async function copyModules(
  modules: string[],
  structure: ProjectStructure,
  architecture: string
): Promise<CopyStats> {
  const stats: CopyStats = { created: 0, skipped: 0, failed: 0 };

  for (const module of modules) {
    const result = await copyTemplateDir(path.join("modules", module), {
      structure,
      architecture,
      remapCore: module === "core",
      exclude: (filePath) => filePath.endsWith("module.ts"),
    });

    stats.created += result.created;
    stats.skipped += result.skipped;
    stats.failed += result.failed;
  }

  return stats;
}
