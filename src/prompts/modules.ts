import { multiselect } from "@clack/prompts";
import { modules } from "../config/modules.js";

export async function selectModules() {
  return await multiselect({
    message: "Select modules",
    options: modules.map((item) => ({
      value: item.value,
      label: item.label,
      hint: item.hint,
    })),
    required: true,
  });
}
