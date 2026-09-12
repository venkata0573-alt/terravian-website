import type { WorkHighlight } from "@/content/recentWork";

/**
 * Recent-work editorial grid — asymmetric mosaic (landscape / portrait /
 * landscape) with index numbers, a forest top rule, and one-line
 * descriptors. Client-supplied project photography (see
 * content/recentWork.ts); names describe the photo content only.
 * Server component; motion is a single restrained hover zoom.
 */
export function FeaturedWork({ items }: { items: WorkHighlight[] }) {
  return (
    <ul className="mt-10 grid gap-6 lg:grid-cols-12">
      {items.map((item) => {
        const portrait = item.orientation === "portrait";
        return (
          <li
            key={item.n}
            className={portrait ? "lg:col-span-5 lg:row-span-2" : "lg:col-span-7"}
          >
            <figure className={`group ${portrait ? "flex h-full flex-col" : ""}`}>
              <div
                className={`relative overflow-hidden bg-charcoal ${
                  portrait ? "aspect-[3/4] lg:aspect-auto lg:flex-1" : "aspect-[3/2]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  srcSet={item.srcSet}
                  sizes="(max-width: 1024px) 100vw, 668px"
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline gap-4 border-t-2 border-forest pt-3">
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold tracking-[0.15em] text-earth"
                >
                  {item.n}
                </span>
                <div>
                  <h3 className="text-xl leading-snug">{item.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-charcoal/70">
                    {item.line}
                  </p>
                </div>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
