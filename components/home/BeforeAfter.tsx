"use client";

import Image from "next/image";
import { useId, useState } from "react";

/**
 * Before/after comparison built on a NATIVE RANGE INPUT + layered images.
 * - Pointer dragging works (range input handles it natively)
 * - Arrow keys adjust the position (native range behavior)
 * - Visible Before / After labels
 * - Accessible text description of the transformation is provided
 * - Without JavaScript, both images render side by side with captions
 *
 * PLACEHOLDER IMAGES — REPLACE WITH: a real, approved Terravian
 * before/after project pair.
 */
export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const sliderId = useId();
  const descId = useId();

  return (
    <div>
      <p id={descId} className="sr-only">
        Comparison slider for a demonstration project. Drag the control or use
        the left and right arrow keys to reveal the before and after images.
        This is placeholder demonstration imagery, not a completed Terravian
        project.
      </p>

      {/* Progressive enhancement: with no JS, the range input does nothing,
          so both images are also provided below with captions. */}
      <div className="relative mx-auto max-w-4xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-charcoal/10 bg-charcoal">
          {/* After (base layer) */}
          <Image
            src="/images/placeholders/portfolio-after-placeholder.webp"
            alt="Coming soon — after photography, demonstration layout"
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            loading="lazy"
          />
          {/* Before (clipped layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            aria-hidden="true"
          >
            <Image
              src="/images/placeholders/portfolio-before-placeholder.webp"
              alt=""
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Visible labels */}
          <span className="absolute left-3 top-3 bg-charcoal/85 px-3 py-1.5 text-sm font-semibold text-cream">
            Before
          </span>
          <span className="absolute right-3 top-3 bg-cream/95 px-3 py-1.5 text-sm font-semibold text-charcoal">
            After
          </span>

          {/* Divider line */}
          <div
            className="absolute inset-y-0 w-0.5 bg-cream"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Native range control — pointer drag AND arrow keys */}
        <div className="mt-4">
          <label htmlFor={sliderId} className="block text-sm font-semibold text-charcoal">
            Comparison position
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-describedby={descId}
            aria-valuetext={`Showing ${position}% of the before image`}
            className="mt-2 w-full accent-forest"
          />
        </div>

        {/* No-JS / reduced-interaction fallback: both images with captions */}
        <noscript>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure>
              <img
                src="/images/placeholders/portfolio-before-placeholder.webp"
                alt="Coming soon — before photography, demonstration layout"
                width={800}
                height={600}
              />
              <figcaption className="mt-2 text-sm font-semibold">Before (demonstration placeholder)</figcaption>
            </figure>
            <figure>
              <img
                src="/images/placeholders/portfolio-after-placeholder.webp"
                alt="Coming soon — after photography, demonstration layout"
                width={800}
                height={600}
              />
              <figcaption className="mt-2 text-sm font-semibold">After (demonstration placeholder)</figcaption>
            </figure>
          </div>
        </noscript>
      </div>

      <p className="mx-auto mt-4 max-w-4xl text-sm text-charcoal/75">
        Demonstration imagery — a real Terravian before/after project pair
        replaces this placeholder after client approval.
      </p>
    </div>
  );
}
