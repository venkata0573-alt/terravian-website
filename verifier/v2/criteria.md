# Verifier v2 — address change + hero revert + full-bleed divisions + contact autocomplete
Created: 2026-08-23. Extends v1 (which stays in force except where contradicted).

## Changes under test
1. Office address = "7 McKee Pl, Cheshire, CT 06410" on /contact, footer, /privacy, JSON-LD.
   Zero occurrences of "Bristol", "Dudley", "Hartford" in visible text on any page.
2. Homepage hero: NO visible headline/subline — only the two-button strip
   (Request a Proposal / Call …), matching the client-approved layout.
3. Division card band: full-bleed — grid left edge = 0 and right edge = viewport width;
   zero gap between cards (no white lines); heading keeps container gutters.
4. Contact form has an address autocomplete field (optional) wired to /api/address-suggest;
   submission still validates and delivers (propertyAddress appears in the lead email rows).
5. v1 layout checks re-run: no overflow, no broken images, 11 pages x 6 viewports.
