import type { MetadataRoute } from "next";
import { business } from "@/content/business";

/**
 * Robots configuration. Demonstration portfolio routes and the placeholder
 * privacy page are disallowed until their content is real and approved
 * (they also carry noindex at the page level).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portfolio", "/portfolio/", "/privacy", "/api/"],
    },
    sitemap: `${business.url}/sitemap.xml`,
  };
}
