/**
 * Unit tests for lib/validation.ts — the contract every form enforces
 * client-side before any network request is allowed.
 * Run: npm run test:unit
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  sanitize,
  validateFields,
  isSpam,
  contactRules,
  proposalRules,
  HONEYPOT_FIELD,
  TIMESTAMP_FIELD,
  MIN_FILL_TIME_MS,
} = require("../.unit-build/validation.js");

test("sanitize trims, collapses line breaks, strips control chars, caps length", () => {
  assert.equal(sanitize("  hello  ", 100), "hello");
  assert.equal(sanitize("line1\nline2\r\nline3", 100), "line1 line2 line3");
  assert.equal(sanitize("ab", 100), "ab");
  assert.equal(sanitize("abcdef", 3), "abc");
  assert.equal(sanitize(undefined, 10), "");
  assert.equal(sanitize(42, 10), "");
});

test("validateFields: empty required fields produce errors (empty form is invalid)", () => {
  const errors = validateFields({}, contactRules);
  for (const [field, rule] of Object.entries(contactRules)) {
    if (rule.required) assert.ok(errors[field], `expected error for ${field}`);
  }
  // Optional fields stay silent on an empty form
  assert.equal(errors.phone, undefined);
  assert.equal(errors.propertyAddress, undefined);
});

test("validateFields: invalid email and phone are rejected", () => {
  const errors = validateFields(
    { name: "A", company: "B", email: "not-an-email", phone: "abc", propertyType: "retail-commercial", message: "hi" },
    contactRules,
  );
  assert.match(errors.email, /doesn't look valid/);
  assert.match(errors.phone, /doesn't look valid/);
});

test("validateFields: a complete valid contact form passes", () => {
  const errors = validateFields(
    {
      name: "Jane Doe",
      company: "Acme Properties",
      email: "jane@example.com",
      phone: "203-555-0147",
      propertyAddress: "1 Main St",
      propertyType: "retail-commercial",
      message: "Please quote spring cleanup.",
    },
    contactRules,
  );
  assert.deepEqual(errors, {});
});

test("validateFields: proposal rules require phone and property address", () => {
  const errors = validateFields(
    { name: "A", company: "B", email: "a@b.com", propertyType: "hoa-condominium", situation: "x", preferredContact: "email" },
    proposalRules,
  );
  assert.ok(errors.phone, "phone required on proposal");
  assert.ok(errors.propertyAddress, "property address required on proposal");
});

test("validateFields: over-limit values are rejected", () => {
  const errors = validateFields({ name: "x".repeat(121) }, contactRules);
  assert.match(errors.name, /120 characters or fewer/);
});

test("isSpam: honeypot content means spam", () => {
  assert.equal(
    isSpam({ [HONEYPOT_FIELD]: "http://spam.example", [TIMESTAMP_FIELD]: String(Date.now() - 60000) }),
    true,
  );
});

test("isSpam: inhumanly fast submission means spam", () => {
  assert.equal(isSpam({ [TIMESTAMP_FIELD]: String(Date.now() - 100) }), true);
  assert.equal(
    isSpam({ [TIMESTAMP_FIELD]: String(Date.now() - (MIN_FILL_TIME_MS - 1)) }),
    true,
  );
});

test("isSpam: missing/invalid timestamp means spam", () => {
  assert.equal(isSpam({}), true);
  assert.equal(isSpam({ [TIMESTAMP_FIELD]: "abc" }), true);
});

test("isSpam: empty honeypot + human pacing is not spam", () => {
  assert.equal(
    isSpam({ [HONEYPOT_FIELD]: "", [TIMESTAMP_FIELD]: String(Date.now() - 10000) }),
    false,
  );
});
