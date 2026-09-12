"use client";

import { motion } from "framer-motion";

/**
 * Hero "drift" — a very slow vertical pan on the hero photograph for the
 * Landscaping page's living/natural feel. Gentle, continuous, and desktop
 * only (the brief asks for simplified motion on mobile). The 6% scale
 * guarantees coverage at both ends of the pan — no gradients, no gaps.
 *
 * Reduced motion is handled by the app-wide MotionConfig
 * (reducedMotion="user" in app/layout.tsx), which stills the animation —
 * NOT by branching the markup. Rendering different HTML on the client
 * based on useReducedMotion() caused a hydration mismatch (React #418)
 * for reduced-motion visitors; the DOM is now identical either way.
 */
export function HeroDrift({ src, srcSet, alt }: { src: string; srcSet: string; alt: string }) {
  return (
    <>
      {/* Mobile: plain static photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      />
      {/* Desktop: slow drift (instant/static under prefers-reduced-motion
          via MotionConfig) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        animate={{ y: ["-2.5%", "2.5%", "-2.5%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet}
          sizes="100vw"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full scale-[1.06] object-cover"
        />
      </motion.div>
    </>
  );
}
