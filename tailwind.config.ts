import type { Config } from "tailwindcss";

/**
 * Terravian design tokens — locked brand system (see Part 1 design doc §4).
 * No colors beyond the five locked brand tokens plus their documented derivatives.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#2F6D4D", // official Terravian green (client brand pass) — CTAs, active states, small accents only
          dark: "#235039", // derived hover shade (-8% lightness)
        },
        earth: {
          DEFAULT: "#7C500C", // bronze accent — used sparingly
          dark: "#68430A", // derived hover shade
        },
        charcoal: "#1C1C1C", // locked text / dark bands
        paper: "#FCFCF9", // warm white — primary site background (replaces cream-everywhere)
        cream: "#FAF7F0", // retained for dark-surface text and legacy components
        stone2: "#F2F1EC", // warm light neutral — alternating section bands
        tint: "#E4EFE4", // light-green tint — active nav, table rows
      },
      fontFamily: {
        // Newsreader variable serif — self-hosted woff2 via next/font/local (see app/layout.tsx)
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        // Cinzel Bold — self-hosted woff2 via next/font/local; official wordmark only (header brand name)
        wordmark: ["var(--font-cinzel)", "Georgia", "serif"],
        // Approved body stack: Helvetica first, no external font files required
        body: ['"Helvetica Neue"', "Helvetica", "Arial", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "90rem", // 1440px — scales up on large monitors instead of capping at laptop width
        "container-wide": "100rem", // 1600px — header/footer chrome reads edge-to-edge on big screens
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.2, 0, 0, 1)", // decelerate — the only approved easing
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      borderRadius: {
        none: "0", // sharp corners are the brand default — do not round cards/buttons
      },
    },
  },
  plugins: [],
};

export default config;
