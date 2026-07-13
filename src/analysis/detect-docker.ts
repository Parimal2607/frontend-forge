import fs from "fs";
import path from "path";

export function detectDocker(cwd: string): boolean {
  return fs.existsSync(path.join(cwd, "Dockerfile")) || fs.existsSync(path.join(cwd, "docker-compose.yml"));
}
