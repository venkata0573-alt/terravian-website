# v22 — Four Service Divisions: Acceptance Criteria

Source: client validation document sections 9–13 (site-wide service
integration audit for the expansion from three to four primary service
divisions).

## Canonical divisions (order)

1. Landscape & Maintenance — `/services/commercial-landscaping`
2. Snow & Ice Management — `/services/snow-ice-management`
3. Patio & Hardscape Design-Build — `/services/hardscape-design`
4. Asphalt & Pavement Services — `/services/asphalt-pavement` (NEW)

## C1 — Shared source of truth (§12)

- `content/services.ts` carries all four divisions; slug added to
  `ServiceSlug` in `types/project.ts`.
- `content/serviceDetails.ts` carries a full asphalt entry (process,
  gallery, FAQs, industry anchors) so `/services/asphalt-pavement`
  renders the complete generic template.
- Auto-updating consumers verified: nav (desktop + mobile), footer,
  sitemap, service JSON-LD, proposal-form checkbox options, about page.

## C2 — Homepage integration (§10, §13)

- `DivisionCards` shows four balanced cards — no awkward orphan card.
  Grid: 1-col mobile, 2×2 tablet, 4-across wide desktop.
- `ServiceCards` (services index) shows four balanced cards:
  1-col mobile, 2×2 tablet/laptop, 4-across wide desktop.
- Asphalt card carries equal visual weight (same card anatomy, same
  aspect, same CTA treatment).
- No full homepage redesign; only the affected grids/composition change.

## C3 — Messaging (§11)

- Preferred positioning present: "One company. Every season." and
  "Complete property care. One accountable partner."
- Removed everywhere: "One crew, every season", "Lawns, snow, and
  stone", "three divisions / three service lines" language.
- No implication that one physical crew performs every type of work —
  teams/capabilities framed under one company.
- Snow-specific "One crew for the whole storm" stays (single-storm
  operations context, not a divisions claim).
- Four service names are NOT forced into every paragraph.

## C4 — Consistency sweep (§9)

- Maintenance calendar gains an Asphalt & Pavement row.
- Industries cross-links include asphalt where relevant.
- `/services/asphalt-pavement` returns 200 with intro, capabilities,
  who-it's-for, gallery (labeled placeholders), FAQs, related-projects
  fallback note, FAQ/service JSON-LD.
- No route, form, SEO, accessibility, or desktop-layout regressions.

## C5 — Integrity (standing rules)

- No asphalt photography supplied → labeled placeholder assets only.
- No invented stats, clients, testimonials, or asphalt project claims.
- Division 3 renamed to "Patio & Hardscape Design-Build" (canonical doc
  name); slug and route unchanged.

## C6 — Verification

- `npm run lint`, `npx tsc --noEmit`, unit tests, production build all pass.
- Responsive sweep: all routes × 9 widths, no overflows/errors.
- Homepage visual validation at desktop (1440), tablet (768), mobile
  (390): four-card balance, image cropping, CTA spacing, nav consistency,
  no old three-service messaging. Rendered result is the acceptance
  criterion — compare screenshots, not just code.
