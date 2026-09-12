# v5 criteria — client brand logo rail

Date: 2026-08-24

Scope: replace the property-type photography rail in "Trusted on commercial
properties" with the client-supplied brand logos (14 marks, provided as
files by the client on 2026-08-24).

## Criteria

1. All 14 client-supplied logos render in the rail: Hampton by Hilton,
   DoubleTree by Hilton, Walmart, Homewood Suites by Hilton, Courtyard by
   Marriott, Best Western, Residence Inn by Marriott, Comfort Inn & Suites,
   Amazon, Hilton Garden Inn, Days Inn by Wyndham, Spark by Hilton, Motel 6,
   Fairfield by Marriott.
2. Logos are autocropped to content, exported as WebP, served locally from
   /images/brands/ — no hotlinked third-party assets.
3. Presentation: uniform-height white tiles, hairline charcoal/10 borders,
   sharp corners, optically tiered logo sizes (wide / mid / plate), full-bleed
   edge-to-edge band, same drift motion as the field rail (hover-pause,
   reduced-motion fallback inherited).
4. No fabricated content: no stats, no testimonials, no invented claims.
   Disclaimer line: "All brand marks are the property of their respective
   owners."
5. Section copy updated to reflect real client brands (no longer says logos
   are withheld pending permission).
6. Zero horizontal overflow and zero broken images on the homepage at
   1920 / 1440 / 390 viewports; all 28 rail imgs complete with
   naturalWidth > 0.
7. No unrelated sections modified; no commit/push of feature work.

## Notes

- Logo files supplied directly by the client (upload). Client asserts active
  service relationships; onus of brand-permission documentation sits with
  the client. Trademark disclaimer rendered under the rail.
- next/image in the rail uses loading="eager" — lazy loading left offscreen
  marquee tiles unpainted.
