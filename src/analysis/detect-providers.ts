import fs from "fs";
import path from "path";

export function detectProviders(cwd: string): string[] {
  const candidates = [
    path.join(cwd, "src", "providers"),
    path.join(cwd, "src", "shared", "providers"),
    path.join(cwd, "providers"),
  ];

  const providers: string[] = [];

  for (const dir of candidates) {
    if (!fs.existsSync(dir)) {
      continue;
    }

    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
      const ext = path.extname(entry);

      if (ext !== ".ts" && ext !== ".tsx" && ext !== ".js" && ext !== ".jsx") {
        continue;
      }

      const name = path.basename(entry, ext);

      if (name !== "index" && !providers.includes(name)) {
        providers.push(name);
      }
    }
  }

  return providers;
}
