# Session Handoff — Paver World Website Modernization

**For:** Fable 5 (orchestrator), resuming on branch `claude/paver-world-modernize-ypogux`
**Status:** Design + plan APPROVED and committed. **Execution NOT started — wait for the human partner to say "Implement".**

## The request

Modernize https://www.paverworldofwesleychapel.com modeled on the feature set of
https://lead-surge-electric.vercel.app (contractor lead-gen landing page with AI assistant).
Design must be psychologically attractive to Wesley Chapel / Tampa / Central Florida visitors,
convert homeowners, present trusted high-value commercial capability, and showcase
factory-direct material buying as the efficiency/value story.

## Workflow (mandatory)

This repo uses the Superpowers workflow (see `CLAUDE.md` + vendored skills in `superpowers/skills/`).
The plugin is not installed as invocable skills in the remote session — read and follow the
SKILL.md files directly. So far followed: using-superpowers → brainstorming (full question loop,
design approved section-by-section) → spec → writing-plans. Remaining: subagent-driven-development
(per CLAUDE.md orchestrator loop: Fable 5 plans/reviews, cheap-model minions execute) →
per-task review → verification-before-completion → requesting-code-review (final whole-branch)
→ push to the designated branch (`git push -u origin claude/paver-world-modernize-ypogux`).

**Note:** The human partner cannot always see plain chat text — deliver questions/status via
AskUserQuestion (embed content in the question text) and files via SendUserFile.

## Key documents (committed)

1. **Spec (approved):** `docs/superpowers/specs/2026-07-04-paver-world-modernize-design.md`
2. **Plan (approved for subagent-driven execution):** `docs/superpowers/plans/2026-07-04-paver-world-site.md`
   — 17 tasks, complete code in every step, TDD for the whole logic layer.

## Decisions locked with the human partner

1. Scope: conversion landing page + `/commercial` + `/about` (Next.js 15 App Router + TS + Tailwind v4 + Vitest; Approach A approved).
2. Leads: `POST /api/lead` → Resend email (`RESEND_API_KEY`, `LEAD_TO_EMAIL`); unconfigured → log + `delivered:false`, forms never error.
3. AI assistant: `POST /api/chat` via generic `AI_API_KEY` + `AI_MODEL` (default `claude-haiku-4-5`) + `AI_BASE_URL` (default Anthropic) so models swap via env only; scripted fallback (`lib/fallback-chat.ts`) when key missing or provider fails; `[LEAD]{json}[/LEAD]` marker protocol captures chat leads into the same pipeline.
4. Imagery: Unsplash CDN stock URLs in `lib/images.ts`; `SmartImage` renders designed clay-gradient fallback on error; owner swaps in real photos later. Sandbox may not verify URLs — flag for visual check on deploy (README covers this).
5. Deploy: Vercel, preview domain for now; canonical URL via `NEXT_PUBLIC_SITE_URL`.
6. Visual: "warm craftsman earth" — clay #B4491F single action color, sand #FAF6F0, espresso #221C18, sage badges; self-hosted font stacks only.
7. Testimonials ship as clearly-marked placeholders — never fabricate attributed reviews.
8. Years in business COMPUTED from 2006, never hardcoded.

## Environment facts

- Remote ephemeral container; work in place on the designated branch (no worktree — harness owns workspace).
- Network policy blocks the old site, the reference site, and general web hosts; npm registry works. Business facts were gathered via WebSearch and are embedded in the spec/plan (phone (813) 994-8805, 30141 State Road 54 Wesley Chapel FL 33543, founded 2006 by Paver Pete & Catherine, Mon–Fri 9–5).
- No `gh` CLI — use GitHub MCP tools. Do NOT create a PR unless asked.
- Repo before execution: only Superpowers setup + docs; no app code. `npm install` artifacts were removed to honor the brainstorming hard gate.

## Execution instructions (when the human partner says "Implement")

Follow `superpowers/skills/subagent-driven-development/SKILL.md` exactly:
read the plan once, create todos + progress ledger (`.superpowers/sdd/progress.md`),
then per task: record BASE commit → task-brief → dispatch implementer (cheap model —
plan code is transcription+testing; standard model for multi-file integration tasks) →
review-package → task reviewer → fix loop → ledger. Tasks are sequential (1→17; UI tasks
build on the logic layer). Final whole-branch review on the most capable model, then
verification (Task 17: vitest, build, route smoke tests) and push.
