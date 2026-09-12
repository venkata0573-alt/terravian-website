import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Services — the four service divisions, image-first cards (client
 * direction: landscaping + grounds maintenance + seasonal enhancements
 * are ONE service). One image, one name, one benefit line. Hover
 * (desktop) / focus (keyboard) reveals "Explore Service →"; the whole
 * card is the link. On touch devices the CTA is always visible. Grid is
 * balanced for four: stacked on mobile, 2×2 on tablet and laptop,
 * four-across on wide desktop. Asphalt carries a labeled placeholder
 * until real Terravian asphalt photography is supplied (see IMAGES.md).
 */
const cards = [
  {
    name: "Landscape & Maintenance",
    line: "Design, installation, and documented upkeep — one partner, year-round.",
    // Locked division photo (client-locked, AdobeStock_22197603) — do NOT
    // swap when other imagery changes; this file set is frozen.
    img: "/images/placeholders/landscaping-card-lock-800.avif",
    srcSet:
      "/images/placeholders/landscaping-card-lock-800.avif 800w, /images/placeholders/landscaping-card-lock.avif 1200w",
    alt: "Commercial office entrance with red tulip beds, manicured lawn, and a flowering tree",
    href: "/services/commercial-landscaping",
  },
  {
    name: "Snow & Ice Management",
    line: "Open, safe, and documented — before your tenants arrive.",
    img: "/images/placeholders/service-snow-card-800.avif",
    srcSet:
      "/images/placeholders/service-snow-card-800.avif 800w, /images/placeholders/service-snow-card.avif 1200w",
    alt: "Snow removal fleet with plows clearing a commercial lot",
    href: "/services/snow-ice-management",
  },
  {
    name: "Patio & Hardscape Design-Build",
    line: "Patios, fire features, and outdoor rooms built to commercial standards.",
    img: "/images/portfolio/hardscape/hardscape-card-patio-kitchen-800.avif",
    srcSet:
      "/images/portfolio/hardscape/hardscape-card-patio-kitchen-800.avif 800w, /images/portfolio/hardscape/hardscape-card-patio-kitchen-1200.avif 1200w",
    alt: "Paver patio with a square stone fire pit, lounge seating, and a pergola-covered outdoor kitchen at dusk",
    href: "/services/hardscape-design",
  },
  {
    name: "Asphalt & Pavement Services",
    line: "Paving, repair, sealcoating, and striping — documented like every other visit.",
    // Client asset Image 1 (primary asphalt photo), 3:2 card crop.
    img: "/images/placeholders/service-asphalt-card-3x2-800.avif",
    srcSet:
      "/images/placeholders/service-asphalt-card-3x2-800.avif 800w, /images/placeholders/service-asphalt-card-3x2.avif 1400w",
    alt: "Steamroller compacting fresh asphalt while crew members rake the new mat at a commercial property",
    href: "/services/asphalt-pavement",
  },
];

export function ServiceCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" role="list">
      {cards.map((card) => (
        <li key={card.name}>
          <Link
            href={card.href}
            className="group block focus-on-dark"
            aria-label={`${card.name} — ${card.line} Explore service`}
          >
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
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-charcoal/0 transition-colors duration-base ease-brand group-hover:bg-charcoal/45 group-focus-visible:bg-charcoal/45 [@media(hover:none)]:bg-charcoal/25"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex justify-end p-4 opacity-0 transition-opacity duration-base ease-brand group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
              >
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-charcoal">
                  Explore Service
                  <ArrowRightIcon size={15} />
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl">{card.name}</h2>
              <p className="mt-1 text-[0.9375rem] leading-snug text-charcoal/70">
                {card.line}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
