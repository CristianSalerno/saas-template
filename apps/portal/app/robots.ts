import { MetadataRoute } from "next";
import { env } from "../config/env/client";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/sign-up"],
      },
    ],
    sitemap: `${env.BASE_URL}/sitemap.xml`,
  };
}
