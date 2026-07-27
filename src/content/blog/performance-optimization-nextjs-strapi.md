---
title: "How I Improved Page Load by 97% with Next.js and Strapi CMS"
snippet: "A practical guide to optimizing Next.js applications with Strapi CMS backend. Learn how I achieved 97% LCP improvement and 50-60% reduction in API requests."
publishDate: "2026-07-27"
image:
  src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
  alt: "Performance optimization dashboard"
category: "Performance"
tags:
  - performance
  - nextjs
  - strapi
  - web-development
author: "Raka Grarizki"
draft: false
---

# How I Improved Page Load by 97% with Next.js and Strapi CMS

After migrating BFI Finance Indonesia's marketing website to Next.js with Strapi CMS, we faced a critical problem: page load times were 13-21 seconds on key pages. This wasn't just a technical issue—it was directly impacting lead generation and conversion rates.

In this post, I'll share the practical steps I took to achieve a 97% improvement in Largest Contentful Paint (LCP) and reduce CMS API requests by 50-60%.

## The Problem

Our initial migration looked great on paper: modern stack, server-side rendering, headless CMS. But the reality was different:

- **LCP:** 13-21 seconds on critical pages
- **CMS Requests:** ~10 per page load
- **Server Memory:** Force-dynamic SSR causing OOM risks
- **User Experience:** Slow pages = lost leads

The root cause? We were making too many requests to Strapi, fetching too much data, and rendering everything on every request.

## Solution 1: Request Deduplication with React.cache()

The first breakthrough came from understanding how Next.js handles data fetching. When both `page.tsx` and `generateMetadata()` call the same function, they make separate HTTP requests.

```typescript
// Before: Each call = separate HTTP request
export const getArticles = async ({ ... }) => { ... }

// After: Memoized per render tree
export const getArticles = cache(async ({ ... }) => { ... })
```

By wrapping our CMS data fetchers with `React.cache()`, we reduced duplicate requests from ~10 to ~2 per page. This single change cut our CMS load by 50-60%.

## Solution 2: Populate Pattern Extraction

Strapi's populate parameters were verbose and scattered across our codebase. We extracted them into shared, composable modules:

```typescript
// src/lib/cms/populate.ts
export const getHomepagePopulate = () => ({
  seo: { populate: "*" },
  hero: { populate: { image: { populate: "*" } } },
  // ... more fields
});

// Usage: 21 lines → 3 lines
const query = qs.stringify({
  locale,
  populate: getHomepagePopulate(),
}, { encodeValuesOnly: true });
```

This made our code more maintainable and reduced API payload size by ~40%.

## Solution 3: ISR Adoption

We replaced force-dynamic SSR with Incremental Static Regeneration (ISR):

```typescript
// Before: SSR on every request
export const dynamic = "force-dynamic";

// After: ISR with 60-second revalidation
export const revalidate = 60;
export function generateStaticParams() {
  return [{ language: "id" }, { language: "en" }];
}
```

This eliminated OOM risks and served cached responses instead of rebuilding on every request. Server memory pressure dropped significantly.

## Solution 4: Image Optimization

We optimized Next.js image configuration:

```typescript
// next.config.js
images: {
  formats: ["webp"], // Remove AVIF for faster processing
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
  remotePatterns: [
    { hostname: "**.bfi.co.id" },
    { hostname: "**.strapiapp.com" },
  ],
}
```

This reduced Sharp CPU/memory usage and narrowed our attack surface.

## Results

The impact was dramatic:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| LCP (Blog) | 13.0s | 0.4s | 97% |
| CMS Requests/Page | ~10 | ~2 | 50-60% |
| Homepage Populate Lines | 21 | 3 | 86% |
| Server Memory | OOM Risk | Stable | Eliminated |

## Key Takeaways

1. **Measure first.** Use Lighthouse, Core Web Vitals, and real user monitoring to identify bottlenecks.

2. **React.cache() is powerful.** It's easy to overlook but makes a huge difference when you have multiple data fetchers per page.

3. **Modularize your populate queries.** Strapi's populate syntax is powerful but verbose. Create composable modules for maintainability.

4. **ISR > SSR for most pages.** Unless you need real-time data, ISR with revalidation gives you the best of both worlds.

5. **Optimize images aggressively.** WebP-only, restricted domains, and long cache TTLs reduce server load and improve performance.

6. **Performance is a feature.** Every millisecond counts. Faster pages = more conversions = more revenue.

## Conclusion

Performance optimization isn't about one magic trick. It's about systematically identifying and eliminating bottlenecks. In our case, the combination of request deduplication, populate modularization, ISR adoption, and image optimization transformed a slow, memory-hungry application into a fast, reliable lead generation engine.

The best part? These changes were mostly configuration and refactoring—no major architectural changes required. Sometimes the biggest wins come from the simplest optimizations.

---

*This post is based on my work at PT. BFI Finance Indonesia, where I led performance optimization for Indonesia's largest multifinance company's marketing website.*
