---
draft: false
title: "Best Japanese Food: 3,482 Tabelog-Rated Restaurants as Static Vue Apps"
snippet: "How five zero-fetch Vue apps — restaurants, budget eats, bakeries, top-100 — ship a 480 kB dataset with Effect Schema validation, SSR prerendering, and a service worker, all on GitHub Pages."
publishDate: "2026-08-10 10:00"
image:
  {
    src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75",
    alt: "Sushi platter with chopsticks",
  }
category: "Data Engineering"
author: "Raka Grarizki"
tags: [effect, vue, vite, monorepo, pwa, data-engineering]
---

Finding a genuinely good restaurant in Japan is a locals' game: a place can be walking distance from a tourist hotspot and still never show up in English guides. [best-japanese-food](https://github.com/grarizki/best-japanese-food) puts the dataset that locals actually use — Tabelog ratings — in front of travelers, as five static Vue apps deployed to GitHub Pages.

## Five apps, one dataset

Each app serves a slice of the [japan-food-dataset](https://github.com/grarizki/japan-food-dataset), bundled at build time:

| App | Path | Records |
|---|---|---|
| Restaurants | `/restaurants/` | 3,482 |
| Budget Eats | `/budget/` | 2,991 |
| Budget Meat (no pork) | `/budget-meat/` | 2,847 |
| Bakeries | `/bakeries/` | 19 |
| Most Recommended | `/top-100/` | 166 sections |

Every restaurant carries a Tabelog score, and the copy makes the scale legible: in Japan a 3.5 is very good, a 4.0 is legend.

## BFF, built at build time

Backend-for-frontend usually means one tailored API per client. These five apps run the same pattern with no server: each bundles a curated slice of the same dataset — 3,482, 2,991, 2,847, 19, and 166 sections — shaped at build time by `build-data.ts`. One dataset, five tailor-made "backends," baked into static files instead of served. The tradeoff is zero runtime fetches in exchange for no live data.

## The Effect pipeline: validate or fail the build

A restaurant list with a corrupted price field is worse than no list, so the data path is a typed build gate. `scripts/build-data.ts` reads the raw `japan-food-dataset` JSON live, decodes every record with Effect Schema, prunes crawler-only fields, and emits one typed JSON file per app. A schema mismatch aborts the build — bad data never ships.

```ts
const restaurants = readJson('japan_restaurants.json').pipe(
  Effect.map((raw: unknown) => (Array.isArray(raw) ? raw : []).map((r) => normalizeRecord(r as Record<string, unknown>))),
  Effect.map(decodeRecords),
)
```

The same Effect philosophy extends to the frontend: app state lives in an Effect `SubscriptionRef` (an observable ref with a changes stream) that Vue components mirror. No Redux, no Pinia.

## Performance without a backend

GitHub Pages can't run server code, which turns out to be the right constraint:

- **Zero runtime fetches** — data is bundled at build time; the ~480 kB gzip dataset is the price of never hitting a network.
- **Prerendered first page** — `@vue/server-renderer` renders the first page of cards to HTML during the build.
- **Inline CSS** — the build strips the stylesheet link and injects CSS into a `<style>` tag, killing the render-blocking request.
- **Service worker** — GitHub Pages forces 10-minute cache headers, so a per-app service worker serving content-hashed assets is what makes repeat visits instant. When new asset hashes ship, `CACHE_NAME` in each `sw.js` is bumped to purge stale cache.

## What's next

A static site is the right call today — a runtime API would only slow the frontend down. The roadmap in `TODO.md` keeps that in mind: a separate Hono + Effect API on Cloudflare Workers — the same BFF, as a runtime service — to expose the dataset as JSON endpoints, and a re-crawl pipeline for live refresh.

Browse the five apps live at [grarizki.github.io/best-japanese-food](https://grarizki.github.io/best-japanese-food/), or the source on [GitHub](https://github.com/grarizki/best-japanese-food).
