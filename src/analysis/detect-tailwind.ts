import fs from "fs";
import path from "path";

export function detectTailwind(cwd: string): boolean {
  const patterns = [
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.mjs",
    "tailwind.config.cjs",
  ];

  return patterns.some((p) => fs.existsSync(path.join(cwd, p)));
}
