"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MOTION } from "@/lib/motion";
import { ChevronDownIcon } from "@/components/ui/icons";

/**
 * Ten-step "How We Work" timeline.
 * Desktop: steps reveal progressively on scroll (restrained opacity/rise);
 * clicking or focusing a step shows its explanation; the selected step has
 * a visible + programmatic active state (aria-current="step").
 * Mobile: vertical accordion, one step expanded at a time, button-driven.
 * All ten steps and their explanations are present in the DOM regardless of
 * animation state — the process is fully understandable with JS/animation off.
 */
const steps = [
  { n: 1, title: "Walkthrough", text: "We walk the property with you and document what we see — conditions, priorities, and problem areas." },
  { n: 2, title: "Assessment", text: "Conditions are evaluated against your property's use: traffic, drainage, turf health, winter exposure." },
  { n: 3, title: "Recommendations", text: "You get a clear set of recommended actions, separated into what is needed now and what can be planned." },
  { n: 4, title: "Proposal", text: "A written scope with defined services, schedule, and documentation standards — no vague line items." },
  { n: 5, title: "Scheduling", text: "Work is placed on a route calendar you can see, so you always know when crews are expected." },
  { n: 6, title: "Execution", text: "Crews arrive as scheduled and work to the agreed scope, with site discipline expected on a commercial property." },
  { n: 7, title: "Photo Documentation", text: "Conditions and completed work are photographed and attached to your service record." },
  { n: 8, title: "Quality Inspection", text: "Completed work is checked against the scope before it is considered done." },
  { n: 9, title: "Client Communication", text: "You receive updates and documentation without having to ask — before, during, and after service." },
  { n: 10, title: "Ongoing Maintenance", text: "The property moves into a maintained cycle: monitored, documented, and adjusted season by season." },
];

export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Desktop: selectable step rail + explanation panel */}
      <div className="hidden gap-10 md:grid md:grid-cols-[1fr_1.2fr]">
        <ol className="space-y-1" aria-label="Process steps">
          {steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: MOTION.revealDistance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: MOTION.base, ease: MOTION.easing }}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={active === i ? "step" : undefined}
                className={`flex w-full items-center gap-4 border-l-4 px-4 py-3 text-left transition-colors duration-fast ease-brand ${
                  active === i
                    ? "border-forest bg-white font-semibold text-forest"
                    : "border-transparent text-charcoal hover:bg-white/70"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold ${
                    active === i ? "bg-forest text-cream" : "bg-tint text-forest"
                  }`}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                {step.title}
              </button>
            </motion.li>
          ))}
        </ol>

        <div className="border border-charcoal/10 bg-white p-8" aria-live="polite">
          <p className="eyebrow">Step {steps[active].n} of 10</p>
          <h3 className="mt-2 text-2xl">{steps[active].title}</h3>
          <p className="mt-4 text-[1.0625rem] leading-[1.65] text-charcoal/90">
            {steps[active].text}
          </p>
        </div>
      </div>

      {/* Mobile: vertical accordion, one open at a time */}
      <ol className="space-y-2 md:hidden" aria-label="Process steps">
        {steps.map((step, i) => {
          const open = active === i;
          return (
            <li key={step.n} className="border border-charcoal/10 bg-white">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`step-panel-${step.n}`}
                onClick={() => setActive(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-semibold text-charcoal"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 items-center justify-center bg-tint text-sm font-bold text-forest"
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>
                  {step.title}
                </span>
                <ChevronDownIcon
                  size={18}
                  className={`shrink-0 transition-transform duration-fast ${open ? "rotate-180" : ""}`}
                />
              </button>
              <div id={`step-panel-${step.n}`} hidden={!open}>
                <p className="px-4 pb-4 leading-relaxed text-charcoal/90">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {compact ? null : null}
    </div>
  );
}
