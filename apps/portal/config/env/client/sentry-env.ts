import { z } from "zod";

export const SentryEnv = z
  .object({
    SENTRY_DSN: z.string().url(),
    SENTRY_SERVICE: z.string().optional(),
  })
  .parse({
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_SERVICE: process.env.NEXT_PUBLIC_SENTRY_SERVICE,
  });
