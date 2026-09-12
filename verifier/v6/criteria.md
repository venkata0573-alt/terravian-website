# v6 criteria — proposal form fails on Vercel, works locally

Date: 2026-08-25

Symptom (user): "Request a Proposal" works on localhost, but after
git push + Vercel deploy the live site shows the failure message
("We couldn't send your request just now…").

## Hypotheses to evaluate

1. FormSubmit blocks Vercel egress (bot protection / IP reputation),
   while sandbox egress passes. Code would be fine; transport wrong.
2. Code path differs between local standalone server and Vercel
   serverless (runtime, env vars, timeouts, fetch behavior).
3. Env var misconfiguration on Vercel (LEAD_EMAIL etc.).

## Acceptance criteria

1. Root cause identified with evidence (not guesswork).
2. Fix implemented in the repo so the default (zero-config) deployment
   succeeds on Vercel — verified against a Vercel-representative
   runtime as far as possible from the sandbox.
3. The fix must not weaken spam protection, must not log PII, must not
   add dependencies, and must keep the honest failure message as a last
   resort (no pretending a submission was sent when it was not).
4. Local verification: type-check clean, production build clean, form
   submissions succeed through the full chain locally (happy path),
   honest failure still returned when ALL transports fail.
5. Verifier run recorded under verifier/runs/; README index appended.

## Out of scope

- Accessing the user's Vercel project (no credentials in sandbox) — the
  fix must be verifiable from code + external behavior reachable from
  here; anything that genuinely requires the user's Vercel dashboard is
  handed back as a precise instruction.
