"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The five-stage service loop — the page's centerpiece.
 * Editorial numbered rows, not cards: a ghost serif numeral, one sentence of
 * substance, and the concrete thing the client RECEIVES at that stage (the
 * persuasion lives in that third column). A hairline rail runs down the
 * rows and fills forest-green as you scroll — progression you feel before
 * you read. The loop closes with a return line: it starts again on its own.
 *
 * Reduced-motion users get a static, fully filled rail (useReducedMotion).
 */
const stages = [
  {
    n: "01",
    name: "Assess",
    line: "We walk the property with you and write down what we see.",
    receive: "Condition notes & priorities",
  },
  {
    n: "02",
    name: "Plan",
    line: "Clear recommendations and a written scope — no vague line items.",
    receive: "A written proposal",
  },
  {
    n: "03",
    name: "Schedule",
    line: "Crews and service windows are confirmed before work begins.",
    receive: "A service calendar",
  },
  {
    n: "04",
    name: "Execute",
    line: "Crews arrive when promised and work to the agreed scope.",
    receive: "The work, on schedule",
  },
  {
    n: "05",
    name: "Document & verify",
    line: "Completed work is photographed, inspected, and reported to you.",
    receive: "Photos & a service record",
  },
];

export function ServiceLoop() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.55"],
  });

  return (
    <section aria-labelledby="loop-heading" className="py-16 md:py-24">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Sticky intro column — the frame stays while the loop scrolls. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">The method</p>
              <h2
                id="loop-heading"
                className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]"
              >
                Five stages.{" "}
                <em className="font-display italic text-forest">One loop.</em>
              </h2>
              <p className="mt-4 max-w-sm text-[1.0625rem] leading-[1.6] text-charcoal/80">
                The same loop runs on your property all year — so you always
                know what happens next, and what you&apos;ll have in your
                hands when it&apos;s done.
              </p>
              <p className="mt-6 hidden border-l-2 border-forest pl-4 font-display text-lg italic leading-snug text-charcoal/70 lg:block">
                Every stage ends with something in your hands.
              </p>
              {/* The branded crew truck — the loop made visible: the same
                  truck, the same crew, on the same property, all year. */}
              <figure className="mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/how-we-work/crew-truck-trailer-800.avif"
                  srcSet="/images/how-we-work/crew-truck-trailer-800.avif 800w, /images/how-we-work/crew-truck-trailer-1200.avif 1200w"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  alt="A Terravian Landscaping crew truck with its equipment trailer, parked on a tree-lined street"
                  width={1448}
                  height={1086}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="mt-2 text-sm text-charcoal/60">
                  The same crew, on the same route — in every season.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* The loop itself */}
          <div className="lg:col-span-8">
            <div ref={listRef} className="relative">
              {/* Rail + scroll-driven fill */}
              <div
                aria-hidden="true"
                className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-charcoal/15"
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-3 left-[7px] top-3 w-0.5 origin-top bg-forest"
                style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
              />

              <ol aria-label="The five stages of Terravian service">
                {stages.map((stage, i) => (
                  <li key={stage.n} className="relative py-7 pl-10 first:pt-0 md:pl-14 md:py-8">
                    {/* Node on the rail — sharp square, per brand */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-8 h-4 w-4 bg-forest md:top-9"
                    />
                    <Reveal delay={Math.min(i * 0.05, 0.2)}>
                      <div className="grid gap-x-8 gap-y-2 md:grid-cols-[auto,1fr] md:items-start">
                        <span
                          aria-hidden="true"
                          className="font-display text-4xl leading-none text-charcoal/20 md:text-5xl"
                        >
                          {stage.n}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-charcoal md:text-2xl">
                            {stage.name}
                          </h3>
                          <p className="mt-1.5 max-w-md leading-[1.55] text-charcoal/75">
                            {stage.line}
                          </p>
                          <p className="mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-sm">
                            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-earth">
                              You receive
                            </span>
                            <span className="font-semibold text-charcoal">
                              {stage.receive}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}

                {/* Loop closure — the memorable beat */}
                <li aria-label="The loop repeats" className="relative pb-1 pl-10 pt-7 md:pl-14 md:pt-8">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-8 flex h-4 w-4 items-center justify-center bg-forest font-bold text-cream"
                  />
                  <Reveal>
                    <p className="font-display text-xl italic leading-snug text-forest md:text-2xl">
                      ↺ Then it runs again — before you have to ask.
                    </p>
                  </Reveal>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
