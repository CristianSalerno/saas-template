import { z } from "zod";
import { AppEnvironments, NodeEnvs } from "../../../constants";

export const SystemEnv = z
  .object({
    NODE_ENV: z.enum([NodeEnvs.Test, NodeEnvs.Development, NodeEnvs.Production]),
    APP_ENV: z.enum([
      AppEnvironments.Local,
      AppEnvironments.Development,
      AppEnvironments.Staging,
      AppEnvironments.Production,
    ]),
  })
  .parse({
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  });
