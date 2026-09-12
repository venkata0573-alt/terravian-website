"use client";

import { useState } from "react";

/**
 * Capability explorer — commercial landscaping "What We Handle" redesign.
 * Combines capability selection with large relevant photography: choosing
 * Turf / Beds / Pruning / Seasonal / Maintenance swaps the oversized photo
 * and its one-line description. Vertical ledger of selectors on desktop
 * (no generic button row), horizontal scroll rail on mobile. Client-side
 * cross-fade only — no new dependencies.
 */
export type CapabilityItem = {
  label: string;
  detail: string;
  img: string;
  srcSet?: string;
  alt: string;
};

export function CapabilityExplorer({ items }: { items: CapabilityItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Selector ledger — left column on desktop; on mobile a stacked
          full-width ledger so every category fits the viewport with no
          horizontal scrolling or clipped labels (client direction,
          Step 6). */}
      <ul
        role="list"
        className="flex flex-col lg:col-span-4"
      >
        {items.map((item, i) => {
          const selected = active === i;
          return (
            <li key={item.label} className="border-t border-charcoal/12">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(i)}
                className={`group flex w-full items-baseline gap-4 py-3 text-left transition-colors duration-fast ease-brand lg:py-5 ${
                  selected ? "text-forest" : "text-charcoal/55 hover:text-charcoal"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`text-[0.6875rem] font-semibold tracking-[0.15em] ${
                    selected ? "text-earth" : "text-charcoal/35 group-hover:text-earth/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-2xl leading-tight transition-colors duration-fast ease-brand md:text-[1.75rem] ${
                    selected ? "text-forest" : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Photography + description — dominant right column */}
      <div className="lg:col-span-8">
        <figure className="relative aspect-[16/10] overflow-hidden bg-charcoal">
          {items.map((item, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={item.img}
              src={item.img}
              srcSet={item.srcSet}
              sizes="(max-width: 1024px) 100vw, 890px"
              alt={i === active ? item.alt : ""}
              aria-hidden={i === active ? undefined : true}
              width={1200}
              height={750}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-brand ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Mobile: clean image with the short capability label below it;
              desktop keeps the overlaid caption panel (client direction,
              Step 3). */}
          <figcaption className="absolute bottom-0 left-0 max-w-md bg-charcoal/60 p-4 max-md:hidden md:p-5">
            <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263]">
              {current.label}
            </span>
            <span className="mt-1.5 block text-sm leading-snug text-cream">
              {current.detail}
            </span>
          </figcaption>
        </figure>
        <p className="mt-2 text-sm font-semibold text-charcoal/80 md:hidden">
          {current.label}
        </p>
        {/* Screen-reader announcement of the active capability text */}
        <p aria-live="polite" className="sr-only">
          {current.label}: {current.detail}
        </p>
      </div>
    </div>
  );
}
