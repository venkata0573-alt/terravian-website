import type { FieldRule, FormValues } from "@/lib/validation";

/**
 * Lead delivery — Web3Forms, browser-side only.
 *
 * Web3Forms rejects server-side calls on the free plan ("Use our API in
 * client side"), so every form posts directly from the visitor's browser
 * to WEB3FORMS_ENDPOINT. There is deliberately NO server-side transport
 * and NO fallback relay of any kind (no webhook, Resend, MailerSend,
 * Formspree, FormSubmit, or Brevo): if Web3Forms does not accept a
 * submission, the form shows an error and keeps the visitor's entries so
 * they can retry — a failed send never appears successful.
 *
 * The access key is the public client key (Web3Forms keys are designed to
 * ship in browser code). Delivery goes to the inbox bound to the key in
 * the Web3Forms dashboard. The customer's email is sent as `replyto`, so
 * the office answers the lead directly from the inbox.
 */

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Public Web3Forms access key (client-supplied). */
export const WEB3FORMS_ACCESS_KEY = "9647ddb3-970c-4700-baf8-3319e6c0dff8";

/** Per-request timeout — a hung request must resolve to an error state,
 * never leave the form spinning. */
export const WEB3FORMS_TIMEOUT_MS = 15_000;

const SENDER_NAME = "Terravian Website";

export type LeadKind = "contact" | "proposal";

/** Everything the browser posts to Web3Forms for one validated lead. */
export type LeadSubmission = {
  accessKey: string;
  fields: Record<string, string>;
  /** Form-specific subject line for the office inbox. */
  subject: string;
  fromName: string;
  /** The customer's email — Web3Forms sets it as the reply-to address. */
  replyTo: string;
  name: string;
};

/**
 * Builds the Web3Forms payload for one validated lead. `display` holds
 * the form values with human-readable labels (slugs already mapped to
 * names); `rules` give the office email its labeled rows in the form's
 * declared order. Empty optional fields are included as "—" so the office
 * sees the full shape of every request.
 */
export function buildLeadSubmission(
  kind: LeadKind,
  display: FormValues,
  rules: Record<string, FieldRule>,
): LeadSubmission {
  const name = display.name ?? "";
  const company = display.company ?? "";

  const source =
    kind === "proposal" ? "Request a Proposal form" : "Contact form";
  const subject =
    kind === "proposal"
      ? `Proposal request — ${company || name}`
      : `Website message — ${name}`;

  const fields = Object.fromEntries(
    Object.entries(rules).map(([field, rule]) => [
      rule.label,
      display[field]?.trim() ? display[field] : "—",
    ]),
  );

  return {
    accessKey: WEB3FORMS_ACCESS_KEY,
    fields,
    subject,
    fromName: `${SENDER_NAME} — ${source}`,
    replyTo: display.email ?? "",
    name,
  };
}

/**
 * The single acceptance rule for a Web3Forms response — success is shown
 * ONLY when the HTTP response is successful AND the returned JSON
 * contains success: true. Non-2xx statuses, missing/malformed JSON, and
 * success: false are all failures.
 */
export function isWeb3FormsAccepted(
  httpOk: boolean,
  body: unknown,
): boolean {
  if (!httpOk) return false;
  if (typeof body !== "object" || body === null) return false;
  return (body as { success?: unknown }).success === true;
}
