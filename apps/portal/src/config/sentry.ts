import type * as Sentry from "@sentry/nextjs";
import { AppEnvironments } from "@repo/common/constants";
import { env } from "@repo/common/server-env";
import packageJson from "~/package.json";

export const sentryServer: Sentry.NodeOptions = {
  dsn: env.SENTRY_DSN,
  enabled:
    env.APP_ENV === AppEnvironments.Development ||
    env.APP_ENV === AppEnvironments.Staging ||
    env.APP_ENV === AppEnvironments.Production,
  environment: env.APP_ENV,
  release: `@portal-${env.APP_ENV}-${packageJson.version}`,
  initialScope: {
    tags: {
      service: `@portal-${env.APP_ENV}`,
    },
  },

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.3,
};