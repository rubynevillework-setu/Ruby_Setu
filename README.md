# Ruby Setu

Connecting social enterprises in Nepal with companies and networks in Europe.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. No database or API keys are needed to run the
site — content is file-backed until phase 2.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you have:

| Variable | Needed for |
| --- | --- |
| `RESEND_API_KEY`, `INTRO_NOTIFY_EMAIL` | Emailing introduction requests. Without these, requests are logged to the server console rather than lost. |
| `DATABASE_URL` | Phase 2 only. Use a Neon project in an EU region. |
| `NEXT_PUBLIC_SITE_URL` | Correct metadata and share images in production. |

## Where things are

```
src/app/           routes: home, enterprises, stories, about
src/components/    UI
src/lib/           types, content access, verification tiers, markdown
src/content/       seeded placeholder enterprises and stories
src/db/schema.ts   Postgres schema for phase 2 (not wired up yet)
```

## Before this goes public

- [ ] Write the About page in your own voice — it is marked `[Draft]` in `src/app/about/page.tsx`
- [ ] Replace the placeholder enterprises with real, verified profiles and set `isSample: false`
- [ ] Add a privacy policy and name the data controller
- [ ] Set `RESEND_API_KEY` and `INTRO_NOTIFY_EMAIL` so introduction requests reach a person
- [ ] Add real photography

See `CLAUDE.md` for the conventions that matter, and the
[plan](https://claude.ai/code/artifact/17bd1ff1-35ea-4c36-9d12-838b2078fb1a)
for the roadmap.
