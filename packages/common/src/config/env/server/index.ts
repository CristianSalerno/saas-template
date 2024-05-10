import { AppEnv } from "./app-env";
import { AuthEnv } from "./auth-env";
import { DBEnv } from "./db-env";
import { SentryEnv } from "./sentry-env";
import { StripeEnv } from "./stripe";
import { SystemEnv } from "./system-env";

export const env = {
  ...AppEnv,
  ...SystemEnv,
  ...AuthEnv,
  ...DBEnv,
  ...SentryEnv,
  ...StripeEnv,
};
