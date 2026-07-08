import path from "path";
import type { ProjectStructure } from "./detectProjectStructure.js";

function normalizePath(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function remapCoreModulePath(
  normalizedPath: string,
  architecture: string
): string {
  if (architecture === "feature") {
    if (normalizedPath.startsWith("src/components/")) {
      return normalizedPath.replace(
        "src/components/",
        "src/shared/components/"
      );
    }

    if (normalizedPath.startsWith("src/hooks/")) {
      return normalizedPath.replace("src/hooks/", "src/shared/hooks/");
    }

    if (normalizedPath.startsWith("src/utils/")) {
      return normalizedPath.replace("src/utils/", "src/shared/utils/");
    }

    if (normalizedPath.startsWith("src/providers/")) {
      return normalizedPath.replace("src/providers/", "src/shared/providers/");
    }

    if (normalizedPath.startsWith("src/services/")) {
      return normalizedPath.replace("src/services/", "src/features/home/services/");
    }

    if (normalizedPath.startsWith("src/constants/")) {
      return normalizedPath.replace("src/constants/", "src/features/home/constants/");
    }
  }

  return normalizedPath;
}

type ResolveOptions = {
  structure: ProjectStructure;
  architecture?: string;
  remapCore?: boolean;
};

export function resolveTemplatePath(
  relativePath: string,
  options: ResolveOptions
): string | null {
  let normalized = normalizePath(relativePath);

  if (normalized === "src/app" || normalized.startsWith("src/app/")) {
    return null;
  }

  if (options.remapCore && options.architecture) {
    normalized = remapCoreModulePath(normalized, options.architecture);
  }

  if (!options.structure.useSrc && normalized.startsWith("src/")) {
    normalized = normalized.slice(4);
  }

  return normalized.split("/").join(path.sep);
}

export function shouldSkipTemplatePath(relativePath: string): boolean {
  const normalized = normalizePath(relativePath);

  return normalized === "src/app" || normalized.startsWith("src/app/");
}
