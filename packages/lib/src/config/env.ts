import { z } from "zod";
import { AppEnvironments, NodeEnvs } from "@repo/common";

export const env = z
  .object({
    NODE_ENV: z
      .enum([NodeEnvs.test, NodeEnvs.development, NodeEnvs.production])
      .default(NodeEnvs.production),
    APP_ENV: z
      .enum([
        AppEnvironments.local,
        AppEnvironments.development,
        AppEnvironments.staging,
        AppEnvironments.production,
      ])
      .default(AppEnvironments.production),
  })
  .parse({
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  });
