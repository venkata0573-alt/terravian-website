"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Masonry grid-line assembly — a very subtle construction flourish for the
 * Hardscape page. Four thin lines draw in underneath the section heading
 * (horizontal, then three verticals) as it enters the viewport, like
 * snapped chalk lines on a layout. Purely decorative; instant under
 * prefers-reduced-motion.
 */
export function MasonryLines() {
  const reduce = useReducedMotion();
  const line = "bg-charcoal/20";
  const d = (delay: number) => ({
    initial: reduce ? false : { scaleX: 0, scaleY: 0 },
    whileInView: { scaleX: 1, scaleY: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });
  return (
    <div aria-hidden="true" className="relative mt-3 h-7 w-full max-w-md">
      <motion.span className={`absolute left-0 top-1/2 h-px w-full origin-left ${line}`} {...d(0)} />
      <motion.span className={`absolute bottom-0 left-[12%] top-0 w-px origin-top ${line}`} {...d(0.25)} />
      <motion.span className={`absolute bottom-0 left-1/2 top-0 w-px origin-top ${line}`} {...d(0.4)} />
      <motion.span className={`absolute bottom-0 left-[88%] top-0 w-px origin-top ${line}`} {...d(0.55)} />
    </div>
  );
}
