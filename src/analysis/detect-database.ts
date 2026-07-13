export function detectDatabase(deps: Record<string, string>): string[] {
  const found: string[] = [];

  if ("prisma" in deps) {
    found.push("Prisma");
  }

  if ("drizzle-orm" in deps) {
    found.push("Drizzle");
  }

  return found;
}
