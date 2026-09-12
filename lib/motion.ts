/**
 * Motion tokens — restrained movement only (see spec §Motion).
 * Durations in seconds for Framer Motion; CSS mirrors use tailwind tokens.
 */
export const MOTION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  easing: [0.2, 0, 0, 1] as [number, number, number, number], // decelerate — the only approved easing
  revealDistance: 24, // px — small vertical rise, nothing more
};

/** Standard scroll-reveal variant for section content. */
export const revealVariants = {
  hidden: { opacity: 0, y: MOTION.revealDistance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.base, ease: MOTION.easing },
  },
};
