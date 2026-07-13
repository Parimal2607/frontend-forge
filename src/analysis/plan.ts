import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import { selectArchitecture } from "../prompts/architecture.js";
import { modules as availableModules } from "../config/modules.js";
import { analyzeProject } from "./analyze-project.js";
import { logger } from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getTemplateFolderList(architecture: string): string[] {
  const templatePath = path.resolve(
    __dirname,
    "..",
    "templates",
    "architectures",
    "next",
    architecture,
    "src"
  );

  if (!fs.existsSync(templatePath)) {
    return [];
  }

  const folders: string[] = [];

  function walk(dir: string, relative: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const rel = relative ? `${relative}/${entry.name}` : entry.name;

      folders.push(rel);
      walk(path.join(dir, entry.name), rel);
    }
  }

  walk(templatePath, "");

  return folders;
}

function getExistingFolders(cwd: string): string[] {
  const srcPath = path.join(cwd, "src");

  if (!fs.existsSync(srcPath)) {
    return [];
  }

  const folders: string[] = [];

  function walk(dir: string, relative: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const rel = relative ? `${relative}/${entry.name}` : entry.name;

      folders.push(rel);
      walk(path.join(dir, entry.name), rel);
    }
  }

  walk(srcPath, "");

  return folders;
}

export async function generatePlan(cwd: string): Promise<void> {
  const architecture = await selectArchitecture();

  if (!architecture) {
    return;
  }

  const templateFolders = getTemplateFolderList(architecture as string);
  const existingFolders = getExistingFolders(cwd);
  const analysis = await analyzeProject(cwd);

  const toCreate: string[] = [];
  const alreadyExists: string[] = [];

  for (const folder of templateFolders) {
    const srcFolder = `src/${folder}`;

    if (existingFolders.includes(folder)) {
      alreadyExists.push(srcFolder);
    } else {
      toCreate.push(srcFolder);
    }
  }

  const hasCore = analysis.modules.find((m) => m.id === "core")?.detected ?? false;

  const recommended = availableModules.filter((m) => {
    if (m.value === "core") {
      return false;
    }

    const detected = analysis.modules.find((am) => am.id === m.value);

    return !detected?.detected;
  });

  const warnings: string[] = [];

  if (fs.existsSync(path.join(cwd, "middleware.ts"))) {
    warnings.push("Existing middleware.ts detected");
  }

  if (fs.existsSync(path.join(cwd, "src", "middleware.ts"))) {
    warnings.push("Existing middleware.ts detected");
  }

  const layoutPath =
    fs.existsSync(path.join(cwd, "app", "layout.tsx"))
      ? path.join(cwd, "app", "layout.tsx")
      : fs.existsSync(path.join(cwd, "src", "app", "layout.tsx"))
        ? path.join(cwd, "src", "app", "layout.tsx")
        : null;

  if (layoutPath) {
    warnings.push("Existing layout.tsx detected");
  }

  console.log("");
  console.log(pc.cyan("Migration Plan"));
  console.log("");

  if (toCreate.length > 0) {
    console.log(pc.bold("Folders to Create"));

    for (const f of toCreate) {
      console.log(`  ${pc.green("✔")} ${f}`);
    }

    console.log("");
  }

  if (alreadyExists.length > 0) {
    console.log(pc.bold("Already Exists"));

    for (const f of alreadyExists) {
      console.log(`  ${pc.green("✔")} ${f}`);
    }

    console.log("");
  }

  if (recommended.length > 0) {
    console.log(pc.bold("Recommended Modules"));

    for (const m of recommended) {
      console.log(`  ${m.label}`);
    }

    console.log("");
  }

  if (warnings.length > 0) {
    console.log(pc.bold(pc.yellow("Warnings")));

    for (const w of warnings) {
      console.log(`  ${pc.yellow("⚠")} ${w}`);
    }

    console.log("");
  }

  logger.info("No files will be modified.");
  console.log("");
  console.log(pc.cyan("Run:"));
  console.log(`  ${pc.bold("frontend-forge init")}`);
  console.log(pc.cyan("to generate the missing files."));
  console.log("");
}
