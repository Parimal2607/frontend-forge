#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { analyzeCommand } from "./commands/analyze.js";
import { planCommand } from "./commands/plan.js";

const program = new Command();

program
  .name("frontend-init")
  .description("Initialize frontend architecture")
  .version("1.0.0");

program.command("init").action(initCommand);
program.command("analyze").description("Analyze the current project").action(analyzeCommand);
program.command("plan").description("Generate a migration plan").action(planCommand);

program.parse();