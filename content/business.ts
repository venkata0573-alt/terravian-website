import type { BusinessInfo } from "@/types/content";

/**
 * CENTRAL VERIFIED-FACTS OBJECT — the single source of truth for business
 * information used in copy, metadata, and JSON-LD.
 *
 * Per the client spec, ONLY the facts below are verified. Do not add
 * founding dates, employee counts, hours, ratings, licenses, certifications,
 * insurance limits, awards, memberships, ownership, exact service radius, or
 * response times here until Terravian approves them in writing.
 */
export const business: BusinessInfo = {
  name: "Terravian Landscaping",
  legalName: "Terravian Landscaping LLC",
  tagline: "The Company That Shows Up.",
  streetAddress: "7 McKee Pl",
  addressLocality: "Cheshire",
  addressRegion: "CT",
  postalCode: "06410",
  addressCountry: "US",
  phone: "475-347-4090",
  phoneHref: "tel:+14753474090",
  email: "info@terravianlandscaping.com",
  url: "https://terravianlandscaping.com",
  confirmedPrimaryMarket: "Connecticut",
  coverageStatement:
    "We serve commercial properties across the whole state of Connecticut.",
};

export const audiences = [
  "Hotel and hospitality operators",
  "Property management companies",
  "HOAs and condominium boards",
  "Retail and commercial building owners",
  "Industrial and mixed-use properties",
] as const;
