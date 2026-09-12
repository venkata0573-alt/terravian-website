# Exact Web3Forms request payloads (personal data redacted)

Captured live by the network recorder in tests/e2e/forms-audit.js during the
2026-09-03 audit run against the production build. Raw captures are in
tests/results/payloads-raw.json (regenerated on each run; not committed).

All four submissions (contact/proposal × desktop/mobile) are byte-identical
in structure; one representative payload per form is shown in full.

## contact-desktop

POST https://api.web3forms.com/submit
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary[BOUNDARY]

```
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="access_key"

9647ddb3-970c-4700-baf8-3319e6c0dff8
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="subject"

Website message — [NAME REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="from_name"

Terravian Website — Contact form
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="replyto"

[EMAIL REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="name"

[NAME REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Name"

[NAME REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Company"

[COMPANY REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Email"

[EMAIL REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Phone"

[PHONE REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Property address"

[ADDRESS REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Property type"

Retail & Commercial
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Message"

[MESSAGE REDACTED]
------WebKitFormBoundary[BOUNDARY]--
```

## proposal-desktop

POST https://api.web3forms.com/submit
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary[BOUNDARY]

```
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="access_key"

9647ddb3-970c-4700-baf8-3319e6c0dff8
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="subject"

Proposal request — [COMPANY REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="from_name"

Terravian Website — Request a Proposal form
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="replyto"

[EMAIL REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="name"

[NAME REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Name"

[NAME REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Company"

[COMPANY REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Role"

Property manager
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Email"

[EMAIL REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Phone"

[PHONE REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Property address"

[ADDRESS REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Property type"

Retail & Commercial
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Approximate size"

About 2 acres
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Services needed"

Snow & Ice Management
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Current situation"

[MESSAGE REDACTED]
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Preferred contact method"

email
------WebKitFormBoundary[BOUNDARY]
Content-Disposition: form-data; name="Walkthrough preference"

Yes — schedule a walkthrough
------WebKitFormBoundary[BOUNDARY]--
```
