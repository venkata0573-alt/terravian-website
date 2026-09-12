import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { services } from "@/content/services";

/**
 * Production sitemap — valid, public, approved pages ONLY.
 * Excluded per spec: placeholder portfolio projects (/portfolio and
 * /portfolio/[slug] are noindex demo content), privacy (pending legal
 * review), form success states, and all dev/test routes.
 * No artificial changeFrequency/priority values.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/services",
    "/industries",
    "/how-we-work",
    "/about",
    "/contact",
    "/request-a-proposal",
  ];

  const servicePaths = services.map((s) => `/services/${s.slug}`);

  return [...staticPaths, ...servicePaths].map((path) => ({
    url: `${business.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
  }));
}
