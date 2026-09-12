/**
 * Hand-rolled validation + sanitization shared by client forms and the
 * server route handlers (no form libraries, per approved-dependency list).
 */

export interface FieldRule {
  required?: boolean;
  maxLength: number;
  pattern?: RegExp;
  /** Human field name used in error messages. */
  label: string;
}

export type FormValues = Record<string, string>;
export type FormErrors = Record<string, string>;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_PATTERN = /^[+()\-.\s\d]{7,20}$/;

/** Strip control chars and trim; never transforms beyond safe normalization. */
export function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  // Collapse line breaks to spaces, then strip remaining C0 control characters.
  const cleaned = value
    .replace(/[\t\n\r]+/g, " ")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return cleaned.trim().slice(0, maxLength);
}

export function validateFields(
  values: FormValues,
  rules: Record<string, FieldRule>,
): FormErrors {
  const errors: FormErrors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const raw = values[field] ?? "";
    const v = raw.trim();
    if (rule.required && v.length === 0) {
      errors[field] = `${rule.label} is required.`;
      continue;
    }
    if (v.length > 0 && v.length > rule.maxLength) {
      errors[field] = `${rule.label} must be ${rule.maxLength} characters or fewer.`;
      continue;
    }
    if (v.length > 0 && rule.pattern && !rule.pattern.test(v)) {
      errors[field] = `${rule.label} doesn't look valid. Please check and try again.`;
    }
  }
  return errors;
}

/* ---------- Contact form contract ---------- */

export const contactRules: Record<string, FieldRule> = {
  name: { required: true, maxLength: 120, label: "Name" },
  company: { required: true, maxLength: 160, label: "Company" },
  email: { required: true, maxLength: 200, label: "Email", pattern: EMAIL_PATTERN },
  phone: { required: false, maxLength: 24, label: "Phone", pattern: PHONE_PATTERN },
  propertyAddress: { required: false, maxLength: 240, label: "Property address" },
  propertyType: { required: true, maxLength: 60, label: "Property type" },
  message: { required: true, maxLength: 2000, label: "Message" },
};

/* ---------- Proposal form contract ---------- */

export const proposalRules: Record<string, FieldRule> = {
  name: { required: true, maxLength: 120, label: "Name" },
  company: { required: true, maxLength: 160, label: "Company" },
  role: { required: false, maxLength: 120, label: "Role" },
  email: { required: true, maxLength: 200, label: "Email", pattern: EMAIL_PATTERN },
  phone: { required: true, maxLength: 24, label: "Phone", pattern: PHONE_PATTERN },
  propertyAddress: { required: true, maxLength: 240, label: "Property address" },
  propertyType: { required: true, maxLength: 60, label: "Property type" },
  propertySize: { required: false, maxLength: 80, label: "Approximate size" },
  services: { required: false, maxLength: 400, label: "Services needed" },
  situation: { required: true, maxLength: 2500, label: "Current situation" },
  preferredContact: { required: true, maxLength: 20, label: "Preferred contact method" },
  walkthrough: { required: false, maxLength: 120, label: "Walkthrough preference" },
};

/**
 * Spam-prevention helpers:
 * - honeypot: a field humans never fill; any content = reject.
 * - timestamp: submissions faster than `minMs` after render = reject.
 */
export const HONEYPOT_FIELD = "website"; // attractive to bots, hidden from humans
export const TIMESTAMP_FIELD = "formStartedAt";
export const MIN_FILL_TIME_MS = 3000;

export function isSpam(values: FormValues): boolean {
  if ((values[HONEYPOT_FIELD] ?? "").trim().length > 0) return true;
  const started = Number(values[TIMESTAMP_FIELD] ?? 0);
  if (!Number.isFinite(started) || started <= 0) return true;
  return Date.now() - started < MIN_FILL_TIME_MS;
}
