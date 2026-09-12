/**
 * Unit tests for lib/leadDelivery.ts — the Web3Forms payload builder and
 * the acceptance rule that gates the success message.
 * Run: npm run test:unit
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  buildLeadSubmission,
  isWeb3FormsAccepted,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_TIMEOUT_MS,
} = require("../.unit-build/leadDelivery.js");
const { contactRules, proposalRules } = require("../.unit-build/validation.js");

const EXPECTED_KEY = "9647ddb3-970c-4700-baf8-3319e6c0dff8";

test("endpoint is the Web3Forms submit API", () => {
  assert.equal(WEB3FORMS_ENDPOINT, "https://api.web3forms.com/submit");
});

test("the configured access key is the client-supplied public key", () => {
  assert.equal(WEB3FORMS_ACCESS_KEY, EXPECTED_KEY);
});

test("a reasonable request timeout is configured (5–30s)", () => {
  assert.ok(WEB3FORMS_TIMEOUT_MS >= 5000 && WEB3FORMS_TIMEOUT_MS <= 30000);
});

test("contact payload: key, reply-to, form-specific subject, labeled fields", () => {
  const sub = buildLeadSubmission(
    "contact",
    {
      name: "Jane Doe",
      company: "Acme Properties",
      email: "jane@example.com",
      phone: "",
      propertyAddress: "1 Main St",
      propertyType: "Retail & Commercial",
      message: "Hello",
    },
    contactRules,
  );
  assert.equal(sub.accessKey, EXPECTED_KEY);
  assert.equal(sub.replyTo, "jane@example.com", "customer email is the reply-to");
  assert.equal(sub.subject, "Website message — Jane Doe");
  assert.match(sub.fromName, /Contact form/);
  assert.equal(sub.fields["Name"], "Jane Doe");
  assert.equal(sub.fields["Property type"], "Retail & Commercial");
  assert.equal(sub.fields["Phone"], "—", "empty optional field renders as dash");
  assert.equal(Object.keys(sub.fields).length, Object.keys(contactRules).length);
});

test("proposal payload: proposal-specific subject using the company", () => {
  const sub = buildLeadSubmission(
    "proposal",
    {
      name: "Jane Doe",
      company: "Acme Properties",
      email: "jane@example.com",
      phone: "203-555-0147",
      propertyAddress: "1 Main St",
      propertyType: "HOA & Condominium",
      situation: "Current provider inconsistent",
      preferredContact: "Email",
      services: "Snow & Ice Management",
    },
    proposalRules,
  );
  assert.equal(sub.subject, "Proposal request — Acme Properties");
  assert.match(sub.fromName, /Request a Proposal form/);
  assert.equal(sub.fields["Services needed"], "Snow & Ice Management");
  assert.equal(sub.fields["Walkthrough preference"], "—");
});

test("proposal subject falls back to the name when company is blank", () => {
  const sub = buildLeadSubmission("proposal", { name: "Jane Doe", company: "" }, proposalRules);
  assert.equal(sub.subject, "Proposal request — Jane Doe");
});

/* ---- The acceptance gate: success ONLY on HTTP-ok AND success:true ---- */

test("accepted: HTTP ok + success:true", () => {
  assert.equal(isWeb3FormsAccepted(true, { success: true }), true);
});

test("rejected: HTTP ok + success:false", () => {
  assert.equal(isWeb3FormsAccepted(false, { success: false }), false);
  assert.equal(isWeb3FormsAccepted(true, { success: false }), false);
});

test("rejected: non-2xx even if body says success:true", () => {
  assert.equal(isWeb3FormsAccepted(false, { success: true }), false);
});

test("rejected: missing success key, string \"true\", null, garbage", () => {
  assert.equal(isWeb3FormsAccepted(true, {}), false);
  assert.equal(isWeb3FormsAccepted(true, { success: "true" }), false);
  assert.equal(isWeb3FormsAccepted(true, null), false);
  assert.equal(isWeb3FormsAccepted(true, "ok"), false);
  assert.equal(isWeb3FormsAccepted(true, undefined), false);
});
