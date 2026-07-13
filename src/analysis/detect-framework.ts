import fs from "fs";
import path from "path";

export function detectFramework(cwd: string): { name: string; version?: string } {
  const pkgPath = path.join(cwd, "package.json");

  if (!fs.existsSync(pkgPath)) {
    return { name: "Unknown" };
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (deps.next) {
    return { name: "Next.js", version: deps.next.replace(/[\^~]/g, "") };
  }

  if (deps.vite) {
    return { name: "Vite", version: deps.vite.replace(/[\^~]/g, "") };
  }

  if (deps.react) {
    return { name: "React", version: deps.react.replace(/[\^~]/g, "") };
  }

  return { name: "Unknown" };
}
