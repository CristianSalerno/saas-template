import { type MetadataRoute } from "next";
import { env } from "@repo/common/common-env";

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
