import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import type { ModuleDefinition } from "../types/module.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function readModule(moduleName: string): Promise<ModuleDefinition> {
  const modulePath = path.resolve(
    __dirname,
    "../templates/modules",
    moduleName,
    "module.ts"
  );

  const content = await fs.readFile(modulePath, "utf-8");
  const dataUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(content)}`;
  const { default: moduleDef } = await import(dataUrl);

  return moduleDef as ModuleDefinition;
}
