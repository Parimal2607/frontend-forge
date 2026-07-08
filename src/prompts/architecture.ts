import { select } from "@clack/prompts";
import { architectures } from "../config/architectures.js";

export async function selectArchitecture() {
  return await select({
    message: "Choose project architecture",
    options: architectures.map((item) => ({
      value: item.value,
      label: item.label,
      hint: item.hint,
    })),
  });
}