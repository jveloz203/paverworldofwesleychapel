# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## Superpowers

This repo has the [Superpowers](https://github.com/obra/superpowers) plugin enabled via `.claude/settings.json` (`obra/superpowers-marketplace`). It ships composable skills that cover the full development lifecycle: brainstorming, planning, TDD, systematic debugging, code review, and finishing a branch. A vendored reference copy of the plugin lives in `superpowers/` for inspection; the live copy is installed by the plugin system.

### Best practices

- **Let skills trigger themselves.** `using-superpowers` bootstraps at session start and is what causes the other skills to auto-fire at the right moment (e.g. `brainstorming` before new feature work, `test-driven-development` before implementation code, `systematic-debugging` on any bug/test failure). Don't skip or talk yourself out of a skill because the task "feels simple."
- **Brainstorm before building.** For any new feature or non-trivial change, use `brainstorming` to nail down intent and a spec before writing code. Show the spec in digestible chunks and get sign-off before moving to planning.
- **Plan before implementing.** Use `writing-plans` to turn an approved spec into a step-by-step implementation plan explicit enough for a competent-but-context-free engineer to follow. Emphasize true red/green TDD, YAGNI, and DRY.
- **Red/green TDD.** Use `test-driven-development` — write a failing test, write the minimum code to pass it, refactor. Don't write implementation code before a failing test exists for it.
- **Debug systematically.** On any bug or unexpected behavior, use `systematic-debugging` before proposing a fix. Root-cause first; don't patch symptoms.
- **Use worktrees for isolation.** Use `using-git-worktrees` when starting feature work that needs to be isolated from the current workspace, especially before `executing-plans` or `subagent-driven-development`.
- **Verify before claiming done.** Use `verification-before-completion` before saying something is fixed, passing, or complete — run the actual verification commands and read their output. Evidence before assertions, always.
- **Request and receive review deliberately.** Use `requesting-code-review` when a feature is implemented and before merging. Use `receiving-code-review` when review feedback comes back — verify feedback technically rather than agreeing performatively.
- **Finish branches deliberately.** Use `finishing-a-development-branch` once implementation is complete and tests pass, to decide between merge, PR, or cleanup rather than leaving work dangling.
- **Parallelize independent work.** Use `dispatching-parallel-agents` (2+ independent tasks, no shared state) or `subagent-driven-development` (executing an implementation plan's independent tasks in-session) instead of serializing work that doesn't need to be serial.
- **Don't over-engineer.** No speculative abstractions, no unused flexibility, no half-finished implementations. A bug fix doesn't need surrounding cleanup; three similar lines beat a premature abstraction.

## Repository conventions

- This repo currently holds only the Superpowers plugin setup and its vendored reference copy — no application code yet. As real code is added, keep this file updated with build/test/lint commands and any project-specific conventions.
- Commit messages should explain *why*, not restate the diff.
- Prefer editing existing files over creating new ones; don't add documentation files unless asked.

## 🤖 Multi-Agent Orchestrator Loop

### 1. Fable 5/Opus 4.8 Planner/Auditor (The Architect)
- **Role**: High-level reasoning, scoping, plan approval, and final verification.
- **Responsibility**: Fable 5/Opus 4.8 evaluates the goal, drafts the master plan, and strictly defines stop/success conditions to stop Sonnet subagents from generating code and other tasks. This is in charge.

### 2. Sonnet 5 Minions (The Executors)
- **Role**: Routine extraction, web searching, document lookup, bulk transformations, code writing, or simple tasks.
- **Responsibility**: Sonnet 5 executes isolated, mechanical tasks in parallel. It returns compact findings, diffs, or results rather than dumping large files to save tokens.

### 3. The Continuous Execution Loop
This loop repeats until completion:
- **Discover**: Fable 5 reads the current codebase, user intent, overall objective, and formulates a thorough plan to make sure Sonnet 5 sub agents can achieve the objectives.
- **Delegate**: Fable 5 spins up Sonnet 5 subagents to execute specific, independent tasks. Unless other models are explicitly selected for sub-agents in the repository.
- **Verify**: The orchestrator reviews the subagent's output against the defined stop condition. If the check fails, Fable 5 documents the corrections and loops back to delegate fixes.
