import { intro } from "@clack/prompts";
import { generatePlan } from "../analysis/plan.js";

export async function planCommand() {
  intro("Frontend Forge Plan");

  await generatePlan(process.cwd());
}
