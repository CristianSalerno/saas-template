import { z } from "zod";

export const SentryEnv = z
  .object({
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
  })
  .parse({
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_ORG: process.env.SENTRY_ORG,
  });
