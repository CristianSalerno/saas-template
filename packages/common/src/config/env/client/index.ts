import { AnalyticsEnv } from "./analytics";
import { AppEnv } from "./app-env";
import { SentryEnv } from "./sentry-env";
import { StripeEnv } from "./stripe";

export const env = {
  ...AppEnv,
  ...SentryEnv,
  ...AnalyticsEnv,
  ...StripeEnv,
};
