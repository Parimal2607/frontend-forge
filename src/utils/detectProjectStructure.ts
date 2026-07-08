import fs from "fs";
import path from "path";

export type ProjectStructure = {
  useSrc: boolean;
  root: string;
  appDir: string;
};

export function detectProjectStructure(): ProjectStructure {
  const cwd = process.cwd();

  if (fs.existsSync(path.join(cwd, "app"))) {
    return {
      useSrc: false,
      root: "",
      appDir: "app",
    };
  }

  if (fs.existsSync(path.join(cwd, "src", "app"))) {
    return {
      useSrc: true,
      root: "src",
      appDir: "src/app",
    };
  }

  if (fs.existsSync(path.join(cwd, "src"))) {
    return {
      useSrc: true,
      root: "src",
      appDir: "src/app",
    };
  }

  return {
    useSrc: false,
    root: "",
    appDir: "app",
  };
}
