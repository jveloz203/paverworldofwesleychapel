# paverworldofwesleychapel

## Superpowers

This repository uses [Superpowers](https://github.com/obra/superpowers), a software-development methodology for coding agents built on composable skills (TDD, systematic debugging, planning, code review, and more).

- `.claude/settings.json` — installs the Superpowers plugin for this repository: it registers the [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) and enables `superpowers@superpowers-marketplace`, so Claude Code loads the plugin (skills, session-start hook, and commands) automatically. On first use, Claude Code will ask you to trust the marketplace/plugin.
- `superpowers/` — a vendored snapshot of the upstream Superpowers repository (v6.1.1) for reference.
