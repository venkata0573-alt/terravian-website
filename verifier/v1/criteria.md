# Verifier v1 — Responsive/layout + forms acceptance criteria
Created: 2026-08-23. Measures production build served by standalone runner.

## Layout (Playwright, viewports 390x700 / 768x900 / 1024x800 / 1440x900 / 1920x1000 / 2560x1200)
Pages: / /services /services/commercial-landscaping /services/hardscape-design
/services/snow-ice-management /industries /portfolio /how-we-work /about /contact /request-a-proposal
1. No horizontal overflow: document.documentElement.scrollWidth <= clientWidth + 1 on every page x viewport.
2. No broken images (img.complete && naturalWidth === 0) on any page.
3. Header: logo flush left of header container; nav+CTA group flush right (gap between CTA right edge and container right edge <= 40px) at every desktop width; hamburger-only at < 1024.
4. Section alignment: FieldMarquee heading left edge == DivisionCards section heading left edge (+-2px) at 1440 and 1920.
5. Division cards bigger than before: at 1920w each card >= 420px wide and >= 500px tall (was 392x260).
6. Content scales: main content container width > 1300px at 1920 viewport (was capped 1280), and <= 1440+padding.

## Forms
7. /api/address-suggest returns >= 3 labeled US suggestions for "21 Dudl"; CT bias present.
8. AddressField: typing shows dropdown; ArrowDown+Enter selects and fills input.
9. Proposal submit (test email venkata0573@gmail.com, phone 6073120573) reaches delivery layer; with local sink: payload contains mapped labels; with FormSubmit: honest failure OR activation email triggered (owner must click once).

## Brand integrity
10. No "Hilton"/"DoubleTree" as visible text; no "placeholder" word visible; coming-soon tiles intact.
