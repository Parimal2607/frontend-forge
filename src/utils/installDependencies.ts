import { execa } from "execa";
import type { ModuleDefinition } from "../types/module.js";
import type { PackageManager } from "../types/package-manager.js";

const installCommands: Record<
  PackageManager,
  { command: string; dependencies: string[]; devDependencies: string[] }
> = {
  npm: { command: "npm", dependencies: ["install"], devDependencies: ["install", "-D"] },
  pnpm: { command: "pnpm", dependencies: ["add"], devDependencies: ["add", "-D"] },
  yarn: { command: "yarn", dependencies: ["add"], devDependencies: ["add", "-D"] },
  bun: { command: "bun", dependencies: ["add"], devDependencies: ["add", "-d"] },
};

export async function installDependencies(
  modules: ModuleDefinition[],
  packageManager: PackageManager
): Promise<number> {
  const dependencies = [
    ...new Set(modules.flatMap((module) => module.dependencies)),
  ];
  const devDependencies = [
    ...new Set(modules.flatMap((module) => module.devDependencies)),
  ];

  const totalCount = dependencies.length + devDependencies.length;

  if (totalCount === 0) {
    return 0;
  }

  const { command, dependencies: depsArgs, devDependencies: devArgs } =
    installCommands[packageManager];

  try {
    if (dependencies.length > 0) {
      await execa(command, [...depsArgs, ...dependencies], {
        stdio: "inherit",
        cwd: process.cwd(),
      });
    }

    if (devDependencies.length > 0) {
      await execa(command, [...devArgs, ...devDependencies], {
        stdio: "inherit",
        cwd: process.cwd(),
      });
    }

    return totalCount;
  } catch {
    throw new Error(
      "Failed to install dependencies.\nPlease resolve the issue and run the command again."
    );
  }
}
