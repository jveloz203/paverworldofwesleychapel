# Paver World of Wesley Chapel — Website Modernization Design

**Date:** 2026-07-04
**Status:** Approved section-by-section in brainstorming; pending final spec review
**Branch:** `claude/paver-world-modernize-ypogux`

## Goal

Replace the legacy paverworldofwesleychapel.com with a modern, conversion-focused
website modeled on the lead-surge-electric.vercel.app pattern (contractor lead-gen
landing page with an AI assistant). The design must be psychologically attractive
to Wesley Chapel / Tampa / Central Florida homeowners, present the business as a
trusted choice for high-value residential and commercial hardscape work, and
highlight its factory-direct material buying as an efficiency/value advantage.

## Business Facts (single source of truth: `lib/business.ts`)

- **Name:** Paver World of Wesley Chapel, Inc.
- **Story:** Family owned since 2006, run by "Paver Pete" and his wife Catherine.
- **Address:** 30141 State Road 54, Wesley Chapel, FL 33543
- **Phone:** (813) 994-8805
- **Email:** paverworldofwesleychapel@gmail.com
- **Hours:** Monday–Friday 9am–5pm
- **Services:** paver patios, driveways, pool decks, walkways, fire pits, retaining walls
- **Markets:** residential and commercial (HOAs, builders, property managers, communities)
- **Differentiators:** family owned since 2006 (years computed dynamically, ~20), factory-direct materials, licensed & insured, free estimates, BBB-listed
- **Service area:** Wesley Chapel, New Tampa, Land O' Lakes, Lutz, Zephyrhills, Tampa and surrounding Pasco/Hillsborough communities
- **Social:** Instagram @paverworld, Facebook page

All copy across the site reads these values from `lib/business.ts`. No business
fact is hardcoded in a component.

## Decisions Made During Brainstorming

1. **Scope:** Conversion landing page (home) + dedicated **Commercial** page + **About/Story** page.
2. **Lead delivery:** API route emails leads via **Resend** to the business inbox.
3. **AI assistant:** Claude API behind generic env vars (`AI_API_KEY`, `AI_MODEL`, `AI_BASE_URL`) so the model can be swapped without code changes; scripted fallback so the widget never breaks.
4. **Imagery:** hotlinked Unsplash CDN stock URLs, centralized in `lib/images.ts`, with automatic designed fallback on load failure. Real job photos can replace them later by editing one file.
5. **Deployment:** Vercel, preview domain for now; canonical URL configurable via `NEXT_PUBLIC_SITE_URL`.
6. **Visual direction:** Warm craftsman earth (terracotta / sand / charcoal).
7. **Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Vitest (Approach A, chosen over Astro islands and plain-static alternatives).

## Section 1 — Pages & Conversion Architecture

### Home (`app/page.tsx`) — one scrolling conversion page

1. **Header** (sticky, all pages): logo mark, anchor nav (Services, Why Us, Commercial, Reviews, FAQ, Contact + About link), always-visible phone `(813) 994-8805`, "Free Estimate" CTA button.
2. **Hero:** headline "Wesley Chapel's Trusted Paver Craftsmen — Family Owned Since 2006" over a paver-patio photo; instant-quote card (name, phone, project type — 3 fields max); trust chips: Licensed & Insured · Factory-Direct Materials · Free Estimates.
3. **Trust bar:** years in business (computed from 2006 founding, e.g. "20 years") · family owned & operated · factory-direct pricing · BBB-listed.
4. **Services grid:** 6 cards (patios, driveways, pool decks, walkways, fire pits, retaining walls), each photo + one-line benefit + link to quote.
5. **"We Buy Direct" split section:** factory-direct materials story = better price and faster jobs for homeowners and commercial clients alike.
6. **Process:** 4 steps — free design consultation → custom quote → expert installation → final walkthrough. (Reduces fear of the unknown.)
7. **Commercial teaser band** linking to the Commercial page.
8. **Testimonials:** review cards + links to Google/Yelp profiles. Ships with clearly marked PLACEHOLDER quotes to be replaced with real reviews — no fabricated attributed reviews.
9. **Service area:** named towns list (see Business Facts).
10. **FAQ:** accordion, ~6 questions (cost factors, timeline, permits, sealing, warranty, financing/estimates).
11. **Final CTA + contact:** full lead form (name, phone, email, project type, message), address, hours, phone.
12. **Footer:** NAP info, service links, social links, license note.
13. **Sticky mobile bottom bar** (all pages): Call · Get Quote · Chat.
14. **AI chat widget** (all pages): floating button, bottom-right.

### Commercial (`app/commercial/page.tsx`)

Capability-focused page: hero for commercial credibility; audience cards (HOAs, builders, property managers, community developments); direct-materials-at-scale pitch; licensing/insurance emphasis; commercial-specific lead form (adds company field, source tagged `commercial-form`).

### About (`app/about/page.tsx`)

Pete & Catherine's story since 2006; family values; the direct-buying model; service-area roots; CTA to estimate.

## Section 2 — AI Assistant & Lead Pipeline

### Chat widget (`components/ChatWidget.tsx`, client component)

- Floating button opens panel branded **"Paver Pal — Paver World's AI Assistant."**
- Greeting message + quick-reply chips: "Get a free estimate", "What do pavers cost?", "Do you do pool decks?".
- Sends full conversation history to `POST /api/chat`; renders assistant replies; shows typing state; handles errors by showing the phone number.

### `POST /api/chat` (`app/api/chat/route.ts`)

- Provider layer `lib/ai.ts`: reads `AI_API_KEY`, `AI_MODEL` (default `claude-haiku-4-5`), `AI_BASE_URL` (default `https://api.anthropic.com`). Anthropic Messages API format. Swapping env vars swaps the model with no code change.
- System prompt embeds the business knowledge base from `lib/business.ts` plus rules:
  - Answer in 2–3 friendly sentences.
  - Always steer toward a free estimate; when the visitor shows intent, collect name + phone.
  - When name + phone are collected, emit a structured lead marker (e.g. `[LEAD]{json}[/LEAD]`) which the server strips from the visible reply and forwards to the lead pipeline (source: `chat`).
  - Never invent prices; no price promises beyond what the KB states.
- **Fallback:** if `AI_API_KEY` is missing, or the provider errors/times out, `lib/fallback-chat.ts` answers via keyword-matched intents (~10: cost, services list, specific services, service area, hours/location, scheduling/estimate, commercial, materials/direct-buying, licensing, default) with a "call (813) 994-8805" nudge. The widget always answers.
- **Rate limiting:** simple in-memory per-IP throttle to bound API cost.

### `POST /api/lead` (`app/api/lead/route.ts`)

- Accepts `{ name, phone, email?, projectType?, message?, company?, source }`, `source ∈ quote-form | contact-form | commercial-form | chat`.
- Validates name + phone presence/shape; rejects invalid input with 400.
- Sends email via Resend (`RESEND_API_KEY`, `LEAD_TO_EMAIL`; from-address `LEAD_FROM_EMAIL` defaulting to Resend's onboarding sender) with formatted subject: `New Lead: {projectType} — {name} ({phone})`.
- If Resend is not configured: log the lead server-side, still return success with `{ delivered: false }` so visitor-facing forms never error. Forms always display the phone number as a parallel contact path.

## Section 3 — Design System & Imagery

### Palette (Tailwind v4 `@theme` tokens)

- **Terracotta/clay** `#B4491F` family — the single action color (all CTAs, links, accents). Eye learns orange = action.
- **Warm sand/cream** `#FAF6F0` — section backgrounds.
- **Deep espresso-charcoal** `#221C18` — body text, footer, commercial band.
- **Muted sage** — small trust badges/checkmarks only.

### Type & craft

- Self-hosted font stacks only (system sans for body/UI; serif display stack for headlines). No external font requests.
- Subtle SVG paver-bond pattern texture in hero overlay and section dividers; soft warm card shadows; sturdy rounded corners; generous whitespace; mobile-first.

### Imagery system

- `lib/images.ts`: every slot (hero, 6 service cards, direct-materials, commercial hero, about) as `{ url, alt, fallbackTint }` pointing at Unsplash CDN URLs (patios, driveways, pool decks, hardscape).
- `components/SmartImage.tsx`: renders the URL; on load error swaps to a designed terracotta-gradient + paver-pattern card. The page never shows a broken image.
- Real photos later: edit `lib/images.ts` or drop files in `public/images/`.
- Sandbox cannot verify stock URLs load; README flags "visually check images on first deploy." Graceful degradation covers failures regardless.

### Accessibility

WCAG AA contrast on all text/CTA combinations; semantic landmarks; visible focus states; ARIA on chat widget and FAQ accordion.

## Section 4 — Tech Structure & Testing

### Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 (`@tailwindcss/postcss`) · Vitest · deployed on Vercel. No UI component library. `superpowers/` directory excluded from tsconfig/lint.

### File map

```
app/layout.tsx            root layout: fonts, metadata, JSON-LD, Header/Footer/StickyBar/ChatWidget
app/page.tsx              home landing page
app/commercial/page.tsx   commercial page
app/about/page.tsx        about/story page
app/sitemap.ts            sitemap
app/robots.ts             robots
app/api/chat/route.ts     AI assistant endpoint
app/api/lead/route.ts     lead email endpoint
components/               Header, Hero, QuoteForm, TrustBar, Services, DirectMaterials,
                          Process, CommercialTeaser, Testimonials, ServiceArea, Faq,
                          ContactSection, Footer, StickyMobileBar, ChatWidget, SmartImage,
                          PaverPattern (SVG texture)
lib/business.ts           ALL business facts (NAP, services, areas, FAQs, testimonial placeholders)
lib/images.ts             image slot registry
lib/ai.ts                 AI provider layer (env-driven)
lib/fallback-chat.ts      scripted responder
lib/leads.ts              lead validation + Resend delivery
tests/                    Vitest unit tests
```

### Environment variables (all optional — site fully works with none set)

| Var | Purpose | Default |
|-----|---------|---------|
| `AI_API_KEY` | AI provider key for chat | unset → scripted fallback |
| `AI_MODEL` | model id | `claude-haiku-4-5` |
| `AI_BASE_URL` | provider base URL | `https://api.anthropic.com` |
| `RESEND_API_KEY` | lead email delivery | unset → log-only |
| `LEAD_TO_EMAIL` | lead recipient | `paverworldofwesleychapel@gmail.com` |
| `LEAD_FROM_EMAIL` | lead sender | Resend onboarding sender |
| `NEXT_PUBLIC_SITE_URL` | canonical/OG URL | preview-safe default |

### SEO

Per-page metadata + OpenGraph; sitemap/robots; `LocalBusiness` (`HomeAndConstructionBusiness`) JSON-LD with NAP, geo, hours, service area on every page.

### Testing (TDD, Vitest)

Unit tests written test-first for the logic layer:
- `lib/leads.ts` — validation (accept/reject), email payload formatting, unconfigured-Resend behavior.
- `lib/fallback-chat.ts` — intent matching for each intent + default.
- `lib/ai.ts` — env-driven config resolution (defaults, overrides, key-missing signal).
- Chat route lead-marker extraction/stripping.

`npm run build` (type-check + static generation) is the integration gate. UI
components are exercised by the build's static rendering; no browser E2E in scope.

### Error handling summary

| Failure | Behavior |
|---------|----------|
| AI key missing/provider down/timeout | scripted fallback answers; widget never breaks |
| Resend unconfigured/down | lead logged, form still shows success + phone number |
| Stock image URL rots | SmartImage swaps to designed fallback card |
| Invalid lead input | 400 with field errors; form shows inline validation |

### Process

Implementation follows the Superpowers workflow: written plan (`writing-plans`),
task-by-task execution with review, verification before completion, work on
branch `claude/paver-world-modernize-ypogux`, pushed on completion. Placeholder
testimonials are explicitly marked for replacement with real reviews.

## Out of Scope (YAGNI)

- Per-service SEO subpages (future follow-up)
- CMS integration; content edits happen in `lib/business.ts`
- Online payment, scheduling/calendar integration
- Photo gallery / recent-work section (add once real job photos exist)
- Analytics wiring (slot documented in README; owner adds their tag)
- Browser E2E test suite
