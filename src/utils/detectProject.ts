import fs from "fs";

export function validateProject() {
  if (!fs.existsSync("package.json")) {
    throw new Error(
      "Could not find package.json.\nPlease run this command inside an existing Next.js project."
    );
  }

  const pkg = JSON.parse(
    fs.readFileSync("package.json", "utf-8")
  );

  if (!pkg.dependencies?.next) {
    throw new Error(
      "Next.js project not detected.\nCurrent version only supports Next.js."
    );
  }
}
