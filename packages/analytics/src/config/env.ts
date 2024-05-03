import * as z from "zod";
import { AppEnvironments } from "@repo/common";

export const env = z
  .object({
    APP_ENV: z
      .enum([
        AppEnvironments.local,
        AppEnvironments.development,
        AppEnvironments.staging,
        AppEnvironments.production,
      ])
      .default(AppEnvironments.production),
    MICROSOFT_CLARITY: z.string(),
    MIXPANEL_TOKEN: z.string(),
    MIXPANEL_API: z.string(),
    GOOGLE_ANALYTICS_ID: z.string(),
  })
  .parse({
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    MICROSOFT_CLARITY: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY,
    MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    MIXPANEL_API: process.env.NEXT_PUBLIC_MIXPANEL_API,
    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  });
