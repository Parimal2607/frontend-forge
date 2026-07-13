import fs from "fs";
import path from "path";

export function detectStorybook(cwd: string, deps: Record<string, string>): boolean {
  if ("storybook" in deps) {
    return true;
  }

  if (fs.existsSync(path.join(cwd, ".storybook"))) {
    return true;
  }

  return false;
}
