export function detectAuth(deps: Record<string, string>): boolean {
  return "better-auth" in deps;
}
