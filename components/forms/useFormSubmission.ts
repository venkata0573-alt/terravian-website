"use client";

import { useRef, useState } from "react";
import {
  HONEYPOT_FIELD,
  TIMESTAMP_FIELD,
  MIN_FILL_TIME_MS,
  sanitize,
  validateFields,
  type FieldRule,
  type FormErrors,
  type FormValues,
} from "@/lib/validation";
import {
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_TIMEOUT_MS,
  buildLeadSubmission,
  isWeb3FormsAccepted,
  type LeadKind,
  type LeadSubmission,
} from "@/lib/leadDelivery";
import { PROPERTY_TYPE_LABELS } from "@/types/project";
import type { PropertyType } from "@/types/project";
import { services } from "@/content/services";

/** Shown when Web3Forms does not accept the submission (non-2xx, network
 * failure, timeout, or success:false). Entries are kept so the visitor
 * can retry without retyping. */
const RETRY_MESSAGE =
  "We couldn't send your request — nothing has been submitted. Your entries are kept below; please check your connection and try again. If it still doesn't go through, call us at 475-347-4090 or email info@terravianlandscaping.com.";

/** Shown when the local spam guards reject a submission (honeypot filled
 * or inhumanly fast). No network request is made in this case. */
const SPAM_MESSAGE =
  "The submission couldn't be accepted. Please try again.";

const SUCCESS_MESSAGES: Record<LeadKind, string> = {
  contact:
    "Thank you — your message is on its way to our office. We respond within one business day. For anything urgent, call 475-347-4090.",
  proposal:
    "Thank you — your proposal request is on its way to our office. We respond within one business day. For anything urgent, call 475-347-4090.",
};

/** Maps internal slugs to the human-readable labels the office inbox
 * expects (property type + services). */
function toDisplayValues(values: FormValues): FormValues {
  const display = { ...values };
  if (display.propertyType && display.propertyType in PROPERTY_TYPE_LABELS) {
    display.propertyType =
      PROPERTY_TYPE_LABELS[display.propertyType as PropertyType];
  }
  if (display.services) {
    display.services = display.services
      .split(",")
      .filter(Boolean)
      .map((slug) => services.find((s) => s.slug === slug)?.name ?? slug)
      .join(", ");
  }
  return display;
}

/** Delivers the validated payload straight to Web3Forms from the browser
 * (FormData — the documented React integration; a simple request with no
 * CORS preflight). Resolves true ONLY when Web3Forms accepted the
 * submission; timeouts abort into an error. */
async function deliverViaWeb3Forms(
  submission: LeadSubmission,
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEB3FORMS_TIMEOUT_MS);
  try {
    const form = new FormData();
    form.append("access_key", submission.accessKey);
    form.append("subject", submission.subject);
    form.append("from_name", submission.fromName);
    // The customer's address becomes reply-to, so the office answers the
    // lead directly from the inbox.
    form.append("replyto", submission.replyTo);
    form.append("name", submission.name);
    for (const [label, value] of Object.entries(submission.fields)) {
      form.append(label, value);
    }
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
    const body: unknown = await res.json().catch(() => null);
    return isWeb3FormsAccepted(res.ok, body);
  } catch {
    // Network failure or timeout abort — treated as a failed send.
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Shared form submission behavior for Contact and Proposal forms:
 * - client-side validation; invalid or empty forms make ZERO network
 *   requests
 * - honeypot + minimum-fill-time spam guards, enforced locally BEFORE any
 *   request — spam submissions never reach Web3Forms
 * - delivery goes directly from the browser to api.web3forms.com with a
 *   per-request timeout; there is no server route and no fallback relay
 * - the success message shows only when Web3Forms returns HTTP success
 *   AND success:true; on any failure the entered data is preserved and a
 *   retry message is shown
 * - loading state ("Sending…" + disabled + aria-busy) blocks duplicate
 *   clicks; focus moves to the error summary on failed validation
 */
export type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function useFormSubmission(kind: LeadKind, rules: Record<string, FieldRule>) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number>(Date.now());

  const setValue = (field: string, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear the field's error as the user corrects it
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Duplicate-click prevention: a submission already in flight ignores
    // further submits (the button is also disabled while submitting).
    if (state.status === "submitting") return;

    const fieldErrors = validateFields(values, rules);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setState({ status: "idle" });
      // Focus the error summary so screen-reader users hear the problem
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    // Spam guards run locally — a honeypot hit or an inhumanly fast
    // submission is rejected here and never makes a network request.
    const honeypotFilled =
      (values[HONEYPOT_FIELD] ?? "").trim().length > 0;
    const tooFast =
      Date.now() - startedAtRef.current < MIN_FILL_TIME_MS;
    if (honeypotFilled || tooFast) {
      setState({ status: "error", message: SPAM_MESSAGE });
      return;
    }

    setState({ status: "submitting" });

    const payload: FormValues = { ...values };
    for (const [field, rule] of Object.entries(rules)) {
      payload[field] = sanitize(payload[field] ?? "", rule.maxLength);
    }

    const submission = buildLeadSubmission(kind, toDisplayValues(payload), rules);
    const delivered = await deliverViaWeb3Forms(submission);

    if (delivered) {
      setState({ status: "success", message: SUCCESS_MESSAGES[kind] });
      setValues({});
      setErrors({});
      startedAtRef.current = Date.now();
    } else {
      // Failed send — keep every entry so the visitor can retry.
      setState({ status: "error", message: RETRY_MESSAGE });
    }
  };

  return { values, setValue, errors, state, submit, summaryRef };
}
