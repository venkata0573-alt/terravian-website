# v30 — Site-wide visual & brand cleanup: acceptance criteria

Date: 2026-09-07 · Source brief: uploaded "TERRAVIAN LANDSCAPING — SITE-WIDE
VISUAL & BRAND CLEANUP" (15 numbered sections). Cleanup pass, NOT a redesign.

## Scope decisions (judgment calls recorded up front)

1. PUBLIC BRANDING — "Terravian Landscaping LLC" / ", LLC" removed from:
   metadata descriptions (about, contact), About page intro sentence,
   footer contact address line, OpenGraph siteName, JSON-LD names +
   description. PRESERVED where legally structural: content/business.ts
   `legalName` field value (the registered entity record), privacy page
   (metadata description + contact line — pending legal review document),
   footer copyright (deleted wholesale per §2, so no decision needed).
   Logo artwork untouched (alt already reads "Terravian Landscaping").
2. COPYRIGHT — bottom bar of SiteFooter removed entirely (the "© {year}
   … All rights reserved." + sister tagline line); no replacement. Footer
   main grid padding rebalanced (py-16 → py-14 md:py-16) so no empty band
   remains.
3. REPETITIVE CTA — components/ui/CTASection.tsx deleted; all 6 usages
   removed (homepage, about, how-we-work, industries, portfolio, services
   index). The contextual CaseStudy final-CTA band ("Need the same level
   of care…") is converted from solid bg-forest to neutral (bg-cream,
   charcoal text, forest primary button) — kept because it is case-study
   content, but stripped of the repetitive giant-green pattern.
   Request-a-Proposal page, header button, mobile action bar untouched.
4. FOOTER — bg-charcoal → bg-[#FAF9F5]; text to charcoal family; headings
   and links in forest; dividers charcoal/10; focus rings on-light. Logo
   kept (full lockup, h-32 — artwork unchanged); contact name uses
   business.name. Structure per brief §5 already matched; "Commercial
   property care across Connecticut." retained via coverageStatement in
   the contact column (already present) — bottom bar removed means it
   stays once.
5. GREEN RESTRAINT — after items 3+4, the only remaining solid-green
   block is a tile backing fully covered by photography (PortfolioFeature)
   and small accents (buttons, bullets, chips, markers) — all permitted
   accent use per §6. Charcoal sections (ShortVersion, Asphalt
   Restoration, Hardscape showcase, CaseStudy services-delivered) are
   intentional hierarchy — preserved per §12 + "especially do not modify
   the recently corrected Asphalt & Pavement work". No mechanical swaps.
6. NOTHING ELSE — no copy rewrites, no new sections, no image/video
   changes, no route/nav/form changes.

## Acceptance criteria

1. grep "LLC" across app/ components/ content/ lib/ — only business.ts
   legalName and privacy page occurrences remain.
2. grep "© " / "All rights reserved" — zero in app/ components/.
3. grep "CTASection" — zero references; file deleted.
4. Rendered DOM: no <section> with bg-forest as a direct background on
   any of the 14 sweep routes (checked at 1440).
5. Footer background computed rgb(250, 249, 245); copyright text absent;
   all footer links/phone/mailto resolve 200.
6. No empty containers: removing CTA sections leaves no element taller
   than 8px with zero content between last section and footer on the 6
   affected pages.
7. tsc clean; eslint 0 errors / ≤3 pre-existing warnings; build OK.
8. Sweep 126/126 (14 routes × 9 widths).
9. Rendered visual QC at 1440 + 390 on: /, /about, /how-we-work,
   /industries, /services, /portfolio, /portfolio/<case>, /contact,
   /request-a-proposal — footer alignment, no broken padding at former
   CTA locations, green reads as accent.
10. Asphalt page geometry unchanged from v28 (spot-check beat-1 diff
    ≤80px, triptych bottoms ±5px).
