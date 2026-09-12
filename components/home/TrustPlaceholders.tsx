import Image from "next/image";

/**
 * Selected-properties block — client brand rail.
 * Logo files were supplied directly by the client for the brands whose
 * properties Terravian crews serve. Marks remain the property of their
 * respective owners; the rail is a continuous, slow drift in the same
 * motion language as the "In the field" rail — white tiles, hairline
 * rules, sharp corners, no boxes-within-boxes beyond the tile itself.
 *
 * Size tiers keep optically consistent logo weight across very different
 * mark geometries (wide wordmarks vs. square plates).
 */
type LogoMark = {
  name: string;
  img: string;
  /** intrinsic cropped size, for next/image */
  w: number;
  h: number;
  tier: "wide" | "mid" | "plate";
};

const clientLogos: LogoMark[] = [
  { name: "Hampton by Hilton", img: "/images/brands/hampton-by-hilton.webp", w: 632, h: 400, tier: "mid" },
  { name: "DoubleTree by Hilton", img: "/images/brands/doubletree-by-hilton.webp", w: 563, h: 400, tier: "mid" },
  { name: "Walmart", img: "/images/brands/walmart.webp", w: 423, h: 123, tier: "wide" },
  { name: "Homewood Suites by Hilton", img: "/images/brands/homewood-suites-by-hilton.webp", w: 564, h: 400, tier: "mid" },
  { name: "Courtyard by Marriott", img: "/images/brands/courtyard-by-marriott.webp", w: 720, h: 111, tier: "wide" },
  { name: "Best Western", img: "/images/brands/best-western.webp", w: 401, h: 400, tier: "plate" },
  { name: "Residence Inn by Marriott", img: "/images/brands/residence-inn-by-marriott.webp", w: 720, h: 134, tier: "wide" },
  { name: "Comfort Inn & Suites by Choice Hotels", img: "/images/brands/comfort-inn-suites.webp", w: 400, h: 400, tier: "plate" },
  { name: "Amazon", img: "/images/brands/amazon.webp", w: 720, h: 241, tier: "wide" },
  { name: "Hilton Garden Inn", img: "/images/brands/hilton-garden-inn.webp", w: 714, h: 242, tier: "wide" },
  { name: "Days Inn by Wyndham", img: "/images/brands/days-inn-by-wyndham.webp", w: 634, h: 400, tier: "mid" },
  { name: "Spark by Hilton", img: "/images/brands/spark-by-hilton.webp", w: 720, h: 281, tier: "wide" },
  { name: "Motel 6", img: "/images/brands/motel-6.webp", w: 402, h: 400, tier: "plate" },
  { name: "Fairfield by Marriott", img: "/images/brands/fairfield-by-marriott.webp", w: 529, h: 128, tier: "wide" },
];

const tierClass: Record<LogoMark["tier"], string> = {
  wide: "h-9 md:h-11",
  mid: "h-11 md:h-14",
  plate: "h-14 md:h-16",
};

export function LogoPlaceholderGrid() {
  return (
    <div>
      {/* Full-bleed drift rail — motion matches the field rail exactly,
          so the two sections read as one visual language */}
      <div className="field-marquee overflow-hidden">
        <div className="field-marquee-track flex w-max">
          {[0, 1].map((halfIndex) => (
            <ul
              key={halfIndex}
              aria-hidden={halfIndex === 1 ? true : undefined}
              className="flex items-stretch gap-4 pr-4 md:gap-5 md:pr-5"
            >
              {clientLogos.map((logo) => (
                <li key={`${halfIndex}-${logo.name}`} className="shrink-0">
                  <div className="flex h-24 items-center justify-center border border-charcoal/10 bg-white px-7 md:h-28 md:px-9">
                    <Image
                      src={logo.img}
                      alt={halfIndex === 1 ? "" : logo.name}
                      width={logo.w}
                      height={logo.h}
                      loading="lazy"
                      decoding="async"
                      tabIndex={halfIndex === 1 ? -1 : undefined}
                      className={`${tierClass[logo.tier]} w-auto object-contain`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="container-site mt-6 text-sm font-medium text-charcoal/70">
        All brand marks are the property of their respective owners.
        Property references are shared during the proposal process.
      </p>
    </div>
  );
}

/**
 * Testimonials block — PLACEHOLDERS ONLY.
 * No fabricated quotes, names, or roles. Cards contain label text only
 * until genuine, approved, permissioned testimonials exist.
 */
export function TestimonialPlaceholders() {
  return (
    // Mobile: swipeable snap row — three tall stacked placeholder boxes read
    // as broken on a phone. md+: the original three-column grid.
    <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
      {Array.from({ length: 3 }, (_, i) => (
        <li
          key={i}
          className="flex w-[78%] shrink-0 snap-start flex-col border border-charcoal/10 bg-white p-6 md:w-auto md:shrink"
        >
          {/* PLACEHOLDER — REPLACE WITH: verified customer testimonial
              (genuine quote, approved wording, written permission, and an
              accurately identified reviewer) */}
          <Image
            src="/images/placeholders/testimonial-portrait-placeholder.webp"
            alt="Coming soon — client-approved review"
            width={400}
            height={400}
            className="h-20 w-20 object-cover"
          />
          <p className="mt-4 flex-1 font-medium text-charcoal/85">
            Coming soon
          </p>
          <p className="mt-3 text-sm text-charcoal/60">
            This space publishes only genuine, client-approved reviews with
            written permission.
          </p>
        </li>
      ))}
    </ul>
  );
}
