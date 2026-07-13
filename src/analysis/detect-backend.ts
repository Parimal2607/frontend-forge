export function detectBackend(deps: Record<string, string>): boolean {
  return "@directus/sdk" in deps;
}
