/**
 * E2E audit — Web3Forms form implementation, run against a production
 * build served locally (no mocks; all requests are real).
 *
 * Requires: a production server on BASE (default http://localhost:3100)
 * and Playwright available via NODE_PATH, e.g.:
 *   NODE_PATH=$(npm root -g) node tests/e2e/forms-audit.js
 *
 * Writes a machine-readable result log to tests/results/e2e-results.json
 * and screenshots to tests/results/screenshots/.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = path.join(__dirname, "..", "results");
const SHOTS = path.join(OUT, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

const results = [];
const capturedPayloads = {};

function log(area, check, pass, detail) {
  results.push({ area, check, pass: !!pass, detail: String(detail ?? "") });
  console.log(`${pass ? "PASS" : "FAIL"}  [${area}] ${check} — ${detail ?? ""}`);
}

/** Fills the contact form with valid data. */
async function fillContact(p) {
  await p.fill('input[name="name"]', "Audit Tester");
  await p.fill('input[name="company"]', "Audit Properties LLC");
  await p.fill('input[name="email"]', "audit.tester@example.com");
  await p.fill('input[name="phone"]', "2035550147");
  await p.fill('input[name="propertyAddress"]', "7 McKee Pl, Cheshire, CT");
  await p.selectOption('select[name="propertyType"]', "retail-commercial");
  await p.fill('textarea[name="message"]', "Audit test submission — please ignore.");
}

/** Fills the proposal form with valid data. */
async function fillProposal(p) {
  await p.fill('input[name="name"]', "Audit Tester");
  await p.fill('input[name="company"]', "Audit Properties LLC");
  await p.fill('input[name="role"]', "Property manager");
  await p.fill('input[name="email"]', "audit.tester@example.com");
  await p.fill('input[name="phone"]', "2035550147");
  await p.selectOption('select[name="preferredContact"]', "email");
  await p.fill('input[name="propertyAddress"]', "7 McKee Pl, Cheshire, CT");
  await p.selectOption('select[name="propertyType"]', "retail-commercial");
  await p.fill('input[name="propertySize"]', "About 2 acres");
  await p.locator('label:has-text("Snow")').first().click();
  await p.fill('textarea[name="situation"]', "Audit test submission — please ignore.");
  await p.fill('input[name="walkthrough"]', "Yes — schedule a walkthrough");
}

/** Sets the hidden honeypot via the native setter so React sees it. */
async function fillHoneypot(p) {
  await p.evaluate(() => {
    const input = document.querySelector('input[name="website"]');
    const setter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, "value",
    ).set;
    setter.call(input, "http://spam-bot.example");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

/**
 * Submission-relevant requests: anything cross-origin, plus any same-origin
 * /api/ call except the address-autocomplete. Same-origin static assets,
 * image lazy-loads triggered by scroll-into-view, and /api/address-suggest
 * (the address field's autocomplete) are page behavior, not submissions.
 */
function submissionRequests(urls) {
  return urls.filter((href) => {
    let u;
    try { u = new URL(href); } catch { return false; }
    const base = new URL(BASE);
    if (u.origin !== base.origin) return true;
    if (u.pathname.startsWith("/api/")) return u.pathname !== "/api/address-suggest";
    return false;
  });
}

/** Attaches a network recorder; returns the recorder. */
function watchNetwork(p) {
  const rec = { requests: [], web3forms: [], legacyApi: [], relayHosts: [] };
  p.on("request", (r) => {
    let u;
    try { u = new URL(r.url()); } catch { return; }
    if (!/^https?:$/.test(u.protocol)) return;
    rec.requests.push(u.href);
    if (u.host === "api.web3forms.com") {
      rec.web3forms.push({ method: r.method(), url: u.href, postData: r.postData() ?? "" });
    }
    if (u.pathname === "/api/contact" || u.pathname === "/api/proposal") {
      rec.legacyApi.push(u.href);
    }
    if (["formsubmit.co", "formspree.io", "api.resend.com", "api.mailersend.com", "api.brevo.com"].includes(u.host)) {
      rec.relayHosts.push(u.host);
    }
  });
  p.on("response", async (r) => {
    try {
      const u = new URL(r.url());
      if (u.host === "api.web3forms.com") {
        const body = await r.text().catch(() => "");
        rec.web3forms.push({ response: true, status: r.status(), body: body.slice(0, 400) });
      }
    } catch {}
  });
  p.on("requestfailed", (r) => {
    try {
      const u = new URL(r.url());
      if (u.host === "api.web3forms.com") {
        rec.web3forms.push({ failed: true, error: r.failure()?.errorText ?? "unknown" });
      }
    } catch {}
  });
  return rec;
}

async function auditForm(browser, form) {
  const { path: formPath, fill, label } = form;
  for (const vp of [
    { width: 1440, height: 900, name: "desktop" },
    { width: 390, height: 844, name: "mobile" },
  ]) {
    const p = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: "reduce",
    });
    const area = `${label}/${vp.name}`;
    const rec = watchNetwork(p);
    const pageErrors = [];
    p.on("pageerror", (e) => pageErrors.push(String(e)));

    await p.goto(BASE + formPath, { waitUntil: "load" });
    await p.waitForSelector("form");

    // Layout integrity
    const layout = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      honeypotPresent: !!document.querySelector('input[name="website"]'),
      honeypotHidden: (() => {
        const el = document.querySelector('input[name="website"]');
        const r = el.getBoundingClientRect();
        return r.left < -1000 || !el.offsetParent;
      })(),
    }));
    log(area, "no horizontal overflow", layout.overflow === 0, `overflow=${layout.overflow}px`);
    log(area, "honeypot present and hidden", layout.honeypotPresent && layout.honeypotHidden,
      JSON.stringify(layout));
    await p.screenshot({ path: path.join(SHOTS, `${label}-${vp.name}-1-initial.png`), fullPage: true });

    // 1) Empty submit → validation errors, ZERO network requests
    let mark = rec.requests.length;
    await p.click('button[type="submit"]');
    await p.waitForTimeout(900);
    const errCount = await p.locator('[id$="-error"]').count();
    log(area, "empty submit shows validation errors", errCount > 0, `${errCount} field errors`);
    {
      const hits = submissionRequests(rec.requests.slice(mark));
      log(area, "empty submit makes zero network requests", hits.length === 0,
        `${hits.length} submission requests${hits.length ? ": " + hits.join(", ") : ""}`);
    }
    await p.screenshot({ path: path.join(SHOTS, `${label}-${vp.name}-2-empty-validation.png`), fullPage: true });

    // 2) Invalid email → zero network requests
    await fill(p);
    await p.fill('input[name="email"]', "not-an-email");
    await p.waitForTimeout(3600); // human pacing
    mark = rec.requests.length;
    await p.click('button[type="submit"]');
    await p.waitForTimeout(900);
    const emailErr = await p.locator('text=doesn\'t look valid').count();
    {
      const hits = submissionRequests(rec.requests.slice(mark));
      log(area, "invalid email rejected locally", emailErr > 0 && hits.length === 0,
        `emailErrors=${emailErr}, submissionRequests=${hits.length}${hits.length ? ": " + hits.join(", ") : ""}`);
    }

    // 3) Honeypot filled → zero network requests, error shown, data kept
    await p.fill('input[name="email"]', "audit.tester@example.com");
    await fillHoneypot(p);
    await p.waitForTimeout(600);
    mark = rec.requests.length;
    await p.click('button[type="submit"]');
    await p.waitForTimeout(900);
    const spamErr = await p.locator("text=couldn't be accepted").count();
    const nameKept = await p.inputValue('input[name="name"]');
    {
      const hits = submissionRequests(rec.requests.slice(mark));
      log(area, "honeypot submission rejected locally with zero requests",
        hits.length === 0 && spamErr > 0,
        `submissionRequests=${hits.length}${hits.length ? ": " + hits.join(", ") : ""}, errorShown=${spamErr > 0}`);
    }
    log(area, "entries kept after honeypot rejection", nameKept === "Audit Tester", `name="${nameKept}"`);
    await p.screenshot({ path: path.join(SHOTS, `${label}-${vp.name}-3-honeypot-rejected.png`), fullPage: true });

    // reset
    await p.reload({ waitUntil: "load" });
    await p.waitForSelector("form");

    // 4) Fast submit (< min fill time) → zero network requests
    await fill(p);
    mark = rec.requests.length;
    await p.click('button[type="submit"]');
    await p.waitForTimeout(900);
    const fastErr = await p.locator("text=couldn't be accepted").count();
    {
      const hits = submissionRequests(rec.requests.slice(mark));
      log(area, "inhumanly fast submit rejected locally with zero requests",
        hits.length === 0 && fastErr > 0,
        `submissionRequests=${hits.length}${hits.length ? ": " + hits.join(", ") : ""}, errorShown=${fastErr > 0}`);
    }

    // 5) Valid submission → exactly ONE request, to api.web3forms.com only
    await p.reload({ waitUntil: "load" });
    await p.waitForSelector("form");
    await fill(p);
    await p.waitForTimeout(4200); // human pacing
    const w3Before = rec.web3forms.length;
    mark = rec.requests.length;
    await p.click('button[type="submit"]');
    // Wait for the delivery attempt to settle: the success banner (p[role=status])
    // or the retry banner (the form's own p[role=alert] — matched by text so the
    // Next.js route announcer, also a p[role=alert], can't false-trigger).
    const successBannerLoc = p.locator('p[role="status"]', { hasText: "on its way" });
    const errorBannerLoc = p.locator('p[role="alert"]', { hasText: "couldn't send" });
    await Promise.race([
      successBannerLoc.waitFor({ timeout: 40000 }),
      errorBannerLoc.waitFor({ timeout: 40000 }),
    ]);
    // The banner and the button re-enable happen in the same state update;
    // poll briefly so timing jitter can't produce a false reading.
    await p.locator('button[type="submit"]:not([disabled])').waitFor({ timeout: 20000 });
    await p.waitForTimeout(300);

    const w3Posts = rec.web3forms.slice(w3Before).filter((e) => e.method === "POST");
    const newRequests = submissionRequests(rec.requests.slice(mark));
    const offTarget = newRequests.filter((u) => !u.startsWith("https://api.web3forms.com/"));
    log(area, "valid submit sends exactly one request", w3Posts.length === 1,
      `${w3Posts.length} web3forms POST(s)`);
    log(area, "that request goes to https://api.web3forms.com/submit",
      w3Posts.length === 1 && w3Posts[0].url === "https://api.web3forms.com/submit",
      w3Posts[0]?.url ?? "none");
    log(area, "zero requests to any other endpoint (no relay, no legacy API)",
      offTarget.length === 0 && rec.legacyApi.length === 0 && rec.relayHosts.length === 0,
      `other=${offTarget.length}, legacyApi=${rec.legacyApi.length}, relays=${rec.relayHosts.join(",") || "none"}`);

    // Payload inspection (persisted for the audit package — personal
    // data is redacted before publication)
    if (w3Posts[0]) {
      capturedPayloads[`${label}-${vp.name}`] = w3Posts[0].postData;
      const pd = w3Posts[0].postData;
      const has = (k) => new RegExp(`name="${k}"`).test(pd);
      const keyOk = pd.includes("9647ddb3-970c-4700-baf8-3319e6c0dff8");
      const replyOk = has("replyto") && pd.includes("audit.tester@example.com");
      const subjectOk = has("subject") &&
        pd.includes(label === "contact" ? "Website message" : "Proposal request");
      log(area, "payload carries the public access key", keyOk, "");
      log(area, "payload sets customer email as replyto", replyOk, "");
      log(area, "payload has a form-specific subject", subjectOk, "");
    }

    // Outcome handling — this environment's datacenter IP is blocked at
    // the Web3Forms edge, so the expected, audited outcome here is the
    // failure path: error shown, entries kept, no success banner.
    const successBanner = await successBannerLoc.count();
    const errorBanner = await errorBannerLoc.count();
    const nameAfter = await p.inputValue('input[name="name"]').catch(() => "");
    const attempt = rec.web3forms.slice(w3Before).find((e) => e.response || e.failed);
    const attemptDetail = attempt
      ? attempt.failed
        ? `network failure at Web3Forms edge (${attempt.error})`
        : `HTTP ${attempt.status} ${attempt.body}`
      : "no attempt recorded";
    log(area, "failed Web3Forms request shows an error, never success",
      successBanner === 0 && errorBanner > 0,
      `success=${successBanner}, error=${errorBanner}; ${attemptDetail}`);
    log(area, "entries preserved after failure for retry", nameAfter === "Audit Tester",
      `name="${nameAfter}"`);
    const btnDisabled = await p.locator('button[type="submit"]').isDisabled();
    log(area, "submit button re-enabled after failure", !btnDisabled, "");
    await p.screenshot({ path: path.join(SHOTS, `${label}-${vp.name}-4-failure-kept.png`), fullPage: true });

    log(area, "no uncaught page errors", pageErrors.length === 0, pageErrors.join(" | ") || "none");
    await p.close();
  }
}

async function duplicateClickAudit(browser) {
  // Throttle the network so the in-flight window is observable, then
  // double-click submit: exactly one Web3Forms request must fire.
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const rec = watchNetwork(p);
  const cdp = await p.context().newCDPSession(p);
  await p.goto(BASE + "/contact", { waitUntil: "load" });
  await fillContact(p);
  await p.waitForTimeout(4200);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false, latency: 4000, downloadThroughput: 5e6, uploadThroughput: 5e6,
  });
  const btn = p.locator('button[type="submit"]');
  await btn.click();
  await p.waitForTimeout(400);
  const disabledMidFlight = await btn.isDisabled();
  const busyMidFlight = (await btn.getAttribute("aria-busy")) === "true";
  const labelMidFlight = (await btn.innerText()).trim();
  await btn.click({ force: true }).catch(() => {}); // second click while in flight
  await Promise.race([
    p.locator('p[role="status"]', { hasText: "on its way" }).waitFor({ timeout: 60000 }),
    p.locator('p[role="alert"]', { hasText: "couldn't send" }).waitFor({ timeout: 60000 }),
  ]);
  await p.waitForTimeout(600);
  const posts = rec.web3forms.filter((e) => e.method === "POST");
  log("duplicate-prevention", "button disabled + aria-busy + 'Sending…' while submitting",
    disabledMidFlight && busyMidFlight && /Sending/.test(labelMidFlight),
    `disabled=${disabledMidFlight}, aria-busy=${busyMidFlight}, label="${labelMidFlight}"`);
  log("duplicate-prevention", "double-click fires exactly one Web3Forms request",
    posts.length === 1, `${posts.length} request(s)`);
  await p.screenshot({ path: path.join(SHOTS, "contact-desktop-5-duplicate-click.png") });
  await p.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  await auditForm(browser, { path: "/contact", fill: fillContact, label: "contact" });
  await auditForm(browser, { path: "/request-a-proposal", fill: fillProposal, label: "proposal" });
  await duplicateClickAudit(browser);
  await browser.close();

  fs.writeFileSync(
    path.join(OUT, "payloads-raw.json"),
    JSON.stringify(capturedPayloads, null, 2),
  );
  fs.writeFileSync(
    path.join(OUT, "e2e-results.json"),
    JSON.stringify({ base: BASE, ranAt: new Date().toISOString(), results }, null, 2),
  );
  const fails = results.filter((r) => !r.pass);
  console.log(`\n==== ${results.length - fails.length}/${results.length} checks passed ====`);
  if (fails.length) {
    console.log("FAILURES:");
    for (const f of fails) console.log(`  [${f.area}] ${f.check} — ${f.detail}`);
    process.exit(1);
  }
})().catch((e) => { console.error("SCRIPT FAIL:", e); process.exit(1); });
