import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { intro, isCancel, cancel, spinner } from "@clack/prompts";
import { validateProject } from "../utils/detectProject.js";
import { detectProjectStructure } from "../utils/detectProjectStructure.js";
import { copyArchitecture } from "../utils/copyArchitecture.js";
import { copyModules } from "../utils/copyModules.js";
import { extendProjectFiles } from "../utils/extendProjectFiles.js";
import { readModule } from "../utils/readModule.js";
import { installDependencies } from "../utils/installDependencies.js";
import {
  detectPackageManager,
  validatePackageManager,
} from "../utils/detectPackageManager.js";
import { logger } from "../utils/logger.js";
import { selectArchitecture } from "../prompts/architecture.js";
import { selectModules } from "../prompts/modules.js";
import { selectPackageManager } from "../prompts/packageManager.js";
import { architectures } from "../config/architectures.js";
import { modules } from "../config/modules.js";
import type { PackageManager } from "../types/package-manager.js";

function getVersion(): string {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const pkg = JSON.parse(
    fs.readFileSync(path.join(dir, "../package.json"), "utf-8")
  );
  return pkg.version;
}

function getArchitectureLabel(value: string): string {
  return architectures.find((item) => item.value === value)?.label ?? value;
}

function getModuleLabel(value: string): string {
  return modules.find((item) => item.value === value)?.label ?? value;
}

function printSummary(options: {
  architecture: string;
  selectedModules: string[];
  packageManager: PackageManager;
  dependenciesInstalled: number;
  filesCreated: number;
  filesSkipped: number;
}) {
  console.log("");
  logger.success("Project initialized successfully.");
  console.log("");
  console.log("Framework:");
  console.log("Next.js");
  console.log("");
  console.log("Architecture:");
  console.log(getArchitectureLabel(options.architecture));
  console.log("");
  console.log("Modules:");
  for (const module of options.selectedModules) {
    console.log(getModuleLabel(module));
  }
  console.log("");
  console.log("Package Manager:");
  console.log(options.packageManager);
  console.log("");
  console.log("Dependencies Installed:");
  console.log(options.dependenciesInstalled);
  console.log("");
  console.log("Files Created:");
  console.log(options.filesCreated);
  console.log("");
  console.log("Files Skipped:");
  console.log(options.filesSkipped);
  console.log("");
  console.log("Done.");
  console.log("");
  logger.success("Happy Coding!");
}

export async function initCommand() {
  intro("Frontend Init");
  logger.info("Production Ready Frontend Starter");
  logger.info(`Version ${getVersion()}`);

  const detectSpinner = spinner();
  detectSpinner.start("Detecting project...");

  try {
    validateProject();
    detectSpinner.stop("Success");
  } catch (error) {
    detectSpinner.stop("Failed");
    logger.error(
      error instanceof Error ? error.message : "Project validation failed."
    );
    return;
  }

  const architectureSpinner = spinner();
  architectureSpinner.start("Selecting architecture...");

  const architecture = await selectArchitecture();

  if (isCancel(architecture) || !architecture) {
    architectureSpinner.stop("Failed");
    cancel("Operation cancelled.");
    return;
  }

  architectureSpinner.stop("Success");

  const modulesSpinner = spinner();
  modulesSpinner.start("Selecting modules...");

  const selectedModules = await selectModules();

  if (isCancel(selectedModules) || selectedModules.length === 0) {
    modulesSpinner.stop("Failed");
    cancel("Operation cancelled.");
    return;
  }

  modulesSpinner.stop("Success");

  const structure = detectProjectStructure();

  const moduleDefinitions = await Promise.all(
    selectedModules.map((module) => readModule(module))
  );

  const detected = detectPackageManager();
  let packageManager: PackageManager;

  if (detected) {
    packageManager = detected;
    logger.info(`Detected: ${packageManager}`);
  } else {
    const selected = await selectPackageManager();

    if (isCancel(selected) || !selected) {
      cancel("Operation cancelled.");
      return;
    }

    packageManager = selected;
    logger.info(`Using ${packageManager}`);
  }

  try {
    await validatePackageManager(packageManager);
  } catch (error) {
    logger.error(
      error instanceof Error ? error.message : "Package manager not available."
    );
    return;
  }

  let dependenciesInstalled = 0;
  const installSpinner = spinner();
  installSpinner.start("Installing dependencies...");

  try {
    dependenciesInstalled = await installDependencies(
      moduleDefinitions,
      packageManager
    );
    installSpinner.stop("Success");
  } catch (error) {
    installSpinner.stop("Failed");
    logger.error(
      error instanceof Error
        ? error.message
        : "Failed to install dependencies.\nPlease resolve the issue and run the command again."
    );
    return;
  }

  const architectureCopySpinner = spinner();
  architectureCopySpinner.start("Copying architecture...");

  let architectureStats;

  try {
    architectureStats = await copyArchitecture(
      "next",
      architecture as string,
      structure
    );
    architectureCopySpinner.stop("Success");
  } catch (error) {
    architectureCopySpinner.stop("Failed");
    logger.error(
      error instanceof Error ? error.message : "Failed to copy architecture."
    );
    return;
  }

  const modulesCopySpinner = spinner();
  modulesCopySpinner.start("Copying modules...");

  let moduleStats;

  try {
    moduleStats = await copyModules(
      selectedModules as string[],
      structure,
      architecture as string
    );
    modulesCopySpinner.stop("Success");
  } catch (error) {
    modulesCopySpinner.stop("Failed");
    logger.error(
      error instanceof Error ? error.message : "Failed to copy modules."
    );
    return;
  }

  try {
    await extendProjectFiles(architecture as string, structure);
  } catch (error) {
    logger.error(
      error instanceof Error ? error.message : "Failed to extend project files."
    );
    return;
  }

  const finishingSpinner = spinner();
  finishingSpinner.start("Finishing...");

  printSummary({
    architecture: architecture as string,
    selectedModules: selectedModules as string[],
    packageManager,
    dependenciesInstalled,
    filesCreated: architectureStats.created + moduleStats.created,
    filesSkipped: architectureStats.skipped + moduleStats.skipped,
  });

  finishingSpinner.stop("Success");
}
