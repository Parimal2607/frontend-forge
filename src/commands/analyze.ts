import { intro, spinner } from "@clack/prompts";
import { analyzeProject } from "../analysis/analyze-project.js";
import { printAnalysis } from "../analysis/report.js";

export async function analyzeCommand() {
  intro("Frontend Forge Analysis");

  const s = spinner();
  s.start("Analyzing project...");

  try {
    const result = await analyzeProject(process.cwd());
    s.stop("Analysis complete");
    printAnalysis(result);
  } catch (error) {
    s.stop("Failed");
    console.error("Failed to analyze project:", error);
  }
}
