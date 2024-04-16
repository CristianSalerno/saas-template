import { z } from "zod";

export const DBEnv = z
  .object({
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
  })
  .parse({
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  });
