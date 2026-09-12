/**
 * Atmospheric snowfall — pure CSS, zero JS, purely decorative.
 * Small, slow, low-opacity flakes with natural randomization (deterministic
 * seeded values, so server and client always agree). Disabled entirely
 * under prefers-reduced-motion; fewer flakes on small screens (CSS).
 * This is atmosphere, not decoration-as-content — aria-hidden throughout.
 */

function rand(seed: number): number {
  // Deterministic LCG — same values on every render, no hydration risk.
  let s = (seed * 2654435761) >>> 0;
  s = (s * 1664525 + 1013904223) >>> 0;
  return s / 4294967296;
}

const FLAKES = Array.from({ length: 22 }, (_, i) => ({
  left: rand(i + 1) * 100,
  size: 2 + rand(i + 101) * 3,
  duration: 14 + rand(i + 202) * 12,
  delay: -rand(i + 303) * 26,
  opacity: 0.15 + rand(i + 404) * 0.25,
  drift: (rand(i + 505) - 0.5) * 4,
}));

export function Snowfall() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLAKES.map((f, i) => (
        <span
          key={i}
          className="snowfall-flake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as string]: `${f.drift}rem`,
          }}
        />
      ))}
    </div>
  );
}
