"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PROPERTY_TYPE_LABELS } from "@/types/project";
import { services } from "@/content/services";
import { proposalRules } from "@/lib/validation";
import { useFormSubmission } from "./useFormSubmission";
import { CheckboxGroup, SelectField, TextAreaField, TextField } from "./FormField";
import { AddressField } from "./AddressField";
import { Button } from "@/components/ui/Button";

/**
 * Proposal request form — validated client-side, then delivered directly
 * from the browser to Web3Forms (no server route, no fallback relay).
 * Supports ?service=<slug> preselection from service pages and
 * ?walkthrough=yes from the "Schedule a Property Walkthrough" CTA.
 */
export function ProposalForm() {
  const { values, setValue, errors, state, submit, summaryRef } =
    useFormSubmission("proposal", proposalRules);
  const params = useSearchParams();

  // Preselect from query params (service page CTAs / walkthrough CTA)
  useEffect(() => {
    const service = params.get("service");
    if (service && services.some((s) => s.slug === service)) {
      setValue("services", service);
    }
    if (params.get("walkthrough") === "yes") {
      setValue("walkthrough", "I'd like to schedule a property walkthrough");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const selectedServices = (values.services ?? "").split(",").filter(Boolean);
  const toggleService = (slug: string) => {
    const next = selectedServices.includes(slug)
      ? selectedServices.filter((s) => s !== slug)
      : [...selectedServices, slug];
    setValue("services", next.join(","));
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={Object.keys(errors).length > 0 ? "alert" : undefined}
        className={Object.keys(errors).length > 0 ? "border-l-4 border-earth bg-white p-4" : ""}
      >
        {Object.keys(errors).length > 0 ? (
          <>
            <p className="font-bold text-charcoal">
              Please correct {Object.keys(errors).length}{" "}
              {Object.keys(errors).length === 1 ? "field" : "fields"} below.
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-charcoal/90">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <fieldset>
        <legend className="font-display text-xl font-semibold">About you</legend>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <TextField label="Name" name="name" required autoComplete="name" maxLength={120}
            value={values.name ?? ""} onChange={(v) => setValue("name", v)} error={errors.name} />
          <TextField label="Company" name="company" required autoComplete="organization" maxLength={160}
            value={values.company ?? ""} onChange={(v) => setValue("company", v)} error={errors.company} />
          <TextField label="Your role (optional)" name="role" autoComplete="organization-title" maxLength={120}
            value={values.role ?? ""} onChange={(v) => setValue("role", v)} error={errors.role} />
          <TextField label="Email" name="email" type="email" required autoComplete="email" maxLength={200}
            value={values.email ?? ""} onChange={(v) => setValue("email", v)} error={errors.email} />
          <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" maxLength={24}
            value={values.phone ?? ""} onChange={(v) => setValue("phone", v)} error={errors.phone} />
          <SelectField label="Preferred contact method" name="preferredContact" required
            value={values.preferredContact ?? ""} onChange={(v) => setValue("preferredContact", v)}
            error={errors.preferredContact}
            options={[
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone call" },
              { value: "text", label: "Text message" },
            ]} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-xl font-semibold">About the property</legend>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <AddressField label="Property name / address" name="propertyAddress" required maxLength={240}
            hint="Start typing the street address and pick it from the list."
            value={values.propertyAddress ?? ""} onChange={(v) => setValue("propertyAddress", v)}
            error={errors.propertyAddress} />
          <SelectField label="Property type" name="propertyType" required
            value={values.propertyType ?? ""} onChange={(v) => setValue("propertyType", v)}
            error={errors.propertyType}
            options={Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => ({ value, label }))} />
          <TextField label="Approximate size (optional)" name="propertySize" maxLength={80}
            value={values.propertySize ?? ""} onChange={(v) => setValue("propertySize", v)}
            error={errors.propertySize} />
        </div>
        <div className="mt-6">
          <CheckboxGroup
            legend="Services you're considering"
            options={services.map((s) => ({ value: s.slug, label: s.name }))}
            selected={selectedServices}
            onToggle={toggleService}
          />
        </div>
        <div className="mt-6">
          <TextAreaField label="Current situation" name="situation" required maxLength={2500}
            hint="What is happening with the property today, and what would a good outcome look like?"
            value={values.situation ?? ""} onChange={(v) => setValue("situation", v)}
            error={errors.situation} />
        </div>
        <div className="mt-6">
          <TextField label="Walkthrough scheduling preference (optional)" name="walkthrough" maxLength={120}
            value={values.walkthrough ?? ""} onChange={(v) => setValue("walkthrough", v)}
            error={errors.walkthrough} />
        </div>
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label htmlFor="proposal-website">Website</label>
        <input id="proposal-website" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={values.website ?? ""} onChange={(e) => setValue("website", e.target.value)} />
      </div>

      {state.status === "success" ? (
        <p role="status" className="border-l-4 border-forest bg-tint p-4 font-semibold text-charcoal">
          {state.message}
        </p>
      ) : null}
      {state.status === "error" ? (
        <p role="alert" className="border-l-4 border-earth bg-white p-4 font-semibold text-charcoal">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={state.status === "submitting"} aria-busy={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending…" : "Request a proposal"}
      </Button>

      <p className="text-sm text-charcoal/70">
        Your request goes straight to our office inbox — we respond within
        one business day. Prefer to talk? Call 475-347-4090.
      </p>
    </form>
  );
}
