# v19 — Browser-side Web3Forms delivery (rework of v18)

## Trigger
Client feedback: "received email from form sumit" — the v18 server-side
Web3Forms transport was rejected by Web3Forms (free plan: "This method is
not allowed. Use our API in client side"), and the fallback chain silently
delivered via FormSubmit instead. v18 therefore never delivered through
Web3Forms at all.

## Root cause (probed directly)
- Server-side POST to api.web3forms.com → 403 `{"success": false,
  "message": "This method is not allowed. Use our API in client side or
  contact support with server IP address (Pro plan is required)"}`.
- Web3Forms troubleshooting docs confirm: the API must run client-side;
  server-side requires a paid plan with an IP safelist.
- Vercel functions are also server-side — so browser-side posting is the
  ONLY free-plan path. This is an architectural constraint, not a bug.

## Criteria
1. Forms post to Web3Forms from the browser (React-side integration:
   FormData body to https://api.web3forms.com/submit, no custom headers).
2. Access key 9647ddb3-970c-4700-baf8-3319e6c0dff8 in the payload;
   customer's email as `replyto`; branded subject + from_name.
3. Success banner + field clearing ONLY when Web3Forms returns
   success:true — never on our own API's ok:true alone.
4. If the browser cannot reach Web3Forms (ad blocker, network), an
   explicit `?relay=1` fallback delivers through the server chain so no
   lead is lost; the relay path returns its own honest ok/error.
5. Honeypot + 3-second fill-time guard reject with 400 BEFORE any
   delivery call (no Web3Forms, no relay).
6. All v18 preservation requirements still hold: fields, design,
   validation, animation, loading state ("Sending…" + disabled +
   aria-busy), duplicate-submission blocking, success/error copy.
7. No new dependencies.

## Known verification boundary
The sandbox egress IP is a datacenter IP. Web3Forms/Cloudflare rejects it
at the edge (403, no CORS headers) for BOTH server and browser calls —
confirmed by curl with full browser headers and by a real Chromium fetch
("blocked by CORS policy: No 'Access-Control-Allow-Origin' header",
response body = the server-side 403 message). End-to-end Web3Forms
delivery therefore cannot complete from this sandbox; it can only be
confirmed from a real visitor browser on a residential/ISP connection
after the Vercel deploy. Everything up to the Web3Forms edge is verified
here; the relay fallback is verified end-to-end (emails arrived).
