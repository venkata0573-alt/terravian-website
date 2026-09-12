# v20 — Web3Forms pre-production audit & relay removal

## Trigger
Client-ordered pre-production audit of the Web3Forms implementation:
remove the fallback relay completely, send directly to
https://api.web3forms.com/submit from the browser, never show success
without Web3Forms acceptance, preserve design/fields/animations/mobile
layout, add the full guard set, run lint/typecheck/tests/build, and
produce an independent-reviewer audit package.

## Criteria
1. NO fallback email relay anywhere: no webhook/Resend/MailerSend/
   Formspree/FormSubmit/Brevo code, no ?relay=1 path, no server route
   that sends email. grep-verified.
2. Both forms (contact, proposal) POST directly from the browser to
   https://api.web3forms.com/submit with access key
   9647ddb3-970c-4700-baf8-3319e6c0dff8.
3. Success message only when HTTP response ok AND JSON success:true
   (isWeb3FormsAccepted, unit-tested).
4. Non-2xx, network failure, timeout (15 s AbortController), or
   success:false → retry error message; entered data preserved.
5. Honeypot field present+hidden; honeypot submissions rejected LOCALLY
   with zero Web3Forms requests. Minimum-fill-time (3 s) likewise local.
6. Client-side validation; empty/invalid forms make zero network
   requests.
7. Loading state ("Sending…", disabled, aria-busy) = duplicate-click
   prevention (double-click fires exactly one request).
8. Customer email as replyto; form-specific subjects.
9. Design/fields/animations/mobile layout untouched (0 px overflow, all
   fields render, console clean).
10. Lint (0 errors), type-check (clean), unit tests (all pass), E2E audit
    (all pass), production build (success).
11. Audit package: repo info, commit SHA, source ZIP, form-diff, modified
    file list, full tool outputs, test files + results, redacted payloads,
    exact statuses/responses, desktop+mobile screenshots, relay-removal
    and BREVO-free confirmations, limitations list.

## Known verification boundary (unchanged from v19)
The sandbox egress IP is a datacenter IP blocked at the Web3Forms edge
(HTTP 403, captured in tests/results/web3forms-edge-response.txt). Live
acceptance by Web3Forms therefore cannot be observed from here; the live
E2E audit verifies everything up to the edge plus the complete failure
path, and the acceptance gate is unit-tested. First real-visitor
submission after deploy remains the final live confirmation.
