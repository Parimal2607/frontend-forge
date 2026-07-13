import fs from "fs";
import path from "path";

export function detectRouting(cwd: string): string {
  if (fs.existsSync(path.join(cwd, "app"))) {
    return "app";
  }

  if (fs.existsSync(path.join(cwd, "src", "app"))) {
    return "src/app";
  }

  if (fs.existsSync(path.join(cwd, "pages"))) {
    return "pages";
  }

  if (fs.existsSync(path.join(cwd, "src", "pages"))) {
    return "src/pages";
  }

  return "app";
}
