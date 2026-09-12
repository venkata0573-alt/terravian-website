import type { FieldPhoto } from "@/content/recentWork";

/**
 * Field photo rail — a continuous, slow horizontal drift of project photos
 * with a small name under each (no details). Pure CSS animation
 * (globals.css: field-drift); it pauses on hover, freezes under
 * prefers-reduced-motion, and becomes manually scrollable there.
 *
 * The track renders two identical halves; the -50% translate loops
 * seamlessly. The second half is aria-hidden and its images carry empty
 * alt so assistive technology meets the set only once.
 *
 * Shared by the Landscape & Maintenance service page and the homepage
 * (heading text is configurable per placement).
 */
export function FieldMarquee({
  items,
  eyebrow = "From the field",
  title = "Season color, stone, and structure",
}: {
  items: FieldPhoto[];
  eyebrow?: string;
  title?: string;
}) {
  // Three copies per half keep one half wider than any practical viewport.
  const half = [...items, ...items, ...items];

  return (
    <section
      aria-labelledby="field-rail-heading"
      className="border-y border-charcoal/10 py-10 md:py-12"
    >
      <div className="container-site">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id="field-rail-heading"
          className="mt-2 text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.2]"
        >
          {title}
        </h2>
      </div>
      <div className="field-marquee mt-8 overflow-hidden">
        <div className="field-marquee-track flex w-max">
          {[0, 1].map((halfIndex) => (
            <ul
              key={halfIndex}
              aria-hidden={halfIndex === 1 ? true : undefined}
              className="flex gap-5 pr-5"
            >
              {half.map((photo, i) => (
                <li
                  key={`${halfIndex}-${i}`}
                  className="w-[240px] shrink-0 md:w-[300px] lg:w-[340px]"
                >
                  <figure>
                    <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.img}
                        srcSet={photo.srcSet}
                        sizes="(max-width: 767px) 240px, (max-width: 1023px) 300px, 340px"
                        alt={halfIndex === 1 ? "" : photo.alt}
                        width={1000}
                        height={1250}
                        loading="lazy"
                        decoding="async"
                        tabIndex={halfIndex === 1 ? -1 : undefined}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-sm font-semibold text-charcoal/80">
                      {photo.name}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
