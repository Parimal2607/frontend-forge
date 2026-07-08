import pc from "picocolors";

export const logger = {
  success(message: string) {
    console.log(`${pc.green("✓")} ${message}`);
  },

  info(message: string) {
    console.log(`${pc.cyan("ℹ")} ${message}`);
  },

  warning(message: string) {
    console.log(`${pc.yellow("⚠")} ${message}`);
  },

  error(message: string) {
    for (const line of message.split("\n")) {
      console.log(`${pc.red("✖")} ${line}`);
    }
  },
};
