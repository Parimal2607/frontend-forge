import { execa } from "execa";
import { detectPackageManager as detectPM } from "../utils/detectPackageManager.js";

export async function detectPackageManager(cwd: string): Promise<{ name: string; version?: string }> {
  const name = detectPM();

  if (!name) {
    return { name: "Unknown" };
  }

  try {
    const { stdout } = await execa(name, ["--version"], { cwd });
    return { name, version: stdout.trim() };
  } catch {
    return { name };
  }
}
