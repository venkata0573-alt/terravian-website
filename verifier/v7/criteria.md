# v7 criteria — mobile-first experience overhaul

Trigger (user feedback on the live site): on phone, header/hero images are
badly cropped, there is too much written content, structure and alignment
feel off, and the overall visual impression is poor. Desktop is fine.

Scope: phone viewports (primary 390×844, sanity 360×800). Desktop must not
regress (spot-check 1440).

## Acceptance criteria

1. **Hero imagery** — at 390px the hero photo is art-directed (correct
   `object-position`/crop or a mobile-tuned source), the focal subject is
   visible, and headline text stays legible over it. No awkward slivers,
   no subject cut in half.
2. **Content density** — mobile sections are scannable: shortened or
   restructured copy where desktop-length paragraphs overwhelm small
   screens (progressive disclosure, tighter line-lengths, fewer stacked
   text blocks per viewport). Key pages (home, services, contact) get the
   density pass.
3. **Structure & alignment** — consistent left edges, no orphaned centered
   blocks mixed with left-aligned ones without intent, cards/rails stack
   cleanly, CTAs reachable by thumb (full-width or prominent on mobile).
4. **Psychology** — above-the-fold on mobile answers "who/what/where/why
   trust" within the first two scrolls; one clear primary CTA repeated at
   decision points; social proof visible early; motion restrained.
5. **Technical gates** — 0 horizontal overflow and 0 broken images at
   390/360 on every page; `tsc --noEmit` clean; production build clean.
6. **Integrity rules remain in force** — no invented testimonials/stats/
   clients; locked image files untouched; no new dependencies.

## Verification method

Playwright screenshots at 390×844 (and 360×800 spot-checks) for /,
/services, /contact + proposal section, one division page; automated
overflow/broken-image scan; visual review of each screenshot against
criteria 1–4; desktop 1440 spot-check for regressions.
