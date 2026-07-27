<div align="center">

# grarizki

**Software Engineer** — Jakarta, Indonesia

[![Portfolio](https://img.shields.io/badge/Live-grarizki.github.io-10b981?style=flat-square&logo=googlechrome&logoColor=white)](https://grarizki.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-grarizki-0a66c2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/grarizki)
[![GitHub](https://img.shields.io/badge/GitHub-grarizki-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/grarizki)

Building high-performance web applications that drive business results.

</div>

---

## What I Build

| Domain | Stack | Impact |
|--------|-------|--------|
| **Web Applications** | Next.js, Astro, React, TypeScript | 97% LCP improvement, 50-60% API reduction |
| **AI Engineering** | FastAPI, OpenRouter, Tavily, agentic pipelines | Sentiment analysis, PRD generation, RAG |
| **Microservices** | NestJS, gRPC, WebSocket, Turborepo | Real-time analytics, event-driven architecture |
| **Mobile** | Flutter, Dart, Riverpod | Cross-platform, offline-first apps |

---

## Featured Projects

### StocksX — Indonesian Stock Market Platform
> Full-featured stock platform with real-time charts, broker activity, watchlist, and i18n.

**Stack:** Nuxt 4 · Vue 3 · TypeScript · Tailwind · Chart.js · Firebase Auth

[![GitHub](https://img.shields.io/badge/Code-181717?style=flat-square&logo=github)](https://github.com/grarizki/stocksX)
[![Live](https://img.shields.io/badge/Live-10b981?style=flat-square&logo=googlechrome)](https://stoxlyz.com)

---

### Stormlax — Real-time Analytics Microservice
> gRPC inter-service communication, WebSocket notifications, JWT auth, Astro + React 19 frontend.

**Stack:** NestJS · gRPC · Socket.IO · Astro · React 19 · Turborepo

[![GitHub](https://img.shields.io/badge/Code-181717?style=flat-square&logo=github)](https://github.com/grarizki/Stormlax)

---

### AI Engineer Monorepo — CLI-first ML Prototyping
> FastAPI backend with training pipeline, artifact tracking, benchmark runner, and Astro dashboard.

**Stack:** FastAPI · SQLAlchemy · Alembic · Typer · Astro · Docker

[![GitHub](https://img.shields.io/badge/Code-181717?style=flat-square&logo=github)](https://github.com/grarizki/template-monorepo-ai-engineer)

---

### Fasting Tracker — Cross-platform Mobile App
> Intermittent fasting app with animated timer, configurable schedules, local notifications, offline-first storage.

**Stack:** Flutter · Dart · Riverpod · sqflite · go_router

[![GitHub](https://img.shields.io/badge/Code-181717?style=flat-square&logo=github)](https://github.com/grarizki/intermittenApp)

---

### Sobi Sentiment — AI Product Analyzer
> Agentic pipeline: Tavily scrapes reviews, OpenRouter LLM returns rating, sentiment breakdown, pros/cons.

**Stack:** FastAPI · Tavily · OpenRouter · anime.js · Tailwind

[![GitHub](https://img.shields.io/badge/Code-181717?style=flat-square&logo=github)](https://github.com/grarizki/agentic-toko-oren)

---

### Product Discovery AI — PRD Generator
> AI-facilitated interview guiding through 10 product categories, outputting a complete PRD draft.

**Stack:** FastAPI · OpenRouter · Jinja2 · uv

[![GitHub](https://img.shields.io/badge/Code-181717?style=flat-square&logo=github)](https://github.com/grarizki/assignment-3-devscale)

---

## This Portfolio

Built with Astro and Tailwind CSS. Zero JavaScript by default. Dark/light theme. Fully accessible.

### Tech

| Layer | Tool |
|-------|------|
| Framework | [Astro](https://astro.build) 4.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) 3.x |
| Typography | Bricolage Grotesque + Inter (variable) |
| Icons | Iconify (Simple Icons, Tabler) |
| SEO | astro-seo, JSON-LD structured data |
| Deploy | GitHub Pages via GitHub Actions |

### Features

- Responsive design (mobile-first)
- Dark mode with system preference detection
- Reading progress bar on blog posts
- Skip-to-content link for keyboard navigation
- WCAG AA contrast compliance
- View Transitions for smooth page navigation
- Lazy-loaded blog images
- Preconnected external resources
- `.nojekyll` for Astro-native deployment

### Structure

```
src/
├── components/
│   ├── AboutSection.astro      # Bio, tech stack, stats
│   ├── BlogSection.astro       # Latest posts preview
│   ├── hero.astro              # Landing hero
│   ├── ProjectsSection.astro   # Featured projects grid
│   ├── WorkSection.astro       # Work experience
│   ├── navbar/
│   │   └── navbar.astro        # Nav + theme toggle
│   └── footer.astro
├── content/
│   └── blog/                   # Markdown blog posts
├── layouts/
│   ├── Layout.astro            # Base layout (SEO, fonts, theme)
│   └── BlogLayout.astro        # Blog post layout (progress bar)
└── pages/
    ├── index.astro             # Homepage
    ├── blog.astro              # Blog listing
    └── blog/[...slug].astro    # Dynamic blog posts
```

### Run Locally

```bash
git clone https://github.com/grarizki/grarizki.github.io.git
cd grarizki.github.io
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

### Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Contact

- **Email:** raka.grarizki@gmail.com
- **LinkedIn:** [linkedin.com/in/grarizki](https://www.linkedin.com/in/grarizki)
- **GitHub:** [github.com/grarizki](https://github.com/grarizki)

---

<div align="center">

![Built with Astro](https://astro.badg.es/v1/built-with-astro.svg)

</div>
