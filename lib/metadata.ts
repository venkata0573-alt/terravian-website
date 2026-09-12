import type { Metadata } from "next";
import { business } from "@/content/business";

/**
 * Per-page metadata helpers. Every public page gets a unique title and
 * description, canonical URL, Open Graph, and Twitter card metadata.
 * Demo/placeholder routes use noindex/nofollow via demoMetadata().
 */

// PLACEHOLDER: replace with an approved branded Open Graph share image
// (1200×630) before launch — see completion report asset list.
export const OG_IMAGE = "/images/placeholders/og-share-placeholder.webp";

export function canonicalFor(path: string): string {
  return `${business.url}${path === "/" ? "" : path}`;
}

interface PageMetaInput {
  path: string;
  title: string; // page-specific; template adds the brand suffix
  description: string; // unique per page — never reuse across pages
}

export function pageMetadata({ path, title, description }: PageMetaInput): Metadata {
  const url = canonicalFor(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${business.name}`,
      description,
      url,
      siteName: business.name,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${business.name} — ${business.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${business.name}`,
      description,
      images: [OG_IMAGE],
    },
  };
}

/** Demonstration/unreviewed content: keep out of the index entirely. */
export function demoMetadata({ path, title, description }: PageMetaInput): Metadata {
  return {
    ...pageMetadata({ path, title, description }),
    robots: { index: false, follow: false },
  };
}
