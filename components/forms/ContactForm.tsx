"use client";

import { PROPERTY_TYPE_LABELS } from "@/types/project";
import { contactRules } from "@/lib/validation";
import { useFormSubmission } from "./useFormSubmission";
import { SelectField, TextAreaField, TextField } from "./FormField";
import { AddressField } from "./AddressField";
import { Button } from "@/components/ui/Button";

/**
 * Contact form — validated client-side, then delivered directly from the
 * browser to Web3Forms (no server route, no fallback relay).
 * Until an approved email/CRM integration is connected, the server responds
 * in DEVELOPMENT MODE (clearly identified as a test submission — no false
 * success claims, per spec).
 */
export function ContactForm() {
  const { values, setValue, errors, state, submit, summaryRef } =
    useFormSubmission("contact", contactRules);

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {/* Error summary — focus lands here on failed validation */}
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

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" maxLength={120}
          value={values.name ?? ""} onChange={(v) => setValue("name", v)} error={errors.name} />
        <TextField label="Company" name="company" required autoComplete="organization" maxLength={160}
          value={values.company ?? ""} onChange={(v) => setValue("company", v)} error={errors.company} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" required autoComplete="email" maxLength={200}
          value={values.email ?? ""} onChange={(v) => setValue("email", v)} error={errors.email} />
        <TextField label="Phone (optional)" name="phone" type="tel" autoComplete="tel" maxLength={24}
          value={values.phone ?? ""} onChange={(v) => setValue("phone", v)} error={errors.phone} />
      </div>
      <AddressField label="Property address (optional)" name="propertyAddress" maxLength={240}
        hint="Start typing the street address and pick it from the list."
        value={values.propertyAddress ?? ""} onChange={(v) => setValue("propertyAddress", v)}
        error={errors.propertyAddress} />
      <SelectField label="Property type" name="propertyType" required
        value={values.propertyType ?? ""} onChange={(v) => setValue("propertyType", v)}
        error={errors.propertyType}
        options={Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => ({ value, label }))} />
      <TextAreaField label="Message" name="message" required maxLength={2000}
        hint="Tell us about your property and what you need."
        value={values.message ?? ""} onChange={(v) => setValue("message", v)} error={errors.message} />

      {/* Honeypot: hidden from humans, attractive to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off"
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
        {state.status === "submitting" ? "Sending…" : "Send message"}
      </Button>

      <p className="text-sm text-charcoal/70">
        Your message goes straight to our office inbox — we respond within
        one business day. Prefer to talk? Call 475-347-4090.
      </p>
    </form>
  );
}
