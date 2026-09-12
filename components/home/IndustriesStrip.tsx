import Link from "next/link";
import { industries } from "@/content/industries";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Industries served — homepage summary; each card links to the anchored
 * segment on the Industries page. CTAs use industry-specific labels
 * ("Explore Hospitality", etc. — client direction) over the same anchors.
 * Cards rest at 70% white so the section's panorama stays visible through
 * them (client direction — supersedes the earlier 90-94% spec); hover/focus
 * eases the border toward forest green and the card to full opacity, arrow
 * nudges 4px — 150ms, no lift, no scale, no shadow. The section's background
 * image lives in app/page.tsx and is untouched by card state.
 */
const ctaLabels: Record<string, string> = {
  "hotels-hospitality": "Explore Hospitality",
  "property-management": "Explore Property Management",
  "hoa-condominium": "Explore Communities",
  "retail-commercial": "Explore Commercial",
  "industrial-mixed-use": "Explore Industrial",
};

export function IndustriesStrip() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {industries.map((ind) => (
        <li
          key={ind.id}
          className="group flex flex-col border border-charcoal/15 bg-white/70 p-5 transition-colors duration-fast ease-brand focus-within:border-forest/70 focus-within:bg-white hover:border-forest/70 hover:bg-white md:px-6 md:py-5"
        >
          <h3 className="text-lg leading-snug">{ind.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/85">{ind.problem}</p>
          <Link
            href={`/industries#${ind.id}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-forest transition-colors duration-fast ease-brand hover:text-forest-dark focus-visible:text-forest-dark"
          >
            {ctaLabels[ind.id] ?? "Explore"}
            <ArrowRightIcon
              size={16}
              className="transition-transform duration-fast ease-brand group-hover:translate-x-1 group-focus-within:translate-x-1"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
