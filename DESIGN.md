# Design System: Vanguard Editorial Systems Architect

## 1. Visual Theme & Atmosphere
The interface projects the quiet confidence of an architecture firm monograph combined with the precision of high-reliability software. The density stays balanced at index 5, prioritizing macro-whitespace and legible typographic hierarchies over visual clutter. 

The layout variance operates at index 8, replacing standard three-column rows with asymmetrical bento cards, offset numbers, and editorial splits. Motion choreographs smoothly at index 7 using mass-weighted spring transitions and cubic-bezier curves rather than linear timing. The aesthetic relies on Deep Obsidian bases, hairline boundaries, and single-source emerald accents.

## 2. Color Palette & Roles

The color system enforces strict contrast ratios across dark and light surfaces.

- **Deep Obsidian** (`#09090B`) — Primary dark background canvas
- **Noir Core** (`#050505`) — Inner core surface for double-bezel cards
- **Pure Canvas** (`#FFFFFF`) — Light mode background surface
- **Alabaster Core** (`#F4F4F5`) — Light mode inner core fill
- **Zinc Hairline** (`rgba(255, 255, 255, 0.08)`) — Outer shell borders on dark surfaces
- **Light Border** (`rgba(0, 0, 0, 0.08)`) — Outer shell borders on light surfaces
- **Emerald Luminescence** (`#10B981`) — Singular active accent for status indicators and focus states
- **Primary Ink** (`#F4F4F5` dark / `#18181B` light) — High-contrast headlines and values
- **Muted Slate** (`#A1A1AA` dark / `#52525B` light) — Secondary descriptions and metadata

No secondary accent colors exist. Neon glows, purple gradients, and pure black (`#000000`) fills are forbidden.

## 3. Typography Rules

Typography establishes hierarchy through weight, tracking, and optical scale rather than sheer font size.

- **Display & Section Headers:** Plus Jakarta Sans or Bricolage Grotesque. Tight tracking (`tracking-tight`), strict line height (`leading-tight`), bold weight (`font-bold`).
- **Body Copy:** Plus Jakarta Sans or Inter Variable. Maximum line width 65 characters (`max-w-2xl`). Line height stays relaxed (`leading-relaxed`).
- **Monospace Metadata:** JetBrains Mono or Geist Mono. Applied to all index numbers (`01`, `02`), eyebrow tags, metric labels, and timestamps.
- **Banned Typography:** Generic system fonts (Arial, Roboto, Helvetica) and decorative scripts are excluded.

## 4. Component Stylings

### Double-Bezel Card Architecture (Doppelrand)
Cards never sit flat on the canvas. Every card implements a two-layer nested hardware enclosure:
- **Outer Shell:** Background `bg-white/[0.03]`, outer radius `rounded-[2rem]`, padding `p-2`, boundary `border border-white/[0.08]`.
- **Inner Core:** Background `bg-zinc-900/60`, inner radius `rounded-[calc(2rem-0.5rem)]`, inner highlight `shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]`, internal padding `p-6 md:p-8`.

### Button-in-Button CTA Architecture
Primary interactive links employ a nested trailing wrapper:
- Outer button body: Fully rounded pill (`rounded-full`), generous lateral padding (`px-6 py-3`).
- Trailing arrow container: Distinct circular enclosure (`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center`).
- Hover physics: The circular enclosure shifts diagonally (`group-hover:translate-x-1 group-hover:-translate-y-0.5`) while the main pill settles slightly (`active:scale-[0.98]`).

### Eyebrow Pill Indicators
Headlines follow microscopic pill badges:
- Shape: Fully rounded (`rounded-full`).
- Padding: `px-3 py-1`.
- Typography: `font-mono text-[10px] uppercase tracking-[0.2em] font-semibold`.
- Colors: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`.

## 5. Layout Principles

Layouts avoid symmetrical Bootstrap grids. Whitespace serves as an active structural element.

- **Macro-Whitespace:** Major vertical section gaps use `py-24` to `py-36`.
- **Asymmetrical Bento:** Hero sections split into an 8-column narrative block and a 4-column profile enclosure. Feature zones use varied card spans (`col-span-8` beside stacked `col-span-4` cards).
- **Mobile Collapse:** Viewports below `768px` collapse to a single column (`grid-cols-1`) with `w-full` width and `px-4` padding.
- **Viewport Protection:** Full-height sections use `min-h-[100dvh]` to prevent viewport jumping on mobile browsers.

## 6. Motion & Interaction

Transitions simulate physical mass and friction. Linear transitions are banned.

- **Transition Easing:** `cubic-bezier(0.32, 0.72, 0, 1)` across all state shifts.
- **Duration Scale:** Micro-interactions run 300ms. Card state transitions run 500ms. Section entrances run 800ms.
- **Hardware Acceleration:** Animations alter only `transform` and `opacity`. Mutating layout dimensions (`width`, `height`, `top`) is forbidden.
- **Backdrop Blur Boundaries:** Blur filters apply only to fixed navigation containers. Scrolling content blocks avoid continuous GPU repaints.

## 7. Forbidden Patterns (Anti-Patterns)

The following anti-patterns invalidate the design system:

- No emojis in headings, badges, or buttons.
- No generic gray 1px borders (`border-gray-200` without opacity styling).
- No harsh dark drop shadows (`rgba(0, 0, 0, 0.4)`).
- No multi-colored neon gradient fills or glowing text.
- No naked arrow icons beside button text without the circular wrapper.
- No symmetrical three-column cards lacking nested bezel geometry.
- No filler copy ("Scroll down to explore", "Seamless experience", "Next-gen solutions").
- No ungrounded statistics lacking real application context.
