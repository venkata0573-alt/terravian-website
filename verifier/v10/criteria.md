# v10 — How We Work page redesign (acceptance criteria)

Goal: redesign /how-we-work from a text-heavy, procedural page into a premium,
visual-storytelling page for commercial decision-makers (hotel GM, property
manager, HOA manager, facilities director). Brand system locked; no new deps.

## Must pass
1. **Concept**: clear narrative top→bottom: emotional promise → 5-second
   comprehension → the five-stage loop → proof of documentation → year-round
   calendar → named programs → CTA. No long row of identical cards; no
   accordions; no paragraph walls (no body paragraph > ~40 words).
2. **Benefits before copy**: a first-time visitor can grasp "one partner,
   written plan, photo proof, all year" within the hero + one scroll.
3. **Imagery**: at least two real photographs art-directed into the page
   (crew walkthrough in hero; completed-visit photo in proof section);
   no "COMING SOON" placeholder plates presented as photography.
4. **Integrity**: zero invented stats, client names, logos, testimonials,
   awards. Sample service record is explicitly labeled "Sample format" and
   contains only blank/placeholder fields. Programs keep ™ on first use.
5. **Brand**: only locked palette (forest/earth/charcoal/cream/stone2/tint/
   paper, on-photo gold), sharp corners, no gradients (localized scrims /
   per-glyph shadows only), sans-led headings with serif italic accents,
   header/footer untouched.
6. **Motion**: restrained — standard Reveal + one scroll-linked progress
   line (disabled/static under prefers-reduced-motion). Nothing else moves.
7. **Accessibility**: h1→h2→h3 order intact, stages are a real <ol>,
   calendar table semantics preserved, all images have alt, focus styles
   intact, AA contrast on all text.
8. **Responsive**: 390/360px — no horizontal overflow, no broken images,
   hero composition stacks cleanly, record-card overlap degrades to stack.
9. **Regression**: build clean (tsc + 27/27 or updated route count), home,
   services, industries, contact pages unchanged and rendering (spot-check).
10. **Retired code**: StageTimeline.tsx and OutcomeCards.tsx removed; no
    dangling imports; MaintenanceCalendar still used exactly once.

## Narrative section order (locked for this version)
Hero (paper) → Short version (charcoal) → Loop (paper) → Proof (stone2)
→ Calendar (paper) → Pano break (full-bleed photo) → Programs index (white)
→ CTA (forest).
