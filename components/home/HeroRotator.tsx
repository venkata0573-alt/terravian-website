"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { business } from "@/content/business";
import { ChevronDownIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";

/**
 * Homepage hero. The headline and CTAs NEVER rotate — only the background
 * visuals do. Rotation: 8s interval (spec minimum 7s), pauses on hover or
 * focus-within, stops entirely under prefers-reduced-motion, and exposes
 * visible previous / next / pause-play controls.
 *
 * Hero photography: client-supplied photos, pre-generated at build time as
 * static AVIF files (640 / 1080 / 1920w) and served via srcset — no runtime
 * image optimizer involved, so the hero never waits on server-side resizing
 * (LCP-critical). Fallback src is the smallest variant.
 */
const HERO_WIDTHS = [640, 1080, 1920] as const;

function heroSrcset(name: string) {
  const widths =
    name === "home-hero-landscaping"
      ? /* v32 Step 8: the landscaping hero was re-rendered from the
           original 3228px client master (Hero1.jpeg) at q74, and a 2560w
           variant added so large desktop displays get real pixels instead
           of an upscaled 1920. Other slides keep the standard ladder. */
        [...HERO_WIDTHS, 2560]
      : [...HERO_WIDTHS];
  return widths
    .map((w) => `/images/placeholders/${name}-${w}.avif ${w}w`)
    .join(", ");
}

const slides = [
  {
    // Original homepage hero photo — do NOT swap when the landscaping
    // division imagery changes; this file set is the frozen homepage hero.
    name: "home-hero-landscaping",
    label: "Commercial landscaping",
    alt: "Commercial office building entrance framed by professionally maintained planting beds, flowering trees, and a manicured green lawn",
  },
  {
    name: "hero-snow",
    label: "Snow & ice management",
    alt: "Snow removal fleet with wheel loader and skid steers fitted with plows clearing a commercial lot after a storm",
  },
  {
    // Asphalt & Pavement slide (client asset Image 1) — inserted before the
    // hardscape slide per the asset brief. Desktop uses the 16:9 srcset;
    // phones get a dedicated 4:5 crop focused on the roller and fresh mat.
    name: "hero-asphalt",
    label: "Asphalt & pavement services",
    alt: "Steamroller compacting fresh asphalt while crew members rake the new mat at a commercial property",
  },
  {
    name: "hero-hardscape",
    label: "Patio & hardscape design-build",
    alt: "Stone fire pit with curved seating wall on a paver patio, surrounded by landscaped beds and accent lighting at dusk",
  },
];

const ROTATE_MS = 8000;

export function HeroRotator() {
  const [index, setIndex] = useState(0);
  // Only the current slide loads immediately; the NEXT slide preloads so the
  // cross-fade is instant, and every other slide mounts its <img> only when
  // it is first visited — never all high-res carousel assets at page load
  // (client performance brief). Visited slides stay mounted to avoid
  // re-downloads; the slide wrapper divs always render for layout/ARIA.
  const [visited, setVisited] = useState<ReadonlySet<number>>(() => new Set([0]));
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setVisited((v) => (v.has(index) ? v : new Set(v).add(index)));
  }, [index]);

  // Next-slide preload waits for a 4s idle window on every viewport, so
  // first paint never pays for slide 2 — still comfortably ahead of the
  // 8s rotation interval (client performance brief: current hero loads
  // immediately, next hero preloads after first render, the rest defer).
  const [preloadNext, setPreloadNext] = useState(false);
  useEffect(() => {
    if (preloadNext) return;
    const t = setTimeout(() => setPreloadNext(true), 4000);
    return () => clearTimeout(t);
  }, [preloadNext]);

  const goTo = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [],
  );

  const rotating = !paused && !hovering && !reducedMotion;

  // Swipe support (mobile): horizontal swipe past threshold moves one slide.
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(dx) < 50) return; // ignore taps / micro-movements
      goTo(dx < 0 ? index + 1 : index - 1);
    },
    [goTo, index],
  );

  useEffect(() => {
    if (!rotating) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [rotating]);

  return (
    <section
      aria-label="Introduction"
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovering(false);
      }}
    >
      {/* Rotating visual track */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Terravian service visuals"
        className="relative h-[78svh] min-h-[600px] w-full overflow-hidden bg-charcoal md:h-[70svh] md:min-h-[480px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => {
          const shouldLoad =
            visited.has(i) || (preloadNext && i === (index + 1) % slides.length);
          return (
            <div
              key={slide.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-slow ease-brand ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Static pre-generated AVIF srcset — the browser picks the size,
                  no server processing. First slide is eager + high priority.
                  Phones get a dedicated art-directed portrait crop
                  (*-mobile.avif) so the subject is never sliced in half by a
                  center-crop of the wide master. Desktop crop anchors the
                  subject slightly below center (focal positioning per slide;
                  the asphalt master is 1672px wide, so its 1920 slot carries
                  the 1600px master — the browser scales gracefully). */}
              {shouldLoad && (
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={`/images/placeholders/${slide.name}-mobile.avif`}
                  />
                  <img
                    src={`/images/placeholders/${slide.name}-1080.avif`}
                    srcSet={heroSrcset(slide.name)}
                    sizes="100vw"
                    alt={slide.alt}
                    width={1920}
                    height={1080}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding={i === 0 ? "sync" : "async"}
                    className={`absolute inset-0 h-full w-full object-cover ${
                      slide.name === "hero-asphalt"
                        ? /* Client direction: preserve as much of the paving
                             composition as the wide hero frame allows — roller,
                             cones, crew, and rakes stay in frame; the anchor
                             rises on very wide screens where the frame is
                             flatter. Mobile uses its own art-directed 4:5 crop
                             (roller + fresh mat + rake entering frame). */
                          "object-[50%_45%] xl:object-[50%_35%]"
                        : ""
                    }`}
                  />
                </picture>
              )}
            </div>
          );
        })}

        {/* The H1 is visually hidden but present for SEO and screen readers.
            NO overlay controls on the photography (client direction, brand
            cleanup): every slide shows clean, bright, identical presentation
            — nothing sits on the hero image. Conversion paths live in the
            header button and the fixed mobile action bar. */}
        <h1 className="sr-only">
          {business.tagline} — commercial landscaping, snow and ice management,
          hardscapes, and asphalt services across Connecticut
        </h1>

        {/* Mobile (below md): clean photography only — no content panel,
            no duplicated CTAs. The fixed bottom action bar (Call Now /
            Request a Proposal, site-wide) carries conversion on phones;
            the portrait crop keeps the subject clear of the header and
            that bar. Only the slide dots remain, floating above the bar
            on a small localized scrim for legibility. */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2.5 pb-3 md:hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          {slides.map((slide, i) => (
            <button
              key={slide.name}
              type="button"
              aria-label={`Show slide ${i + 1} of ${slides.length}: ${slide.label}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className="focus-on-dark relative flex h-8 w-8 items-center justify-center"
            >
              <span
                className={`h-2.5 w-2.5 transition-colors duration-fast ease-brand ${
                  i === index ? "bg-cream" : "bg-cream/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Carousel controls — desktop: counter + prev / pause / next.
          Mobile: minimal dot indicators only (slides change by swipe). */}
      <div className="container-site relative">
        <p aria-live="polite" className="sr-only">
          Slide {index + 1} of {slides.length}: {slides[index].label}
        </p>
        <div className="absolute bottom-5 right-5 hidden items-center gap-2 md:flex md:right-8">
          <span aria-hidden="true" className="mr-1 bg-charcoal/80 px-2 py-1 text-xs font-semibold text-cream">
            {index + 1} / {slides.length}
          </span>
          <CarouselButton
            label="Previous visual"
            onClick={() => goTo(index - 1)}
          >
            <ChevronDownIcon size={18} className="rotate-90" />
          </CarouselButton>
          <CarouselButton
            label={paused ? "Play automatic rotation" : "Pause automatic rotation"}
            pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            {paused ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
          </CarouselButton>
          <CarouselButton label="Next visual" onClick={() => goTo(index + 1)}>
            <ChevronDownIcon size={18} className="-rotate-90" />
          </CarouselButton>
        </div>
        {/* Mobile dots live inside the bottom panel column above. */}
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="focus-on-dark flex h-11 w-11 items-center justify-center bg-cream text-charcoal transition-colors duration-fast ease-brand hover:bg-tint"
    >
      {children}
    </button>
  );
}
