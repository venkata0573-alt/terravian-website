# v18 — Lead delivery: Brevo → Web3Forms

Client direction: replace Brevo with Web3Forms (access key
9647ddb3-…-c0dff8) across every website form; preserve all fields, design,
validation, animations, success/error messages; honeypot spam protection,
loading state, duplicate-submission prevention, customer email as reply-to;
remove all Brevo code; test locally.

Integration choice: the React forms (ContactForm / ProposalForm via
useFormSubmission) keep posting to the Next.js route handlers, which now
deliver through Web3Forms as the primary transport. The access key stays
server-side (never bundled to the browser), the locked stack gains zero new
dependencies, and the authoritative server validation/spam layer is
preserved. The key ships in code with a WEB3FORMS_ACCESS_KEY env override.

## Criteria

1. No Brevo code remains anywhere (grep clean).
2. Web3Forms is transport #1; chain order updated in code + comments +
   .env.example.
3. Payload carries subject, from_name, replyto = customer email, name, and
   every labeled form field.
4. Real contact-form submission through the UI delivers (ok:true) with
   unchanged success message; fields clear after success.
5. Real proposal-form submission through the UI delivers (ok:true) with
   unchanged success message; fields clear.
6. Loading state ("Sending…", disabled, aria-busy) observed in flight;
   duplicate click blocked while submitting.
7. Client validation preserved — empty submit fires no request, errors show.
8. Honeypot-filled POST → 400 generic rejection; sub-3s POST → 400.
9. tsc + production build clean.

Deployment note: Vercel deploy is the client's push (no Vercel access from
the sandbox); no env vars are required — delivery works out of the box.
