import fs from "fs";
import path from "path";
import { execa } from "execa";
import type { PackageManager } from "../types/package-manager.js";

export function detectPackageManager(): PackageManager | null {
  const root = process.cwd();

  if (fs.existsSync(path.join(root, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  if (fs.existsSync(path.join(root, "yarn.lock"))) {
    return "yarn";
  }

  if (
    fs.existsSync(path.join(root, "bun.lockb")) ||
    fs.existsSync(path.join(root, "bun.lock"))
  ) {
    return "bun";
  }

  if (fs.existsSync(path.join(root, "package-lock.json"))) {
    return "npm";
  }

  return null;
}

export async function validatePackageManager(packageManager: PackageManager) {
  const result = await execa(packageManager, ["--version"], {
    reject: false,
  });

  if (result.exitCode !== 0) {
    throw new Error(
      `${packageManager} is not available.\nPlease install ${packageManager} and try again.`
    );
  }
}
