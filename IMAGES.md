# Terravian Website — Image Swap Guide

**How to preview new photos before committing anything to git.**

## The workflow

1. Drop your photo into the folder listed below, using the **exact filename** shown (the site references files by name — a file named `IMG_4021.jpg` won't appear anywhere).
2. If the dev server is running (`npm run dev`), just **refresh the browser** — no rebuild, no code changes, nothing else to touch.
3. Look at the page. Good? Keep the file. Not right? Replace the file and refresh again.
4. When everything looks final: `git add -A && git commit -m "Real photography"` — that's the lock.

If you run the production build instead (`npm run build && npm start`), clear the image cache after replacing files: `rm -rf .next/cache` — otherwise you may see the old optimized version.

## Image slots (in priority order)

| File to replace | Where it shows | Best shape |
|---|---|---|
| `hero-landscaping-placeholder.webp` | Homepage hero, slide 1 | Wide, 2400px+ |
| `hero-snow-placeholder.webp` | Homepage hero, slide 2 | Wide, 2400px+ |
| `hero-hardscape-placeholder.webp` | Homepage hero, slide 3 | Wide, 2400px+ |
| `portfolio-before-placeholder.webp` | Before/after slider + galleries | 4:3, 1600px+ |
| `portfolio-progress-placeholder.webp` | Portfolio + service galleries | 4:3, 1600px+ |
| `portfolio-after-placeholder.webp` | Before/after slider + galleries | 4:3, 1600px+ |
| `og-share-placeholder.webp` | Social/messaging link previews | Exactly 1200×630 |
| `testimonial-portrait-placeholder.webp` | Testimonial cards | Square-ish, 600px+ |
| `property-logo-placeholder.svg` | Client logo tiles | (logos from clients, with written permission) |

All live in: `public/images/placeholders/`
Brand assets (do not touch): `public/images/brand/`

## Notes

- **Any format works** — you can drop `hero-landscaping-placeholder.jpg` or `.png` alongside, then tell me and I'll point the code at it. If you keep the `.webp` name, convert first or ask me to.
- **Send originals.** I handle resizing, compression, and brand color balance — upload uncompressed files and I'll optimize to the performance budget (hero < 500 KB, others < 250 KB).
- **Alt text & captions** live in `components/home/HeroRotator.tsx`, `content/projects.ts`, and `content/serviceDetails.ts` — after a swap, tell me what each photo actually shows and I'll write accurate alt text (accessibility requirement) and real captions.
- **Portfolio projects** are more than images: each real project needs location (general area only), property type, scope, and timeline for the case-study template in `content/projects.ts`.
