import fs from "fs";
import path from "path";
import { detectFramework } from "./detect-framework.js";
import { detectPackageManager } from "./detect-package-manager.js";
import { detectLanguage } from "./detect-language.js";
import { detectRouting } from "./detect-routing.js";
import { detectTailwind } from "./detect-tailwind.js";
import { detectProviders } from "./detect-providers.js";
import { detectState } from "./detect-state.js";
import { detectAuth } from "./detect-auth.js";
import { detectDatabase } from "./detect-database.js";
import { detectBackend } from "./detect-backend.js";
import { detectStorybook } from "./detect-storybook.js";
import { detectDocker } from "./detect-docker.js";
import type { AnalysisResult, ModuleInfo } from "./types.js";

function readDeps(cwd: string): Record<string, string> {
  try {
    const pkgPath = path.join(cwd, "package.json");

    if (!fs.existsSync(pkgPath)) {
      return {};
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    return { ...pkg.dependencies, ...pkg.devDependencies };
  } catch {
    return {};
  }
}

function hasCoreStructure(cwd: string): boolean {
  const srcPath = path.join(cwd, "src");

  if (!fs.existsSync(srcPath)) {
    return false;
  }

  const coreFolders = ["components", "utils", "hooks", "providers"];
  const found = coreFolders.filter((f) => fs.existsSync(path.join(srcPath, f)));

  return found.length >= 2;
}

export async function analyzeProject(cwd: string): Promise<AnalysisResult> {
  const deps = readDeps(cwd);

  const framework = detectFramework(cwd);
  const packageManager = await detectPackageManager(cwd);
  const language = detectLanguage(cwd);
  const routing = detectRouting(cwd);
  const tailwind = detectTailwind(cwd);
  const providers = detectProviders(cwd);
  const state = detectState(deps);
  const hasAuth = detectAuth(deps);
  const database = detectDatabase(deps);
  const hasBackend = detectBackend(deps);
  const hasStorybook = detectStorybook(cwd, deps);
  const hasDocker = detectDocker(cwd);

  const modules: ModuleInfo[] = [
    { id: "core", label: "Core", detected: hasCoreStructure(cwd) },
    { id: "axios", label: "Axios", detected: "axios" in deps },
    { id: "zustand", label: "Zustand", detected: "zustand" in deps },
    { id: "react-query", label: "React Query", detected: "@tanstack/react-query" in deps },
    { id: "redux", label: "Redux Toolkit", detected: "@reduxjs/toolkit" in deps },
    { id: "better-auth", label: "Better Auth", detected: hasAuth },
    { id: "prisma", label: "Prisma", detected: database.includes("Prisma") },
    { id: "drizzle", label: "Drizzle", detected: database.includes("Drizzle") },
    { id: "directus", label: "Directus", detected: hasBackend },
    { id: "storybook", label: "Storybook", detected: hasStorybook },
    { id: "docker", label: "Docker", detected: hasDocker },
  ];

  return {
    framework,
    packageManager,
    language,
    routing,
    tailwind,
    modules,
    providers,
    state,
  };
}
