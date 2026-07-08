import { select } from "@clack/prompts";
import type { PackageManager } from "../types/package-manager.js";

export async function selectPackageManager() {
  return await select<PackageManager>({
    message: "Choose package manager",
    options: [
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
      { value: "yarn", label: "yarn" },
      { value: "bun", label: "bun" },
    ],
    initialValue: "npm",
  });
}
