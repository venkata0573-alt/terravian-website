# Tests — Terravian website forms

Two layers, both run against real code with no mocks of the delivery
service:

## Unit tests (validation + Web3Forms payload/acceptance logic)

```bash
npm install
npm run test:unit        # tsc -p tests/tsconfig.json && node --test tests/unit/
```

- `tests/unit/validation.test.mjs` — sanitization, required/pattern rules,
  empty-form rejection, honeypot + minimum-fill-time spam guards.
- `tests/unit/leadDelivery.test.mjs` — endpoint constant
  (`https://api.web3forms.com/submit`), access key, 15 s timeout, contact vs
  proposal subjects, customer-email reply-to, labeled fields, and the
  acceptance gate `isWeb3FormsAccepted` (success only on HTTP-ok AND
  `success: true`).

## E2E audit (real Chromium against a production build)

```bash
npm run build && npm run start        # or the standalone server, on :3100
NODE_PATH=$(npm root -g) node tests/e2e/forms-audit.js
```

Playwright must be installed (`npm i -g playwright` + a Chromium build).
The script drives both forms on desktop (1440×900) and mobile (390×844)
viewports and asserts, with a live network recorder:

- empty / invalid forms make **zero** submission requests
- honeypot and inhumanly fast submissions are rejected **locally** with
  zero requests
- a valid submission fires exactly one request, to
  `https://api.web3forms.com/submit`, carrying the public access key, the
  customer email as `replyto`, and a form-specific subject
- a failed Web3Forms request shows the retry error, keeps every entry,
  re-enables the button, and never shows success
- duplicate-click while "Sending…" fires exactly one request

Results are written to `tests/results/` (JSON log, screenshots, captured
payloads). `payloads-raw.json` is regenerated per run and git-ignored;
`payloads-redacted.md` is the shareable version.

> Environment note: from datacenter IPs, Web3Forms' edge (Cloudflare)
> blocks requests before they reach the API, so the audited live outcome
> for the happy path is the failure path (error shown, entries kept) —
> which is exactly the behavior the audit needs to prove. Successful
> acceptance is additionally covered by unit tests of the acceptance gate
> and can only be observed live from a real visitor connection.
