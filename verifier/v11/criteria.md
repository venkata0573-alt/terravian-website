# v11 — How We Work polish pass (acceptance criteria)

Goal: final art-direction/UX polish of /how-we-work (v10 narrative preserved).
Refine through composition, spacing, typography, proportion — no new cards,
gradients, decorative graphics, icons, or copy blocks. No new visual language.

## Must pass at handoff
1. **Hierarchy**: one dominant focal point per viewport while scrolling; no
   two elements competing at equal weight (incl. CTA band — one clear
   primary action).
2. **Rhythm**: alternating band contrast preserved (paper → charcoal →
   paper → stone2 → paper → photo → white → forest); section padding
   consistent (py-16 md:py-24 family); no section feels like a dead zone
   or a text slab.
3. **Alignment**: edges agree across neighboring sections — hero grid,
   loop grid, proof grid, year-round grid all hang on the same container
   columns; intra-section baselines (numerals, nodes, rules, captions)
   verified in screenshots at 1440/390/360.
4. **Balance**: no column-pair with >~30% height mismatch leaving visible
   dead space (hero, proof, year-round left/right pairs measured).
5. **Proof legibility**: sample record reads as a document specimen at all
   sizes; label visible; overlap composition intact on mobile.
6. **Pano legibility**: gold eyebrow + cream line readable against both
   bright sky and dark water areas (screenshot-verified).
7. **Footer**: logo scale, tagline placement, and column balance feel
   intentional on the page (changes global → regression-check 4 routes).
8. **CTA hierarchy**: exactly one primary-styled action in the closing
   band; all targets ≥44px tall; mobile stacking clean.
9. **Integrity/brand**: no invented stats/names/testimonials; locked
   palette; sharp corners; no gradients; header untouched.
10. **Gates**: tsc + build clean; 0 overflow, 0 broken images at
    1440/390/360; heading order intact; reduced-motion static.

## Method
Full-page segment screenshots (desktop 1440 + mobile 390) BEFORE changes;
documented issue list; iterate; re-audit after each pass; stop when
remaining items are preference-level only.
