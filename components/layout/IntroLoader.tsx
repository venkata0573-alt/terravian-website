"use client";

import { useEffect, useState } from "react";
import { business } from "@/content/business";

/**
 * Intro loader — the first thing a visitor sees each session: the Terravian
 * mark centered on a cream field, making one slow, full turn while the
 * tagline settles beneath it, then the page fades in.
 *
 * Behavior:
 * - Shows once per browser session (sessionStorage flag).
 * - Fully CSS-animated, so with JavaScript disabled the overlay still
 *   dismisses itself (see .intro-loader in globals.css) — content is never
 *   trapped behind it.
 * - prefers-reduced-motion: the global reduced-motion rule collapses all
 *   animation durations, so the loader flashes by instantly with no spin.
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tl-intro") === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setShow(false);
      return;
    }
    try {
      sessionStorage.setItem("tl-intro", "1");
    } catch {
      /* private mode — loader simply shows again next visit */
    }
    // Unmount shortly after the CSS fade completes (2.1s).
    const timer = setTimeout(() => setShow(false), 2300);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="intro-loader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
    >
      {/* The circular brand mark turns directly on the cream field —
          client direction: the circle only, no square plate. Guards so no
          rectangular canvas can ever show during the turn: the asset is
          regenerated clean (zero stray pixels outside the inscribed
          circle), the img is hard-clipped to a circle, the ROTATION runs
          on the img itself, and the soft ground shadow lives on a STATIC
          non-rotating circular wrapper (a drop-shadow on a rotating layer
          can expose its rectangular raster bounds). */}
      <div className="h-40 w-40 rounded-full shadow-[0_18px_30px_rgba(28,28,28,0.18)] md:h-52 md:w-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/terravian-mark-circle-416.avif"
          srcSet="/images/brand/terravian-mark-circle-416.avif 416w, /images/brand/terravian-mark-circle-640.avif 640w"
          sizes="(max-width: 767px) 160px, 208px"
          alt=""
          width={640}
          height={640}
          className="intro-badge h-40 w-40 rounded-full object-cover md:h-52 md:w-52"
        />
      </div>
      <p className="intro-tagline mt-7 text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-earth md:text-xs">
        {business.tagline}
      </p>
    </div>
  );
}
