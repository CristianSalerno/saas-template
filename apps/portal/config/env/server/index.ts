import { AuthEnv } from "./auth-env";
import { DBEnv } from "./db-env";
import { SentryEnv } from "./sentry-env";

export const ApiEnv = {
  ...AuthEnv,
  ...DBEnv,
  ...SentryEnv,
};
