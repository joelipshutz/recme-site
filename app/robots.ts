import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/privacy", "/terms", "/community", "/support", "/import-help"],
        disallow: ["/invites/", "/lists/"]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
