"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION } from "@/lib/motion";

/**
 * Restrained scroll-reveal: short opacity + ≤24px vertical rise, once.
 * Reduced-motion users get content instantly (MotionConfig reducedMotion="user").
 * Content is never hidden from assistive tech or no-JS contexts — this only
 * animates opacity/transform on an already-rendered element.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: MOTION.revealDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: MOTION.base, ease: MOTION.easing, delay }}
    >
      {children}
    </motion.div>
  );
}
