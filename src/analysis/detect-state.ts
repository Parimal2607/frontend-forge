export function detectState(deps: Record<string, string>): string[] {
  const found: string[] = [];

  if ("zustand" in deps) {
    found.push("Zustand");
  }

  if ("@reduxjs/toolkit" in deps) {
    found.push("Redux Toolkit");
  }

  return found;
}
