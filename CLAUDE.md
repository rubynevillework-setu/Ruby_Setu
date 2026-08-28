# Ruby Setu

A bridge between social enterprises in Nepal and the European companies and
networks that want to work with them. Storytelling plus human-brokered
introductions — not a marketplace and not automated matching.

Full plan: https://claude.ai/code/artifact/17bd1ff1-35ea-4c36-9d12-838b2078fb1a

## The core loop

Story → signal → **human screen** → **human introduction** → tracked outcome.

Steps 3 and 4 stay human permanently. They are the product. If a proposed
feature does not move a visitor along this line, it does not belong in v1.

## Site structure — do not add pages

Three navigation items only: **Enterprises**, **Stories**, **About**, plus a
home landing page. A "browse with filters" page and a "how partnering works"
page were both explicitly cut. Sector labels on the enterprises index replace
filtering until the list passes ~30 entries. The partnering argument lives in
About and in a story; the verification methodology is a section of About.

## Design tokens

Set in `src/app/globals.css` under `@theme`. Two shores: `ruby` (Nepal) and
`indigo` (Europe) on a cool paper ground, with `brass` reserved for trust and
verification signals. Text on a solid ruby fill uses `text-on-ruby`, which
flips in dark mode — never `text-white`.

Typography: Newsreader (display) / IBM Plex Sans (body) / IBM Plex Mono
(labels and data). Self-hosted via Fontsource — **do not switch to
`next/font/google`**, which sends every European visitor's IP to Google.

Avoid the visual clichés of ethical-sourcing sites: cream backgrounds,
terracotta accents, generic smiling-artisan stock photography. Real
photographs of named people carry more credibility than warmth.

## Verification is the product

`src/lib/verification.ts` derives a tier (T0–T3) from an append-only event
log. Never store a tier directly and never add a boolean `verified` column —
if evidence goes stale the badge must drop on its own.

- T0 is never published. `getEnterprises()` filters it out.
- Only T2+ may receive a brokered introduction (`isIntroducible`).
- Every profile shows the full check log, including awkward entries.

## Data

`src/lib/content.ts` is the only seam between pages and data. It reads from
`src/content/*.ts` today. When `DATABASE_URL` exists, only that module changes
— each function becomes a Drizzle query against `src/db/schema.ts`. **No page
imports content directly. Keep it that way.**

All seeded enterprises and stories are invented placeholders carrying
`isSample: true`. `SampleDataBanner` shows site-wide until none remain.
Never present sample records as real verified enterprises.

## Positioning

Do **not** sell EU compliance fear. Post-Omnibus, CSRD applies at 1,000+
employees *and* €450m turnover (FY from Jan 2027); CSDDD at 5,000+ *and*
€1.5bn, deferred to July 2029, with a value-chain cap protecting small
suppliers. The pitch is the inverse: working with a small Nepali enterprise is
far less paperwork than European buyers assume.

The urgency driver is Nepal's LDC graduation in November 2026 and the loss of
EU Everything But Arms duty-free access. Confirm the actual transition terms
with the EU Delegation in Kathmandu before publishing tariff guidance.

## Commands

```
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run db:generate   # once DATABASE_URL is set
```
