---
draft: false
title: "gh-opportunities: A Rust Tool That Finds Your Next Open-Source PR"
snippet: "I built gh-opportunities, a Rust CLI + TUI that ranks GitHub repos by contribution opportunity — scoring good-first issues, staleness, README health, and code quality — so landing your first open-source PR takes minutes, not an afternoon of hunting."
publishDate: "2026-02-01 10:00"
image:
  {
    src: "https://images.unsplash.com/photo-1561470508-fd4df1ed90b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Rust code on a terminal",
  }
category: "Rust"
author: "Raka Grarizki"
tags: [rust, open-source, cli, ratatui, github]
---

Finding a good open-source contribution is a slow, manual chore. You open a repo, hunt for `good first issue` labels, guess whether a PR has been ignored for weeks, and read a README to judge if the maintainers will even reply. Most people quit before they click "New pull request."

I wrote **gh-opportunities** to automate exactly that research. It is a Rust CLI that scans GitHub repositories, scores them on several signals, and hands back a ranked list you can act on in minutes — from the terminal, a script, or an AI agent.

## Beyond "find easy issues"

The naive approach looks for the `good first issue` label and stops there. An easy label is worthless if the issue is stale, the README is empty, or nobody running the project is going to review your diff.

So `gh-opportunities` scores repos on four signals:

- **Good-first-issue quality** — labeled, well-described, unassigned
- **Staleness** — issues and PRs waiting too long for attention
- **README & community health** — `CONTRIBUTING.md`, code of conduct, license, issue templates
- **Code quality** — TODO/FIXME density, CI, lint config, test coverage

The composite score tells you *where you will make the most difference*, not just where something is marked easy. A repo with a strong community but a few discoverable gaps ranks higher than a hot repo where issues rot unread.

## The feature set

```bash
# Score good first issues in a repo
gh-opportunities scan serde-rs/serde

# Discover high-opportunity Rust repos
gh-opportunities discover --lang rust --min-stars 100

# Find issues nobody's touched in 30+ days
gh-opportunities stale tokio-rs/tokio

# Watch it all in the interactive TUI
gh-opportunities tui rust-lang/rust tokio-rs/tokio denoland/deno
```

Beyond the basics it ships some fun toys:

- **SQLite cache** — cut redundant API calls and stay clear of rate limits
- **AI analysis** — OpenAI/Anthropic summarize, recommend, and rate difficulty per issue
- **Security gate** — CVE, secret, license, and quality checks that install as a pre-push hook
- **HTTP server** — expose the whole tool to AI agents over a bearer-authenticated `axum` server

## What I learned building it

It is my first serious Rust UI, and the stack is a great workout for the ecosystem:

| Layer | Crate |
|-------|-------|
| CLI | `clap` (derive) |
| TUI | `ratatui` + `crossterm` |
| Async | `tokio` |
| HTTP client/server | `reqwest` + `axum` |
| Cache | `rusqlite` |

Two lessons stood out. First, modules as clean seams: the `ai/` layer is a trait you can swap providers on, and `security/` is additive without touching callers. Second, tests first — the codebase carries 109 passing tests, and each module owns its own.

A genuinely useful effect: the project is itself the best recruiting tool for contributors. It builds issue ranking, so the contribution loop it searches for is the loop it lives in — pick an issue, run `cargo test`, and open your first PR.

Try it — `cargo install --path .`, then `gh-opportunities scan` your favorite dependency.