import { z } from "zod";
import { AppEnvironments, NodeEnvs } from "../../../constants";

export const AppEnv = z
  .object({
    NODE_ENV: z
      .enum([NodeEnvs.Test, NodeEnvs.Development, NodeEnvs.Production])
      .default(NodeEnvs.Production),
    APP_ENV: z
      .enum([
        AppEnvironments.Local,
        AppEnvironments.Development,
        AppEnvironments.Staging,
        AppEnvironments.Production,
      ])
      .default(AppEnvironments.Production),
    BASE_URL: z.string().url(),
  })
  .parse({
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  });
