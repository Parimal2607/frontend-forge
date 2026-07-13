import pc from "picocolors";
import type { AnalysisResult } from "./types.js";

export function printAnalysis(result: AnalysisResult): void {
  console.log("");
  console.log(pc.cyan("Frontend Forge Analysis"));
  console.log("");

  const fw = result.framework.version
    ? `${result.framework.name} ${result.framework.version}`
    : result.framework.name;

  console.log(`${pc.green("✔")} Framework: ${fw}`);

  const pm = result.packageManager.version
    ? `${result.packageManager.name} ${result.packageManager.version}`
    : result.packageManager.name;

  console.log(`${pc.green("✔")} Package Manager: ${pm}`);
  console.log(`${pc.green("✔")} Language: ${result.language}`);
  console.log(`${pc.green("✔")} Routing: ${result.routing}`);

  if (result.tailwind) {
    console.log(`${pc.green("✔")} Tailwind CSS detected`);
  } else {
    console.log(`${pc.red("✖")} Tailwind CSS`);
  }

  console.log("");
  console.log(pc.cyan("Modules"));

  for (const mod of result.modules) {
    if (mod.detected) {
      console.log(`  ${pc.green("✔")} ${mod.label}`);
    } else {
      console.log(`  ${pc.red("✖")} ${mod.label}`);
    }
  }

  if (result.providers.length > 0) {
    console.log("");
    console.log(pc.cyan("Providers"));

    for (const provider of result.providers) {
      console.log(`  ${pc.green("✔")} ${provider}`);
    }
  }

  if (result.state.length > 0) {
    console.log("");
    console.log(pc.cyan("State"));

    for (const s of result.state) {
      console.log(`  ${pc.green("✔")} ${s}`);
    }
  }

  console.log("");
}
