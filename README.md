# Paver World of Wesley Chapel — Website

Modern, conversion-focused website for [Paver World of Wesley Chapel](https://www.paverworldofwesleychapel.com):
Next.js 15 + Tailwind CSS v4, with an AI chat assistant ("Paver Pete") and an email lead pipeline.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm test       # Vitest unit tests
npm run build  # production build (also the integration gate)
```

## Deploy (Vercel)

Import the repo in Vercel — zero config needed. Optional env vars (site fully works without them):

| Var | Purpose | Default |
|-----|---------|---------|
| `AI_API_KEY` | AI provider key for the chat assistant | unset → scripted fallback answers |
| `AI_MODEL` | model id | `claude-haiku-4-5` |
| `AI_BASE_URL` | provider base URL (Anthropic-compatible) | `https://api.anthropic.com` |
| `RESEND_API_KEY` | lead email delivery via [Resend](https://resend.com) | unset → leads logged only |
| `LEAD_TO_EMAIL` | lead recipient | `paverworldofwesleychapel@gmail.com` |
| `LEAD_FROM_EMAIL` | verified Resend sender | Resend onboarding sender |
| `NEXT_PUBLIC_SITE_URL` | canonical URL for SEO/OG | `http://localhost:3000` |

To swap the AI model later, change `AI_API_KEY`/`AI_MODEL` (and `AI_BASE_URL` for a different
Anthropic-compatible gateway) — no code changes.

## Content updates

- **Business facts** (phone, hours, services, FAQs, service areas): edit `lib/business.ts` — every page reads from it.
- **Photos**: edit `lib/images.ts`. Ships with Unsplash stock URLs; **visually check images on first deploy** (any URL that fails renders a branded fallback, never a broken image). To use real job photos, drop files into `public/images/` and point the slots at `/images/<file>`.
- **Testimonials**: `lib/business.ts` ships with clearly-marked placeholders — replace them with real Google/Yelp reviews **before launch**. Note that the testimonial cards render decorative five-star marks alongside every quote, so shipping the placeholders would present fabricated five-star reviews to visitors.
- **Analytics**: add your tag to `app/layout.tsx` when ready.

## Structure

- `app/` — pages (`/`, `/commercial`, `/about`) and API routes (`/api/chat`, `/api/lead`)
- `components/` — UI sections
- `lib/` — business data, AI provider layer, fallback chat, lead validation/delivery
- `tests/` — Vitest unit tests
- `docs/superpowers/` — design spec and implementation plan
- `superpowers/` — vendored dev-workflow plugin (not part of the site)
