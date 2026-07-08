import path from "path";
import { copyTemplateDir, type CopyStats } from "./copyTemplate.js";
import type { ProjectStructure } from "./detectProjectStructure.js";

export async function copyArchitecture(
  framework: string,
  architecture: string,
  structure: ProjectStructure
): Promise<CopyStats> {
  return copyTemplateDir(
    path.join("architectures", framework, architecture),
    { structure, architecture }
  );
}
