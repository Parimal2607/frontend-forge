import fs from "fs";
import path from "path";

export function detectLanguage(cwd: string): string {
  return fs.existsSync(path.join(cwd, "tsconfig.json")) ? "TypeScript" : "JavaScript";
}
