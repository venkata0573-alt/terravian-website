import Image from "next/image";
import Link from "next/link";
import { MainNav } from "./MainNav";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Site header. The circular leaf-and-shovel icon mark appears here ONCE
 * (and once more in the footer as the full lockup) — never as decoration.
 * White background: the supplied logo artwork has a white background;
 * transparent variants are pending from Terravian (see completion report).
 */
export function SiteHeader() {
  return (
    <header className="relative border-b border-charcoal/10 bg-white">
      <div className="container-chrome flex items-center justify-between gap-6 py-3">
        <Link
          href="/"
          aria-label="Terravian Landscaping — home"
          className="flex items-center gap-3"
        >
          {/* Logo instance 1 of 2: icon mark (real brand asset, approved) */}
          <Image
            src="/images/brand/terravian-mark-icon.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11"
          />
          <span className="flex flex-col items-center leading-none">
            {/* Official Terravian wordmark (client brand guideline,
                text-only reference): Cinzel Bold caps — TERRAVIAN forest
                over LANDSCAPING earth, LANDSCAPING CENTERED beneath
                TERRAVIAN. Geometry validated pixel-by-pixel against the
                supplied artwork in a local render lab before coding:
                L cap = 0.69× T cap, L width = 0.885× T width, both lines
                at (near-)natural Cinzel tracking, glyph-to-glyph line
                gap = 0.27× T cap (mt-[-1px] at this size). */}
            <span className="brand-serif block font-wordmark text-[1.375rem] font-bold tracking-[-0.011em] text-forest">
              TERRAVIAN
            </span>
            <span className="brand-serif mt-[-1px] block w-fit font-wordmark text-[0.95rem] font-bold tracking-[-0.014em] text-earth">
              LANDSCAPING
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <MainNav />
          <ButtonLink
            href="/request-a-proposal"
            className="hidden px-5 py-2.5 text-sm md:inline-flex"
          >
            Request a Proposal
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
