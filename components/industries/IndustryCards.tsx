/**
 * Industries — photographic cards. One image, one name, one sentence.
 *
 * Static cards per client direction: no links and no Explore CTA — the
 * cards introduce the audiences we serve without redirecting to service
 * pages.
 *
 * Imagery: the hotel entry, office park, and community-entrance photos are
 * licensed client-supplied images; the property-management, HOA, and retail
 * cards use client-supplied photography (2026-08-31). The Industrial &
 * Mixed-Use card was removed per client direction and replaced with
 * Senior Living & Healthcare.
 */
const cards = [
  {
    name: "Hotels & Hospitality",
    line: "Grounds that stay guest-ready through every season.",
    // Licensed client-supplied photo (AdobeStock_22197606)
    img: "/images/placeholders/industry-hotel-entry.avif",
    alt: "Hotel entrance with red tulip beds, fresh mulch, and a glass canopy",
  },
  {
    name: "Property Management",
    line: "Every property on schedule, documented, and off your desk.",
    // Client-supplied photo (2026-08-31)
    img: "/images/industries/property-management.webp",
    alt: "Modern apartment buildings around a landscaped central courtyard and walkway",
  },
  {
    name: "HOAs & Condominiums",
    line: "Common areas residents are proud of, board meetings without complaints.",
    // Client-supplied photo (2026-08-31); responsive AVIF variants — the
    // 1577px master stays as fallback only (performance pass v44)
    img: "/images/industries/hoa-condominiums-800.avif",
    srcSet:
      "/images/industries/hoa-condominiums-800.avif 800w, /images/industries/hoa-condominiums-1200.avif 1200w",
    alt: "Aerial view of a planned residential community with manicured lawns and tree-lined streets",
  },
  {
    name: "Retail & Commercial",
    line: "Curb appeal that holds up to foot traffic, week after week.",
    // Client-supplied photo (2026-08-31)
    img: "/images/industries/retail-commercial.webp",
    alt: "A retail center with a clean lawn edge, trimmed beds, and a full parking lot",
  },
  {
    name: "Office Parks",
    line: "Grounds maintenance that keeps every building on schedule.",
    // Licensed client-supplied photo (AdobeStock_1360962970)
    img: "/images/placeholders/industry-office-park.avif",
    alt: "Office park building with manicured lawn and a clean striped parking lot",
  },
  {
    name: "Senior Living & Healthcare",
    line: "Calm, well-kept grounds that residents and families notice.",
    // Licensed client-supplied photo (mowcow-lawn — community entrance grounds)
    img: "/images/placeholders/industry-senior-living.avif",
    alt: "Community building entrance with clipped hedges, fresh mulch beds, and a manicured lawn",
  },
];

export function IndustryCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {cards.map((card) => (
        <li key={card.name}>
          <div className="relative aspect-[3/2] overflow-hidden bg-charcoal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.img}
              srcSet={"srcSet" in card ? card.srcSet : undefined}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
              alt={card.alt}
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-xl">{card.name}</h2>
            <p className="mt-1 text-[0.9375rem] leading-snug text-charcoal/70">
              {card.line}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
