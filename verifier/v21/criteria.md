# v21 — Responsive UX & content correction (client validation doc)

## Trigger
Client validation document + two mobile screenshots (mobile homepage hero
with oversized dark content panel; portfolio lightbox "1 / 7" popup).

## Audit findings (pre-implementation)
- Lightbox component: components/portfolio/Lightbox.tsx.
- Lightbox triggers (the ONLY two): components/portfolio/PortfolioGrid.tsx
  (card cover button) and components/services/ServiceGallery.tsx
  (thumbnail buttons). All other image cards already navigate via Link
  (DivisionCards → service pages, ServiceCards → service pages,
  PortfolioFeature → project pages).
- Mobile hero panel: components/home/HeroRotator.tsx lines ~182–234
  (charcoal/70 panel with eyebrow/headline/paragraph/2 CTA buttons +
  dots). Fixed bottom MobileActionBar already exists with exactly
  "Call Now" (tel) + "Request a Proposal" (/request-a-proposal).
- Copy targets: app/page.tsx divisions intro; components/home/
  PortfolioFeature.tsx system sentence; components/how-we-work/
  WorkHero.tsx accountable-partner paragraph; components/how-we-work/
  ProofOfWork.tsx evidence paragraph; components/how-we-work/
  YearRound.tsx heading + paragraph.

## Criteria
1. Mobile hero (<md): NO content panel, NO duplicated CTA buttons —
   clean photograph + existing fixed bottom bar only; image clear,
   properly exposed, subject visible. Desktop/tablet hero unchanged.
2. Lightbox component and both trigger sites removed sitewide, all
   viewports. Portfolio card images navigate to /portfolio/[slug].
   Service-page gallery images (already on their destination page)
   become non-clickable static figures. No new popup/carousel.
3. Copy corrections applied exactly as specified:
   - Divisions intro → "Flower beds in the spring, snow removal in the
     winter, and outdoor patios in between. You won't need a second
     vendor — we provide prompt service and straight answers."
   - System sentence → "Every property we serve follows the same system:
     we walk it, document it, plan it, and then complete the work."
   - Accountable-partner paragraph → "One company for your landscaping,
     hardscaping, and seasonal property-care needs. We schedule each
     visit, photograph areas of concern, and provide a clear plan of
     action."
   - Evidence paragraph → "We show you the current conditions, completed
     work, and any areas of concern. Each visit is photographed and
     documented, giving you a clear record and plan of action."
   - Year-round: "The year has no empty months." removed; paragraph →
     "We add color in the spring, implement property improvements
     throughout the summer, complete fall cleanups, and manage snow and
     ice throughout the winter."
4. Scope protection: Web3Forms logic, form fields/validation, phone
   number, SEO metadata/structured data, desktop hero, brand, and all
   routes untouched.
5. Regression: all pages at 320/375/390/430/768/1024/1366/1440/1920 —
   zero horizontal overflow, no lightbox triggers, no broken images,
   console clean, sticky CTA not covering content, keyboard/focus intact.
6. Lint (0 errors), type-check clean, unit tests pass, production build
   succeeds.
7. Evidence: screenshots homepage + affected sections at mobile/tablet/
   laptop/desktop; modified-files list; image→destination mapping doc.
