#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init.js";

const program = new Command();

program
  .name("frontend-init")
  .description("Initialize frontend architecture")
  .version("1.0.0");

program.command("init").action(initCommand);

program.parse();