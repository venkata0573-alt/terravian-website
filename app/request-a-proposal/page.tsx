import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/metadata";
import { ProposalForm } from "@/components/forms/ProposalForm";

export const metadata: Metadata = pageMetadata({
  path: "/request-a-proposal",
  title: "Request a Proposal",
  description:
    "Request a proposal for commercial landscaping, grounds maintenance, snow & ice management, hardscape, or asphalt & pavement work. We walk your property, assess it, and put a documented plan in front of you.",
});

export default function RequestProposalPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow">Request a proposal</p>
          <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest">
            Get a documented plan for your property
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-[1.65] text-charcoal/90">
            Here is what happens after you submit:
          </p>
          <ol className="mt-6 space-y-4">
            {[
              ["Walkthrough", "We schedule a property walkthrough with you."],
              ["Assessment", "Conditions, priorities, and problem areas are documented."],
              ["Proposal", "You receive a written scope with defined services and documentation standards."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center bg-forest text-sm font-bold text-cream"
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="text-charcoal/85">{text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="border border-charcoal/10 bg-white p-6 md:p-10">
          {/* Suspense required: ProposalForm reads query params for
              service/walkthrough preselection */}
          <Suspense fallback={<p className="text-charcoal/70">Loading form…</p>}>
            <ProposalForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
