import { z } from "zod";

export const AppEnv = z
  .object({
    BASE_URL: z.string().url(),
  })
  .parse({
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  });
