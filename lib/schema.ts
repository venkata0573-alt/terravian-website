import { business } from "@/content/business";
import { services } from "@/content/services";

/**
 * JSON-LD builders — assembled ONLY from the centralized verified-facts
 * object (content/business.ts). Per spec, structured data must never
 * contain claims absent from the visible page, and must not include
 * aggregateRating, review, award, foundingDate, numberOfEmployees,
 * openingHours, geo coordinates, or sameAs until real approved data exists.
 *
 * Omitted pending verification (documented in the completion report):
 * logo URL, image URL, geo, sameAs, openingHours, foundingDate.
 */

export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    // NOTE: generic LocalBusiness is used until Terravian confirms a more
    // specific subtype (e.g. "Landscaper") accurately represents the business.
    "@type": "LocalBusiness",
    name: business.name,
    url: business.url,
    telephone: business.phone,
    email: business.email,
    description: `${business.name} provides commercial landscaping, lawn and grounds maintenance, seasonal property enhancements, snow and ice management, and hardscape design and installation for commercial properties. ${business.tagline}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      postalCode: business.postalCode,
      addressCountry: business.addressCountry,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: business.confirmedPrimaryMarket,
    },
  };
}

export function serviceJsonLd(serviceSlug: string): Record<string, unknown> | null {
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.tagline,
    serviceType: service.name,
    url: `${business.url}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      url: business.url,
      telephone: business.phone,
    },
    // Carefully qualified: confirmed primary market only; broader CT coverage
    // is described on-page as subject to operational review.
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${business.confirmedPrimaryMarket}, Connecticut`,
    },
  };
}
