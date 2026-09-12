"use client";

import { useState } from "react";

/**
 * "What We Handle" — progressive disclosure replacing the old Capabilities
 * text box. High-level category chips only; tapping one reveals a single
 * short explanation. Never more than one paragraph on screen.
 */
export type HandleItem = { label: string; detail: string };

export function WhatWeHandle({ items }: { items: HandleItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <ul className="flex flex-wrap gap-2.5" role="list">
        {items.map((it, i) => (
          <li key={it.label}>
            <button
              type="button"
              aria-expanded={open === i}
              aria-controls="what-we-handle-detail"
              onClick={() => setOpen(i)}
              className={`border px-4 py-2.5 text-sm font-semibold transition-colors duration-fast ${
                open === i
                  ? "border-forest bg-forest text-cream"
                  : "border-charcoal/20 bg-white text-charcoal hover:border-forest hover:text-forest"
              }`}
            >
              {it.label}
            </button>
          </li>
        ))}
      </ul>
      <p
        id="what-we-handle-detail"
        aria-live="polite"
        className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-charcoal/80"
      >
        {items[open].detail}
      </p>
    </div>
  );
}
