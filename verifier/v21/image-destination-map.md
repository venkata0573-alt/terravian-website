# v21 — Image → destination map (lightbox removal audit)

Client rule: service-card images navigate to that service's page;
project/case-study images navigate to the case-study page; decorative
images with no relevant destination are not clickable.

## Audit result — every clickable image on the site

| # | Component / page | Image(s) | Before | After (destination) |
|---|---|---|---|---|
| 1 | `components/portfolio/PortfolioGrid.tsx` — /portfolio card covers | Project cover photo | Opened lightbox | **Link → `/portfolio/{slug}`** (aria-label "View the {title} case study", keyboard-focusable, 3px focus outline verified) |
| 2 | `components/services/ServiceGallery.tsx` — /services/* galleries | Gallery photos | Opened lightbox | **Non-clickable static figures** — the images already live on their destination page; no deeper route exists (no invented routes) |
| 3 | `components/home/DivisionCards.tsx` — homepage divisions | Division photos | Link (unchanged) | Link → `/services/{slug}` (already correct, verified) |
| 4 | `components/services/ServiceCards.tsx` — /services index | Service card photos | Link (unchanged) | Link → `/services/{slug}` (already correct, verified) |
| 5 | `components/home/PortfolioFeature.tsx` — homepage Our Work | Project photos | Link (unchanged) | Link → `/portfolio/{slug}` (already correct, verified) |
| 6 | `components/home/IndustriesStrip.tsx` — homepage industries | Industry tiles | Link (unchanged) | Link → `/industries` (already correct) |

## Decorative (never clickable — confirmed)

HeroRotator slides, FieldMarquee rail, BeforeAfter slider, WorkHero /
ProofOfWork / YearRound / PanoBreak photography, CaseStudy figures and
storm-rail videos, SnowCommand visuals, MaintenanceCalendar, about-page
photos. These have no deeper destination; they render as plain
img/figure/video with descriptive alt text.

## Removed

- `components/portfolio/Lightbox.tsx` (deleted)
- Both trigger sites (PortfolioGrid cover button, ServiceGallery
  thumbnail buttons)
- All lightbox state/focus-restoration code

## Verified (755-check sweep + functional tests)

- No `[role="dialog"]` or image-opening buttons remain at any width
- Cover-image click → correct case-study URL; page renders heading + CTA
- Gallery figures: zero inside <a>/<button>
- Keyboard: Tab reaches every card image link with visible 3px outline
