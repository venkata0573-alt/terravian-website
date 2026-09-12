# v8 criteria — visual-first homepage + human voice + intro loader

Trigger (client review): copy sounds robotic; homepage has too many words;
visitors come to see the work, not read about it; add a rotating-logo intro
on load; verify responsiveness everywhere; goal is a "wow" first impression.

## Acceptance criteria

1. **Intro loader** — on first page load per session, the Terravian logo
   marks at center with a slow rotation, then yields to the page within
   ~1.5s. Never blocks content without JS, respects prefers-reduced-motion
   (no rotation), never re-shows on internal navigation.
2. **Homepage = show, don't tell** — text-heavy explainer sections
   (five-stage timeline, maintenance calendar, Snow Command stage list,
   hardscape phase list, industry cards, outcome cards, empty testimonial
   placeholders) move off the homepage; their detail lives on the existing
   /how-we-work, /services/*, and /industries pages where intent-matched
   visitors go. Homepage flow becomes: hero → divisions → field photos →
   portfolio → brand rail → one short human statement → CTA.
3. **Warm verbiage** — every heading/intro that remains reads like a person
   talking to a property owner, not a capability statement. No filler
   ("accountable", "documented", "leverage"), contractions welcome,
   sentences short. Integrity rules unchanged: no invented stats, quotes,
   or claims.
4. **Responsive gates** — 0 horizontal overflow and 0 broken images at
   390/360 on all routes; desktop 1440 unchanged-or-better; tsc clean;
   production build clean; no new dependencies.
5. **Persona evaluation** — written pass as (a) an owner of 30 hotels,
   (b) a homeowner, (c) a prospective employee; any "this feels off" item
   that is fixable now gets fixed before handoff.
