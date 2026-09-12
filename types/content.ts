/** Shared content types. Data lives in /content so it can migrate to a CMS later. */

import type { ProjectImage, ServiceSlug } from "@/types/project";

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  phone: string; // display format
  phoneHref: string; // tel: format
  email: string;
  url: string;
  confirmedPrimaryMarket: string;
  coverageStatement: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  capabilities: string[];
  whoItsFor: string;
}

export interface Industry {
  id: string;
  name: string;
  problem: string;
  answer: string;
  /** Service lines most relevant to this segment (cross-links on /industries). */
  relevantServiceSlugs: ServiceSlug[];
}

/** One step of a service-specific adaptation of the ten-step method. */
export interface ServiceProcessStep {
  title: string;
  text: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/**
 * Full detail content for one service page — the eight mandated sections
 * beyond the base Service record. Copy is original per service (no
 * find-and-replace repetition) and stays inside the verified scope rules:
 * no pricing, no response-time promises, no invented materials specifics.
 */
export interface ServiceDetail {
  slug: ServiceSlug;
  /** Section 4 — service-specific adaptation of the ten-step method. */
  processIntro: string;
  processSteps: ServiceProcessStep[];
  /** Section 5 — gallery. PLACEHOLDER images until real photography arrives. */
  gallery: ProjectImage[];
  galleryNote: string;
  /** Section 6 — 4–6 FAQs, scope-safe answers. */
  faqs: ServiceFaq[];
  /** Section 3 — industry anchors (on /industries) this service serves. */
  industryIds: string[];
}

export interface Program {
  id: string;
  /** Name WITH the ™ already applied — use for first mention on a page. */
  nameTrademarked: string;
  /** Plain name for subsequent mentions. */
  name: string;
  summary: string;
  detail: string;
}

export type CoverageStatus = "confirmed" | "upon-review";

