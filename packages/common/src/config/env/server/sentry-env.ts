import { z } from "zod";

export const SentryEnv = z
  .object({
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_DSN: z.string().url(),
    SENTRY_SERVICE: z.string().optional(),
  })
  .parse({
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_SERVICE: process.env.NEXT_PUBLIC_SENTRY_SERVICE,
  });
