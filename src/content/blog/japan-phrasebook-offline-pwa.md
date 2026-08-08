---
draft: false
title: "Building Japan Phrasebook: An Offline-First PWA in React 19"
snippet: "A deep dive into the architecture of an offline Japanese phrasebook PWA — IndexedDB-backed favorites, lazy-loaded components, and a phrase data pipeline with native review tooling."
publishDate: "2026-08-08 10:00"
image:
  {
    src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Fushimi Inari torii gates in Kyoto",
  }
category: "Web Development"
author: "Raka Grarizki"
tags: [react, pwa, offline-first, typescript, vite]
---

When you land in Japan with a dead data plan, a phrasebook that needs a network connection is useless. That constraint drove every architectural decision in [Japan Phrasebook](https://github.com/grarizki/japan-phrasebook) — a mobile-first PWA that stores everything locally and works entirely offline.

## Why a PWA

A native app needs an app store review and eats disk space for a handful of phrases. A server-backed web app fails exactly when you need it — on a train without signal. A PWA sits in the middle: installable on Android and iOS, runs from cached assets, and keeps the entire dataset in the browser. No backend, no login, no data leaves the device.

## The stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | React 19 | Components for cards, forms, modals |
| Language | TypeScript | A phrase has a shape; enforce it |
| Bundler | Vite 8 | Fast HMR, easy PWA plugin |
| Styling | Tailwind CSS 4 | Mobile-first utility classes |
| Animation | Framer Motion | Spring transitions between tabs |
| Storage | localforage (IndexedDB) | Async, promise-based persistence |
| PWA | vite-plugin-pwa | Service worker + manifest in one plugin |

## Data model: three linked tables

The phrasebook is really three arrays: `categories` (Convenience Store, Restaurant, Shop), `conversations` (each phrase), and `translations` (kanji/kana plus romaji pronunciation). This normalization means a phrase can have multiple translations and every translation gets a pronunciation guide — the thing travelers actually read aloud.

```ts
{ id: "conv9", category_id: "cat4", context: "At a train station",
  content: "Where is platform 3?", timestamp: "..." }

{ conversation_id: "conv9",
  translation: "3番ホームはどこですか？",
  pronunciation: "San-ban hoomu wa doko desu ka?" }
```

## Storage: a plain async service layer

No state management library — the persistence layer is three small modules wrapping `localforage`:

- `storage.ts` — `get`, `set`, `remove` primitives
- `favorites.ts` — manages a `Set<string>` of favorited phrase IDs
- `userPhrases.ts` — CRUD for user-created phrases with auto-generated IDs

Hooks (`useFavorites`, `useUserPhrases`) wrap these services and expose them to components. The whole app state fits in two local stores; pulling in Redux or Zustand would have been pure overhead.

## Performance: lazy loading and code splitting

The two heaviest interactive pieces — the add-phrase form and the edit-phrase modal — are only needed when a user opens them, so they're loaded via `React.lazy`. Vendor libraries are split into separate cacheable chunks. Result: the initial bundle stays small, and because the app is a PWA, those chunks get cached by the service worker after first use.

## Data integrity: a check script as a build gate

A phrasebook with mistranslated Japanese is worse than none. Rather than rely on eyeballs, the build runs `scripts/check-data.mjs` which:

- verifies every conversation has a matching translation and category (`parity` check)
- flags malformed Japanese characters and inconsistent romaji syntax

Each translation also carries a `verified` flag with `verified_by`/`verified_at` metadata. Verified phrases show a ✓ badge; unverified ones stay hidden. The script can regenerate `docs/japanese-review.md`, a native-review checklist used to go through all 310 phrases by hand.

## The result

Install it, cache it once, and the whole phrasebook — favorites, user phrases, every translation — lives on the device. That's the entire point: offline isn't a fallback mode, it's the primary experience.

Try it live at [grarizki.github.io/japan-phrasebook](https://grarizki.github.io/japan-phrasebook/), or browse the source on [GitHub](https://github.com/grarizki/japan-phrasebook).
