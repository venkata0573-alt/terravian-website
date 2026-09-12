# v23 — Asphalt Assets Integration: Acceptance Criteria

Source: client asset brief (6 images + 1 video, numbered assignments).

## C1 — Asset assignment (per brief numbering)

- Image 1 (paving scene, roller+workers+fresh mat): NEW homepage hero
  slide at position 3 (before hardscape), homepage division card,
  services-index card, asphalt page hero. Responsive crops: desktop
  16:9, mobile 4:5 focal on roller/fresh mat — no plain center-crop.
- Image 2 (hot-pour crack repair): asphalt page repair content.
  NOT a hero.
- Image 3 (paver machine, portrait): restoration/reconstruction content
  in a vertical/editorial position — no forced wide crop.
- Image 4 (lot sealcoating): preventive-maintenance content.
- Image 5 (saw cutting, real field): repair/process content, authentic
  character preserved (resize only).
- Image 6 (crew + equipment at commercial property): commercial
  execution/process positioning.
- Video 1 (crack sealing, 25s): asphalt page preventive-maintenance
  section. Muted, playsinline, loop, poster, lazy (preload=metadata),
  reduced-motion respected. NOT a homepage hero.

## C2 — Homepage

- Hero: 4 slides in order landscaping → snow → asphalt → hardscape;
  identical UI/transitions/controls; existing 3 slides untouched.
- Division band: green COMING SOON placeholder replaced by Image 1;
  card copy unchanged; CTAs share a visual baseline (two-line titles
  must not push CTAs lower).
- "One Company. Every Season." headline: single line on laptop/desktop
  (no hanging em dash); intentional two-line form allowed on mobile
  ("Complete property care." / "One accountable partner."); intro
  paragraph without orphan words, still concise.

## C3 — Asphalt page architecture

- Personality hero (Image 1) replacing the generic template top.
- Services organized by intervention level — Maintenance / Repair /
  Restoration / Reconstruction / Finishing — with photography between
  concepts, not a service-card wall.
- Commercial positioning: safety, liability, drainage, longevity,
  capital planning; no "#1 / best" claims.
- FAQ, related-projects fallback, CTA, JSON-LD preserved.

## C4 — Performance & responsive

- AVIF everywhere; hero srcset 640/1080/1920 names (asphalt master is
  1672px → 1920 slot holds the 1600px master); mobile gets art-directed
  crops, not desktop-resolution downloads; below-fold images lazy.
- Video: 540w re-encode (~6 MB), poster frame, preload=metadata.
- No CLS: all media carry explicit dimensions.
- Visual validation at 390/430/768/1440/1920 — hero crops, division
  band, asphalt page imagery, video block, CTA tap areas.

## C5 — Regression guard

- tsc clean, lint 0 errors, unit 20/20, production build passes.
- Full responsive sweep (14 routes × 9 widths) stays green.
- No unrelated design changes; brand system untouched.
