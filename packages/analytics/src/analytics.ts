import GoogleAnalyticsPlugin from "@analytics/google-analytics";
import MixpanelPlugin from "@analytics/mixpanel";
import { Analytics } from "analytics";
import { AppEnvironments } from "@repo/common";
import { env } from "./config";

export const analytics = Analytics({
  app: "@repo/analytics",
  debug: env.APP_ENV === AppEnvironments.local,
  plugins: [
    MixpanelPlugin({
      token: env.MIXPANEL_TOKEN,
      options: {
        api_host: env.MIXPANEL_API,
        autotrack: true,
        cross_subdomain_cookie: true,
        persistence: "cookie",
        // persistence_name: "",
        // cookie_name: "",
        store_google: true,
        save_referrer: true,
        test: env.APP_ENV !== AppEnvironments.production,
        verbose: env.APP_ENV === AppEnvironments.local,
        img: false,
        track_pageview: true,
        debug: env.APP_ENV === AppEnvironments.local,
        track_links_timeout: 300,
        cookie_expiration: 365,
        upgrade: false,
        disable_persistence: false,
        disable_cookie: false,
        secure_cookie: false,
        ip: true,
      },
      // Ref: https://github.com/DavidWells/analytics/issues/370
      pageEvent: "page_view",
    }),
    GoogleAnalyticsPlugin({
      measurementIds: [env.GOOGLE_ANALYTICS_ID],
    }),
  ],
});
