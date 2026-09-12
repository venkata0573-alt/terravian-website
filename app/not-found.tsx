import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { business } from "@/content/business";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-site max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest">
          This page isn&apos;t on our route
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-[1.65] text-charcoal/90">
          The page you were looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us — {business.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
