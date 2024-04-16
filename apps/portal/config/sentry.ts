import * as Sentry from "@sentry/nextjs";
import { AppEnvironments } from "@repo/common";
import { version } from "../package.json";
import { env } from "./env/client";

export const sentryServer: Sentry.NodeOptions = {
  dsn: env.SENTRY_DSN,
  enabled:
    env.APP_ENV === AppEnvironments.development ||
    env.APP_ENV === AppEnvironments.staging ||
    env.APP_ENV === AppEnvironments.production,
  environment: env.APP_ENV,
  release: `@portal-${env.APP_ENV}-${version}`,
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
