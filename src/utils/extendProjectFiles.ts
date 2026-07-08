import fs from "fs-extra";
import path from "path";
import type { ProjectStructure } from "./detectProjectStructure.js";

function getAppFilePath(
  structure: ProjectStructure,
  fileName: string
): string {
  return path.join(process.cwd(), structure.appDir, fileName);
}

function getProvidersImport(architecture: string): string {
  if (architecture === "feature") {
    return "@/shared/providers";
  }

  return "@/providers";
}

function getPageImport(architecture: string): string {
  if (architecture === "feature") {
    return "@/features/home/components/HomePage";
  }

  return "@/components/home/HomeView";
}

function getPageComponent(architecture: string): string {
  if (architecture === "feature") {
    return "HomePage";
  }

  return "HomeView";
}

export async function extendProjectFiles(
  architecture: string,
  structure: ProjectStructure
) {
  await extendLayout(structure, architecture);
  await extendPage(structure, architecture);
}

async function extendLayout(
  structure: ProjectStructure,
  architecture: string
) {
  const layoutPath = getAppFilePath(structure, "layout.tsx");

  if (!(await fs.pathExists(layoutPath))) {
    return;
  }

  const content = await fs.readFile(layoutPath, "utf-8");
  const providersImport = getProvidersImport(architecture);

  if (content.includes("<Providers>")) {
    return;
  }

  let updated = content;

  if (
    !content.includes(providersImport) &&
    !content.includes('from "@/providers"') &&
    !content.includes("from '@/providers'")
  ) {
    const importLine = `import { Providers } from "${providersImport}";\n`;
    const lastImportIndex = updated.lastIndexOf("import ");

    if (lastImportIndex !== -1) {
      const insertAt = updated.indexOf("\n", lastImportIndex) + 1;
      updated = updated.slice(0, insertAt) + importLine + updated.slice(insertAt);
    } else {
      updated = importLine + updated;
    }
  }

  updated = updated.replace(/(<body[^>]*>)/, "$1\n        <Providers>");
  updated = updated.replace("</body>", "        </Providers>\n      </body>");

  if (updated !== content) {
    await fs.writeFile(layoutPath, updated);
  }
}

async function extendPage(
  structure: ProjectStructure,
  architecture: string
) {
  const pagePath = getAppFilePath(structure, "page.tsx");

  if (!(await fs.pathExists(pagePath))) {
    return;
  }

  const content = await fs.readFile(pagePath, "utf-8");
  const pageImport = getPageImport(architecture);
  const pageComponent = getPageComponent(architecture);

  if (content.includes(pageComponent)) {
    return;
  }

  const isDefaultTemplate =
    content.includes("Get started by editing") ||
    content.includes("next.svg") ||
    content.includes("vercel.svg");

  if (!isDefaultTemplate) {
    return;
  }

  const updated = `import { ${pageComponent} } from "${pageImport}";

export default function Home() {
  return <${pageComponent} />;
}
`;

  await fs.writeFile(pagePath, updated);
}
