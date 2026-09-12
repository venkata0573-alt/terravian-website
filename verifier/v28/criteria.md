# v28 — Asphalt page layout restructure: analysis + acceptance criteria

Date: 2026-09-07
Trigger: client screenshots of /services/asphalt-pavement at ~1512 CSS px
(image 41–44) judged "very bad and unprofessional" — alignment, spacing,
empty areas. Brief: analyze first (spacing, size, empty space, human
psychology), validate the plan, THEN code. No content invention; no
redesign of unrelated pages; brand tokens untouched.

## A. Measured diagnosis of the current (v27) layout @1440px

| # | Defect | Measurement | Why the brain reads it as "broken" |
|---|--------|-------------|-------------------------------------|
| 1 | Inverted visual hierarchy in Level One: the supporting hot-mix video (652×367) is 57% wider than the level's hero image (sealcoating 416px). Motion + largest area = the eye lands on secondary footage first. | 652px vs 416px | Visual weight must match narrative rank; when proof outweighs the subject, the section feels leaderless. |
| 2 | Orphan whitespace under the maintenance bullets: bullets end 121px before the hot-mix video begins; under the sealcoating caption the void reads as a missing module. | 121px / 40px irregular | Gestalt proximity: irregular gaps inside one group look accidental; users read empty rectangles as unloaded or deleted content. |
| 3 | Blank band between hot-mix caption and Level Two eyebrow. | 247px | A full-width empty strip at a section boundary reads as a rendering failure, not as rhythm. |
| 4 | Level Two: portrait saw photo (706px) beside a 410px text block → dead rectangle under the bullets. | ~420px void | Baseline mismatch >30% between side-by-side items reads as misalignment, not editorial stagger. |
| 5 | Two-up row height mismatch: curb 893px vs crack-repair 503px. | 390px void | Adjacent cards with unaligned bottoms and no shared baseline signal "grid leftover". |
| 6 | Five different display aspect ratios across two viewports (4:3, 9:16, 1.78, 3:4, 4:3). | 5 frames | Aspect consistency = calm; every extra frame ratio adds subconscious noise. |

Root cause: the sections were composed by grid convenience, not by
column-bottom accounting. Every void above is a grid leftover.

## B. Restructure plan (computed geometry @1440, container 1400, gap-x-14)

**Level One — Maintenance** (white): text col-5 (~330px) · sealcoating
col-4 4:3 (~356 incl. caption) · crack-sealing video col-3 displayed at
4:5 (~431 incl. caption; file untouched — display frame only, keeps wand
+ crack centered). Column bottoms within ≤ ~101px: irregularity removed,
video demoted to evidence scale. Hot-mix video LEAVES Level One.

**Level Two — Repair**:
- Beat 1: ledger col-6 (~330) | hot-mix video col-6 (~392, native
  540/304 preserved, caption verbatim). Rationale: hot-mix IS repair
  material — semantic congruence with "we cut failed areas out … and
  patch"; motion proof sits beside the promise it supports; the Level
  One crowding, the 247px band, and the repair-text void all die with
  one move. Bottoms within ~62px.
- Beat 2 (mt-12/14): three matched 3:4 portrait frames col-4 each —
  saw cutting (original, uncropped) · asphalt curb · crack repair
  (3:4 display crop verified: wand + flame + sealant + boot all kept).
  Identical heights (571 incl. caption): bottoms align exactly —
  triptych rhythm, no leftover cells.

**Section spacing**: L1 pt-16 pb-14 md:pt-24 md:pb-20; L2 pt-14 pb-16
md:pt-20 md:pb-24 → L1→L2 boundary ≈160px desktop (was 247). L3
(charcoal Restoration) and L4 (Execution) untouched.

**Mobile**: natural single-column stack, media in reading order;
tablet md: row 2 as 3-up.

## C. Acceptance criteria (all must pass before handoff)

1. All 7 media assets appear exactly once; every file byte-identical
   (no re-encode, no re-export); both video captions verbatim.
2. @1440 L1 row: max(column bottoms) − each column bottom ≤ 140px.
3. @1440 L2 beat 1: |text bottom − video bottom| ≤ 80px.
4. @1440 L2 beat 2: three figure heights equal within ±5px; bottoms
   aligned within ±5px.
5. L1 content bottom → L2 eyebrow ≤ 170px @1440.
6. Distinct display aspect ratios in the first two sections ≤ 4
   (4:3, 4:5, 540/304, 3:4).
7. tsc --noEmit clean; eslint 0 errors (≤3 pre-existing warnings);
   production build succeeds.
8. Responsive sweep 126/126 (14 routes × 9 widths): status 200, no
   horizontal overflow, no console/page errors, no ≥400 responses.
9. Mobile 390: reading-order stack, 0px overflow; desktop screenshots
   (1024/1440/1920) judged visually — no intra-row blank rectangle
   > ~140px.
10. Unchanged: all copy, colors, typography, header/footer, homepage,
    other service pages, L3/L4 sections.
