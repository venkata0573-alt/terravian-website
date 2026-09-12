import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { business } from "@/content/business";
import { localBusinessJsonLd } from "@/lib/schema";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { JsonLd } from "@/components/ui/JsonLd";

/**
 * Newsreader variable serif — SELF-HOSTED woff2 (OFL-licensed), loaded via
 * next/font/local with font-display: swap. No external font CDN is used at
 * runtime (per approved-dependency rules). Latin subset, weights 200–800,
 * optical size 6–72 (auto). Roman + italic. Replaces Fraunces: its lowercase
 * "f" stays small and hookless at every optical size, which read as a wrong
 * glyph at headline sizes; Newsreader's "f" is a conventional full serif f.
 */
const newsreader = localFont({
  src: [
    {
      path: "../public/fonts/newsreader-var-latin.woff2",
      style: "normal",
      weight: "200 800",
    },
    {
      path: "../public/fonts/newsreader-italic-var-latin.woff2",
      style: "italic",
      weight: "200 800",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/**
 * Cinzel Bold — self-hosted woff2 (OFL-licensed), loaded via next/font/local.
 * Used ONLY for the official Terravian wordmark in the site header (client
 * direction: header brand name is set in Cinzel Bold caps, matching the
 * supplied brand reference). Not used anywhere else on the site.
 */
const cinzel = localFont({
  src: [
    {
      path: "../public/fonts/cinzel-bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-cinzel",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} — Commercial Property Care | ${business.confirmedPrimaryMarket}, CT`,
    template: `%s | ${business.name}`,
  },
  description:
    "Commercial landscaping, grounds maintenance, snow & ice management, hardscape design, and asphalt & pavement services for commercial properties across Connecticut. The Company That Shows Up.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${cinzel.variable}`}>
      <body>
        {/* reducedMotion="user": all Framer Motion animations respect the
            user's prefers-reduced-motion setting globally */}
        <MotionConfig reducedMotion="user">
          <IntroLoader />
          <SkipLink />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileActionBar />
          <JsonLd data={localBusinessJsonLd()} />
        </MotionConfig>
      </body>
    </html>
  );
}
