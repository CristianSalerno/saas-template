import { Logger } from "tslog";
import { AppEnvironments } from "@repo/common";
import { env } from "../config/env";

enum Levels {
  silly = 0,
  trace = 1,
  debug = 2,
  info = 3,
  warn = 4,
  error = 5,
  fatal = 6,
}

export const logger = new Logger({
  name: "@Repo",
  maskValuesOfKeys: ["password", "passwordConfirmation", "credentials", "credential"],
  type: env.APP_ENV !== AppEnvironments.local ? "json" : "pretty",
  minLevel: env.APP_ENV === AppEnvironments.local ? Levels.debug : Levels.info,
  prettyLogTimeZone: env.APP_ENV === AppEnvironments.production ? "UTC" : "local",
  hideLogPositionForProduction: env.APP_ENV === AppEnvironments.production,
  prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}", // default
  prettyErrorTemplate: "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}", // default
  prettyLogTemplate: "{{logLevelName}} {{rawIsoStr}} {{name}} - ", // default with exclusion of `{{filePathWithLine}}`
  stylePrettyLogs: true,
  prettyLogStyles: {
    logLevelName: {
      "*": ["bold", "black", "bgWhiteBright", "dim"],
      SILLY: ["bold", "purple"],
      TRACE: ["bold", "purple"],
      DEBUG: ["bold", "purple"],
      INFO: ["bold", "green"],
      WARN: ["bold", "yellow"],
      ERROR: ["bold", "red"],
      FATAL: ["bold", "redBright"],
    },
    dateIsoStr: "white",
    filePathWithLine: "white",
    name: ["blue", "bold"],
    nameWithDelimiterPrefix: ["white", "bold"],
    nameWithDelimiterSuffix: ["white", "bold"],
    errorName: ["bold", "bgRedBright", "whiteBright"],
    fileName: ["yellow"],
  },
});

export { Logger };
