# Dhanes Portfolio — Design System
> Blueprint scratched into obsidian, signed with a portrait. Hairlines carve the page out of near-black, type does the talking at weight 400, and small blueprint-blue marks point the way.

**Theme:** dark by default, with a light toggle.
**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · Motion (`motion/react`) · embla-carousel-react · lucide-react.
**Companion doc:** [`docs/redesign-brief.md`](docs/redesign-brief.md) covers **what** goes on the page (content, sections, backend). This file covers **how it looks**. If the two conflict on visuals, this file wins.

## Lineage

This system blends five references. Each one contributes something specific:

| Source | What we take |
|---|---|
| **Hyperstudio** (Refero style) | The visual language: near-black canvas, 1px hairline structure, weight-400 display type with negative tracking, no shadows, white pill for primary actions, outlined icons, a pulse-green dot for live status, slow editorial section rhythm. |
| **farrel.me** | Content density and proof. Projects in a horizontal **carousel** of cards, small status badges (NEW / LIVE), outcome-driven one-liners, a compact Achievements list (title · issuer · year). |
| **newminds.studio** | The **liquid glass** layer: a floating pill header, frosted panels (blur + saturate, translucent fill, hairline border, a bright inset highlight on the top edge, soft deep shadow), and light that reacts to the cursor. |
| **velmax.llc** ("What's going on the shelf") | Originally the 3D ring for Beyond Tech; **replaced** by three auto-scrolling photo columns (see Beyond Tech Columns). |
| **wisee.info** | Structure and personality. Sticky header with anchor links, hero with two CTAs and a portrait, grouped tech stack, **numbered** experience timeline, a personal photo gallery with one-word captions, light/dark toggle. |

**Where we break from Hyperstudio, on purpose:**
- **Photography is allowed in three places only:** the hero portrait, project screenshots, and the Beyond Tech gallery. It always gets a disciplined treatment (fade mask, hairline frame, grayscale).
- **There's one personal accent, Blueprint Blue** (`#4a7be3` dark / `#1e47b8` light). It replaces Hyperstudio's dim Compass Gold, but follows the same rule: it marks things, it never fills them. Neutrals are tilted slightly cool (navy-black) to sit with it.
- **The page has a quiet backdrop** (blueprint grid + slow blue glow + grain) instead of a flat canvas, and a **light that follows the cursor**. See *Backdrop*.
- **Floating surfaces are liquid glass** (from newminds): header, tool grid, experience side panel, contact form, buttons and badges. Glass gets a 20px radius and a soft shadow; everything else keeps Hyperstudio's flat hairline rules.
- **A light theme exists.** Every token has a light value.
- **The header is sticky.**

---

## Tokens — Colors

Components use **semantic tokens** only (`bg-canvas`, `text-fg`, `text-muted`, `border-line`…). Never hardcode hex in components. The main text color is called `fg`, not `text`, so it doesn't collide with Tailwind's `--text-*` font-size namespace.

| Token | Dark (default) | Light | Role |
|---|---|---|---|
| `--canvas` | `#0b0d12` Navy Obsidian | `#f4f6f9` Paper | Page background. Never changes between sections. |
| `--carbon` | `#07080c` | `#ffffff` | Deepest surface: form inputs, image wells. |
| `--raised` | `#131721` | `#ffffff` | Status badges, the only "filled" small surfaces. |
| `--fg` | `#eef1f6` Chalk | `#10131a` Ink | Headings, primary text, active nav. |
| `--muted` | `#969db0` Smoke | `#5c6475` | Body copy, descriptions, labels, captions. |
| `--line` | `#1c2130` Graphite | `#e0e4eb` | **The** structural 1px line: dividers, frames, tags. |
| `--line-strong` | `#3a4358` Iron | `#c3c9d4` | Hover borders, input borders, dot-field dots. |
| `--accent` | `#4a7be3` Blueprint Blue | `#1e47b8` | Compass marks: icon strokes, section index numbers, active-nav dot, archive hover arrow, the hero nickname, open-state borders, backdrop tint. |
| `--live` | `#98ff38` Pulse | `#3a9d0b` | Live/available dot **only** (6px). Never text. |
| `--danger` | `#ff7a6b` | `#b42318` | Form error text and error border **only**. |
| `--action-bg` | `#ffffff` Signal White | `#10131a` | Primary pill button fill. |
| `--action-fg` | `#0b0d12` | `#ffffff` | Primary pill button text. |
| `--overlay` | `rgb(7 8 12 / 0.92)` | `rgb(244 246 249 / 0.92)` | Mobile menu backdrop. |
| `--glass-fill` | `rgb(13 16 24 / 0.58)` | `rgb(255 255 255 / 0.55)` | Translucent fill of glass surfaces. |
| `--glass-border` | `rgb(255 255 255 / 0.10)` | `rgb(16 19 26 / 0.09)` | 1px edge of glass surfaces. |
| `--glass-highlight` | `rgb(255 255 255 / 0.09)` | `rgb(255 255 255 / 0.85)` | Inset 1px highlight on the top edge (the "wet" look). |
| `--glass-shadow` | `0 18px 70px -24px rgb(0 0 0 / .65)` | `0 18px 60px -28px rgb(16 19 26 / .28)` | Soft lift under glass. |
| `--mx` / `--my` | cursor position (px) | — | Written by `PointerTracker` **on `#backdrop` only** (never on `<html>` — that forces a style recalc of the whole page every frame); default `50vw 18vh`. |

Contrast is checked: `--muted` on `--canvas` is ≈7.2:1 in dark and ≈5.3:1 in light; `--accent` passes 4.5:1 for small numerals in both themes (≈4.8:1 dark, ≈7.3:1 light).

---

## Tokens — Typography

### Schibsted Grotesk: primary, for everything · `--font-sans`
- A grotesk with newsroom roots. It reads professional at weight 400 and has enough character in its shapes that it doesn't feel like a template.
- **Weights loaded:** 400, 500
- **Signature rule:** headings are **400**. Hierarchy comes from size and tracking, never bold. 500 is allowed only on text ≤14px where 400 looks thin (buttons, nav).
- Load via `next/font/google` → variable `--font-schibsted`.

### IBM Plex Mono: meta and labels · `--font-mono`
- For section indices, dates, categories, tags, badges, form labels, footer meta. It plays the role of Hyperstudio's *Input*.
- **Weights loaded:** 400, 500
- Uppercase labels: `letter-spacing: 0.04em`. Lowercase mono (terminal lines, dates): default tracking.
- Load via `next/font/google` → variable `--font-plex-mono`.

**Banned fonts** (overused in templates and AI output): Inter, Geist, Space Grotesk, JetBrains Mono, Instrument Serif, Poppins.

### Type scale

| Role | Family | Size desktop / mobile | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display-xl` | sans 400 | 160 / 96px | 0.9 | -0.04em | 404 code only |
| `display` | sans 400 | 64 / 40px | 1.02 | -0.03em | Hero name |
| `heading-lg` | sans 400 | 44 / 32px | 1.05 | -0.02em | Section titles |
| `heading` | sans 400 | 34 / 28px | 1.1 | -0.015em | Contact headline, manifesto title |
| `heading-sm` | sans 400 | 23 / 20px | 1.2 | -0.01em | Project card titles, role titles |
| `subheading` | sans 400 | 20 / 18px | 1.4 | -0.005em | Hero tagline (in `--muted`) |
| `body` | sans 400 | 16px | 1.6 | 0 | Paragraphs |
| `body-sm` | sans 400 | 14px | 1.55 | 0 | Card descriptions, bullets |
| `label` | mono 400 | 12px | 1.4 | 0.04em, UPPERCASE | Section index, meta, tags, form labels |
| `micro` | mono 400 | 11px | 1.4 | 0.04em, UPPERCASE | Badges on photos, footer fine print |

Use `clamp()` for `display`, `display-xl` and `heading-lg` so they scale smoothly between mobile and desktop. Max text measure is **640px**.

---

## Tokens — Spacing, Shape, Layout

**Base unit:** 4px. **Density:** comfortable, editorial.

| Scale | 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96 · 128 · 160 |
|---|---|

| Element | Value |
|---|---|
| Tags, badges, caption chips | `4px` radius |
| Cards, image frames, inputs | `8px` radius (`rounded-card`) |
| Glass panels (tool grid, side panel, form) | `20px` radius (`rounded-glass`) |
| Header, all buttons, badges, kind tags | `9999px` (pill / circle) |
| Content max-width | `1200px`, centered |
| Text measure | `640px` max |
| Page gutter | 24px desktop · 20px tablet · 16px mobile |
| Section padding (vertical) | 160px desktop · 112px tablet · 80px mobile |
| Card / frame padding | 32px desktop · 24px mobile |
| Element gap | 20–24px |
| Header | 56px pill, floating 12px from the top |

Grid: 12 columns, 24px gap on desktop. Breakpoints follow Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).

---

## Elevation & Surfaces

Two kinds of surface:
1. **Flat (Hyperstudio):** sections, timeline rows, archive rows, project images. No fill, no shadow; structure is 1px `--line` rules. **The line is the layout.**
2. **Liquid glass (newminds):** surfaces that float above the page. `glass` utility = translucent `--glass-fill` + `backdrop-filter: blur(18px) saturate(1.5)` + 1px `--glass-border` + inset top highlight `--glass-highlight` + `--glass-shadow`. `glass-chip` is the lighter version for buttons, badges and tags: same fill, border and highlight, **no backdrop blur and no shadow** (see Performance rules).

The page background never changes between sections (the Backdrop is fixed to the viewport, not to sections). Only glass casts a shadow.

---

## Performance rules

Measured on the production build (1440×900): moving the cursor used to drop to ~15 fps because `--mx/--my` lived on `<html>` and glass panels had a cursor sheen with `background-attachment: fixed`. After the fixes below it holds ~55 fps.

- Write per-frame CSS variables on the smallest element that needs them (`#backdrop`), never on `<html>`/`<body>`.
- `backdrop-filter` only on a handful of large floating surfaces (header, tool grid, side panel, form). Small elements use `glass-chip` (no blur).
- No `background-attachment: fixed` and no `mix-blend-mode` on full-screen layers.
- Long-running animations only on `transform`/`opacity` of layers marked `will-change: transform`.
- Continuous motion (the photo columns) is a CSS `transform` animation, not JavaScript.

## Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Color and border changes on hover |
| `--duration-base` | 300ms | Theme switch, menu open, icon nudges |
| `--duration-slow` | 600ms | Scroll reveals, image color transitions |
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything |

- **Reveal:** `opacity 0 → 1`, `y 12px → 0`, staggered 80ms, once per element (Motion `whileInView`, `viewport={{ once: true, amount: 0.2 }}`).
- **Hover:** color and border shifts, image `scale(1.03)`, arrow glyph nudge 2px. Nothing jumps.
- **Allowed loops:** the pulse on the `--live` dot, the Backdrop glows drifting over 26–34s, and the Beyond Tech photo columns' slow scroll (pauses on hover or with the Pause button).
- **Cursor light:** `PointerTracker` eases `--mx/--my` toward the pointer (18% per frame, stops when settled). Reduced motion → it jumps without easing.
- **One-time flourish:** the hero nickname highlight (see Hero).
- **Not allowed:** parallax, custom cursors, scroll-jacking, typing effects, marquees that can't be paused.
- `prefers-reduced-motion: reduce` disables reveals, image scale, the pulse and the photo columns. Color transitions stay.

---

## Iconography

- **lucide-react**, stroke width **1.5**, sizes 16 / 20 / 24px.
- **Compass marks** (decorative: tool-group icons, achievement icon) are stroked in `--accent`.
- **Functional icons** (arrows, theme toggle, close, copy) use `--fg` or `--muted`.
- **Tech logos** (react-icons) are **monochrome** `--muted`, turning `--fg` on hover. Never brand colors.
- Arrow glyphs: `↗` for external links, `↓` for downloads, `→` for internal navigation.

---

## Imagery

Photography only appears in the three places listed under Lineage, and always with one of these treatments:

| Where | Treatment |
|---|---|
| **Hero portrait** | `profile.jpg`, **natural color** lightly muted (`saturate(0.9) contrast(1.04) brightness(0.97)`), cropped to head & shoulders (`scale(1.18)`, origin top). Sits in a **framed card**: 4:5, 28px radius, 1px `--line` border, `--carbon` well. Bottom **fade mask** (variant A, from 58%) dissolves the photo *and* its frame into the page. Dot field behind. **No glow, no grayscale.** |
| **Project screenshots** | Full color, 16:10, inside an 8px-radius frame with a 1px `--line` border on a `--carbon` well. |
| **Beyond Tech columns** | Full color, landscape **3:2** (pre-cropped to 1200×800 so every photo matches), `object-cover` inside an 8px-radius frame. |

Always use `next/image` with an accurate `alt` and correct `sizes`. The hero portrait gets `preload` (`priority` is deprecated in Next.js 16).

---

## Components

### Top Navigation (floating glass pill)
**Role:** Persistent header with wordmark, anchors, theme toggle, CTA.

`fixed`, 12px from the top, inside the 1200px column: a 56px-tall **`glass` pill** (`rounded-full`), 20px left padding, 8px right. Always glass (no scroll state).
- **Left:** the **DMD monogram** (Logo, 22px tall), linking to the top; `aria-label` carries the full name.
- **Center (≥1024px):** ABOUT · PROJECTS · EXPERIENCE · BEYOND TECH · CONTACT, in mono `label` `--muted`, 24px gaps. Hover → `--fg`. **Active section:** `--fg` with a 4px `--accent` dot before the label (uses `hooks/useActiveSection.ts`).
- **Right:** **View Toggle** (Full / Compact, ≥640px) + theme toggle (Icon Button) + **filled** pill "LET'S CONNECT" (`--action-bg` / `--action-fg`, mono 12px uppercase, 10px 16px; ≥768px).
- **Mobile (<1024px):** wordmark + toggle + menu Icon Button. The menu is a full-screen `--overlay` with blur *behind* the pill (`-z-10`, 80px top padding), links stacked at `heading` size, staggered in, then a "LAYOUT" row with the View Toggle. Esc closes it and page scroll is locked while open.
- Links follow the active view: Full → `#about`…, Compact → `#c-about`…; "Beyond Tech" (`inCompact: false`) is hidden in Compact.

### Logo (ᗡMD monogram)
**Role:** the brand mark in the header and the browser tab.

- **Form:** the initials **ᗡ M D** drawn as one monoline (stroke 3 on a 64×24 grid, round caps and joins). The **first D is mirrored**, so the mark is symmetric around the M. The D bowls are half-circles; the M has a centered V. Both Ds use `currentColor` (`--fg`); **the M is `--accent`** — the single colored note that makes it catch the eye.
- **Motion:** on load each stroke draws in once (`pathLength=1`, dash offset 1 → 0, 0.9s, staggered D → M → D by 120ms). Reduced motion shows it fully drawn.
- **Code:** `components/Logo.tsx` (header) · `app/icon.svg` (favicon: **transparent, square 64×64**, a **compact ligature** of the monogram — the M's legs double as the stems of both Ds, so ᗡ, M and D merge into one ≈48×48 symbol that stays legible at 16px; stroke 5.5; bowl strokes follow the browser theme via `prefers-color-scheme` (ink `#10131a` / `#eef1f6`), M `#2f62d6` / `#5a88ec`) · `app/apple-icon.png` (180px transparent, white Ds — iOS puts transparent icons on black) · `app/favicon.ico` (16/32/48 for older browsers, neutral `#8a93a8` Ds so it reads on light and dark tabs). The PNG/ICO are rendered from `icon.svg`; regenerate them if the SVG changes.
- **Why two shapes:** three separate letters get ~4px each in a 16px tab and look squashed, so the favicon uses the ligature; the header (22px+) uses the spaced letters.
- **Don't:** add a wordmark next to it, un-mirror the first D, recolor the Ds, or put it on a colored fill.

### View Modes (Full / Compact)
**Role:** Full is the editorial portfolio. **Compact** is a one-page, resume-style view for recruiters: everything they need, nothing decorative.

- **Mechanics:** like the theme. `data-view="full|compact"` on `<html>`, persisted in `localStorage("view")`, applied by the inline `<head>` script before paint. Both views are rendered; CSS picks one via the `compact:` custom variant (`.compact:hidden` / `.hidden.compact:block`), so there's no flash and no hydration mismatch. Switching scrolls to the top. `hooks/useViewMode.ts` exposes the mode to client code.
- **View Toggle:** segmented `glass-chip` pill with two mono `label` buttons (FULL / COMPACT, `aria-pressed`); the active one is filled `--fg` on `--canvas`. Active styling comes from CSS (`compact:` variant), not state.
- **Compact layout** (`components/CompactView.tsx`, max 920px): profile block (96px round photo, name at `heading` with the nickname in `--accent`, tagline, bio, availability badge, location, Download CV + Email + LinkedIn/GitHub), then rows with a 1px `--line` top and a 180px mono label column: `01 / HIGHLIGHTS` (achievements) · `02 / EXPERIENCE` (all entries, role + period, org + kind, bullets) · `03 / PROJECTS` (featured: title link, category · year, description, stack; then "MORE" archive rows) · `04 / SKILLS` · `05 / EDUCATION` · `06 / CONTACT` (link rows + copy email).
- **Left out of Compact:** the Beyond Tech photo columns, the contact form, the project carousel and screenshots, the hero portrait animation.
- Section ids are prefixed `c-` so they never collide with Full.

### Theme Toggle
36–40px Icon Button. Shows `Sun` in dark mode and `Moon` in light mode. `aria-label="Switch to light theme"` / `"Switch to dark theme"`. Sets `data-theme` on `<html>`, persists to `localStorage` (try/catch). An inline `<head>` script applies the stored theme before paint so there's no flash. Background, color and border transition over 200ms on theme switch.

### Primary Pill Button
**Role:** The single highest-priority action per view: **Download CV ↓**, **Send message**, **Back to home**.

`--action-bg` fill, `--action-fg` text, 9999px radius, 12px 24px padding, sans 14px **500** UPPERCASE, `letter-spacing 0.02em`, trailing glyph. Hover: opacity 0.9, glyph nudges 2px in its direction. Focus: 2px `--fg` outline, 3px offset. **At most one per section.**

### Ghost Button
**Role:** Secondary action next to a primary: **View projects →**.

**Glass pill** (`glass-chip`, `rounded-full`), 12px 20px padding, sans 14px 500 uppercase. It's told apart from primary by fill: primary is solid, ghost is frosted. Hover: border `--line-strong`, background `--fg` at 6%.

### Icon Button
40px **glass** circle (`glass-chip`), icon 18px `--fg`. Hover: border `--line-strong`. Disabled: 40% opacity. Used for carousel arrows, theme toggle, menu, close.

### Text Link
`--fg`, no underline at rest. On hover: 1px underline, 4px offset, plus the `↗` glyph nudging up-right. In body copy, links are always underlined (1px, `--line-strong` → `--fg` on hover).

### Status Badge
**Role:** Live / availability / project status. Examples: "Currently building QuaCompute", "LIVE", "NEW", "HACKATHON".

Glass pill (`glass-chip`, `rounded-full`), 6px 12px padding, mono `label` `--muted`. **Live variant:** a 6px `--live` dot prefix with a soft pulse (scale 1 → 1.8 ring fading out, 2s loop). Only "Currently…" and "LIVE" get the dot.

### Tag (tech stack)
Transparent, 1px `--line`, 4px radius, 4px 8px padding, mono 12px `--muted`. Never filled, never colored.

### Section Header
**Role:** Opens every section after the hero. It is the page structure.

1px `--line` rule spanning the full 1200px column. Below it (padding-top 24px), a row:
- **Left:** mono `label`, formatted `01 / TOOLS`. The index is `--accent`, the rest `--muted`.
- **Below:** section title at `heading-lg`, `--fg`, margin-top 16px.
- **Optional right side** (desktop): a one-line intro in `body` `--muted`, max 360px, aligned to the title's baseline. Or controls (the carousel uses this).

Numbering: `01 / TOOLS`, `02 / SELECTED WORK`, `03 / EXPERIENCE`, `04 / BEYOND TECH`, `05 / CONTACT`.

### Dot Field
**Role:** Hyperstudio's dot-map, reinterpreted. Gives atmosphere without decoration.

A grid of 1px dots in `--line-strong` every 20px:
```css
background-image: radial-gradient(circle, var(--line-strong) 1px, transparent 1px);
background-size: 20px 20px;
mask-image: radial-gradient(ellipse 60% 60% at 50% 45%, black 20%, transparent 70%);
opacity: 0.7;
```
**Used in exactly two places:** behind the hero portrait and behind the 404 code.

### Backdrop
**Role:** Hyperstudio's "blueprint" idea made literal. Gives the page depth without competing with content.

`components/Backdrop.tsx`, mounted once in `app/layout.tsx`, `position: fixed` behind everything (`-z-10`, `pointer-events: none`, `aria-hidden`). Three layers:
1. **Blueprint grid:** 1px lines in `--accent` at 10%, every 72px, masked by a radial fade from the top center (`blueprint-grid` utility).
2. **Glows:** two soft radial gradients of `--accent` at 22% (`accent-glow` utility): one wide at the top, one smaller bottom-right at 60% opacity. Each drifts slowly (`drift` keyframes, 26s / 34s, alternate). Radial gradients, not `filter: blur`, so it stays cheap.
3. **Grain:** SVG fractal noise at 3.5% opacity, `mix-blend-mode: overlay`.

4. **Cursor light:** a 560px radial of `--accent` at 18% centered on `--mx/--my` (`cursor-light`).
5. **Cursor grid:** a second blueprint grid at 32% `--accent`, masked to a 240px circle around the cursor (`cursor-grid`), so the blueprint "lights up" where the pointer is.

`PointerTracker` (client, renders nothing) lives inside `Backdrop` and writes `--mx/--my` on `<html>`. On touch devices the light rests where the last touch was.

### Hero (Profile) — `#about`
Viewport-tall minus header (`min-h-[calc(100svh-64px)]`), content vertically centered, no section header.
- **Desktop:** 12-col grid. Text in cols 1–7, portrait in cols 8–12.
- **Mobile:** portrait first (max 320px wide, centered), text below.
- **Text stack:**
  1. Name at `display`, max 2 lines, with the **nickname highlight** (below)
  2. Tagline at `subheading` `--muted` ("Informatics Student at ITB · Web Developer")
  3. Bio at `body` `--muted`, max 560px, 2–3 sentences
  4. CTA row: Primary Pill "Download CV ↓" + Ghost "View projects →", 12px gap
  5. Meta row: mono `label` `--muted`: `BANDUNG, ID` · GitHub · LinkedIn · Email icon links (20px)
- **Portrait:** framed 4:5 card (28px radius, hairline border), natural color, fade mask variant A, Dot Field behind it (see Imagery).
  ```css
  mask-image: linear-gradient(to bottom, black 58%, transparent 100%);
  ```
- Elements reveal with a staggered 80ms fade-up on load.
- **Nickname highlight:** the name is split into `profile.nickname` ("Dhanes") + the rest ("woro Muhammad Datiputro"), with no space between them so the word never breaks. ~1.1s after load, the nickname turns `--accent` and an underline (0.07em, `--accent`) draws left → right, while the rest dims to `--muted`. Pure CSS (`.hero-nick` / `.hero-name-rest` in `globals.css`); reduced motion jumps straight to the end state.

### Tool Grid — `#tools`
Hyperstudio's 2×2 service grid inside a **glass panel** (`glass`, 20px radius), split into **4 cells** by 1px `--line` borders between cells: 2×2 on tablet and desktop, stacked on mobile. Each cell has 32px padding.
- Top-left: compass icon 24px in `--accent` (`Code2` Languages, `LayoutTemplate` Frontend, `Database` Backend & Data, `GitBranch` Workflow)
- Group name: mono `label` `--fg`, margin-top 16px
- Then a wrap row of **tool items**: monochrome logo 16px + name in sans 14px `--muted`, 16px gaps. On hover the logo and name turn `--fg`.

No skill bars, no percentages, no soft-skill cards.

### Project Carousel — `#projects`
Built on **embla-carousel-react** (`align: "start"`, `dragFree: false`, `containScroll: "trimSnaps"`).
- **Section Header, right side:** hint "SELECT A PROJECT FOR DETAILS" (mono `label` `--muted`, desktop only), counter in mono `label` (`01 / 04`, current in `--fg`, total in `--muted`) + prev/next Icon Buttons.
- **Track:** `align-items: start` (cards open independently), inside the 1200px column with a 24px slide gap. Slides are 440px wide on desktop (≈2.5 visible), 85% wide on mobile. The track's right edge fades with `mask-image: linear-gradient(to right, black 85%, transparent)`, removed once the last slide is reached.
- **Progress:** a 1px `--line` track below the slides, with a `--fg` segment showing scroll progress (embla `scrollProgress`).
- **Input:** drag/swipe, arrow buttons, and ← → keys when the carousel has focus. `aria-roledescription="carousel"`, each slide `aria-label="2 of 4"`.

### Project Card
No card background, no outer border. Only the image is framed and the content sits on the canvas. **Collapsed by default; one card open at a time** (state lives in `Projects`; clicking the open card closes it).

**Always visible**
1. **Image frame:** 16:10, 8px radius, 1px `--line`, `--carbon` well, `overflow: hidden`, `container-type: size`. Clicking it toggles the card (it is `tabIndex=-1` / `aria-hidden`; the title button is the accessible control).
2. **Meta row** (margin-top 20px, min-height 32px so rows align with or without a badge): mono `label` `--muted` `HACKATHON · 2026` on the left, Status Badge (`LIVE` / `NEW`) on the right
3. **Title button:** `heading-sm` `--fg`, full width, `aria-expanded` + `aria-controls`. On the right, a 32px circle with a `+` that rotates to `×` and turns `--accent` when open.

**Revealed when open** (grid-rows `0fr → 1fr`, 500ms; content fades in 150ms later; `inert` while closed)
4. **Description:** `body-sm` `--muted`, full text, leading with the outcome
5. **Tags row:** Tags, 8px gap
6. **Links row:** Text Links "Visit site ↗" (if `url`) / "Code ↗" (only for **public** repos). Projects with neither show `note` in mono `label` `--muted` (e.g. "PRIVATE REPOSITORY · SITE NO LONGER ONLINE").

**Scrolling preview:** projects store `image: { src, width, height }`. If the screenshot is taller than the 16:10 frame (full-page captures in `public/projects/full/`), it renders at full width and, on hover **or** while the card is open, translates to `calc(-100% + 100cqh)`, so the whole page scrolls past inside the frame. Duration scales with height (`ratio × 2.2s`, clamped 3–12s) so speed feels constant; it returns in 700ms. A "↓ PREVIEW" chip (bottom-right) hints at it and hides while active. Screenshots that already fit use `object-cover object-left-top` and a 1.03 zoom instead.

**Open state:** frame border → `--accent`. **Hover:** frame border → `--line-strong`.

### Archive Row
Below the carousel, a mono `label` "ARCHIVE" followed by rows separated by 1px `--line`.
- **Desktop grid:** title (sans 16px `--fg`) | category (`body-sm` `--muted`) | year (mono `label`) | `↗`
- **Mobile:** title + `↗` on line 1, `category · year` on line 2
- **Hover:** title shifts 4px right, `↗` turns `--accent`. The whole row is the link.

### Timeline Item (Experience) — `#experience`
**Desktop:** timeline in cols 1–7; a sticky **glass side panel** (cols 8–12, `top: 96px`) holding Education then Achievements. **Mobile:** stacked.

Data comes from LinkedIn. Newest first. The first **5** entries show; a glass-pill button "SHOW EARLIER (n)" reveals the rest (`aria-expanded`, chevron rotates).

Each item: 1px `--line` top border, 24px vertical padding, 2-column grid:
- **Left (120px):** index in mono `label` `--accent` (`01`), period below in mono `label` `--muted` (`SEP 2026 — NOW`)
- **Right:** kind pill (`glass-chip`: `ORGANIZATION` / `COMMUNITY` / `COMMITTEE` / `WORK`), role at `heading-sm` `--fg`, organization in `body` `--muted`, then 0–3 bullets in `body-sm` `--muted`, each prefixed with an en dash `–`

### Education & Achievement Rows (side panel)
Mono `label` heading ("EDUCATION", "ACHIEVEMENTS"), then rows with a 1px `--line` top and 16px padding:
- 16px `--accent` icon (`GraduationCap` / `Trophy`) · name in sans 16px `--fg` · degree or issuer in `body-sm` `--muted` below · period/year in mono `label` right-aligned
- An achievement with a certificate links the whole row with `↗`

### Beyond Tech Columns — `#beyond`
- **Intro:** Hyperstudio's manifesto block. Centered, max 600px, title at `heading`, one or two sentences at `body` `--muted`. Section header aside: a glass-pill **Pause / Play** button.
- **Layout:** a stage 520px (mobile) / 680px (≥768px) tall, top and bottom faded with a mask (transparent → black 10% … 90% → transparent). **3 columns** on desktop, **2** on mobile; photos are dealt into columns round-robin in the order of `gallery` in `lib/data.ts`.
- **Motion:** each column scrolls forever and slowly — **left and right go up, the middle goes down** (mobile: left up, right down). The column's photos are rendered twice and the track moves exactly one set (`translateY(-50% - half gap)`) for a seamless loop. Duration = photos in column × 9s (the middle runs ×1.12 and the right ×0.94 so they don't move in lockstep). Pure CSS (`.afk-track`, keyframes `afk-up` / `afk-down`), transform only.
- **Pause:** hovering a column pauses that column; the Pause button sets `data-paused` on the stage and stops all of them (moving content must be pausable). Reduced motion stops them.
- **Card:** landscape **3:2**, 8px radius, 1px `--line`, `--carbon` well, image `object-cover`, `scale(1.03→1.04)` on hover. Caption chip bottom-left (`--canvas` 75%, 4px radius, mono `micro` uppercase); an optional `description` appears under it on hover. The duplicate set is `aria-hidden` with empty `alt`.
- **Photos:** stored in `public/beyond/` as `afk-NN.jpg`, already cropped to 1200×800 (3:2). Full-size originals live outside the repo in `webporto/afk-originals/`.

### Contact — `#contact`
**Desktop:** 2 columns (cols 1–5 info, cols 7–12 form). **Mobile:** stacked.
- **Left:** headline "Let's connect." at `heading`, one line at `body` `--muted`, a live Status Badge ("OPEN TO INTERNSHIPS"), then **link rows** separated by 1px `--line`: mono `label` key (`EMAIL`, `LINKEDIN`, `GITHUB`, `INSTAGRAM`) on the left, value in sans 16px `--fg` + `↗` on the right. The email row also has a copy Icon Button that confirms with "COPIED" in mono for 2s.
- **Right:** the form inside a **glass panel** (20px radius, 32px padding).

### Form Field
- **Label:** mono `label` `--muted`, 8px above the input
- **Input / textarea:** `--carbon` at 60% background, 1px `--line-strong` border, 8px radius, 12px 14px padding, sans **16px** (prevents iOS zoom) `--fg`, placeholder `--muted` at 70%. Textarea min-height 160px, vertical resize only.
- **Focus:** border `--fg`, no glow
- **Error:** border `--danger`, message in sans 13px `--danger` below, linked with `aria-describedby`
- **Honeypot:** visually hidden `website` input (`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`)
- **Submit:** Primary Pill, full width on mobile. While sending: disabled, label "SENDING…".
- **Status line** (`aria-live="polite"`): on success, a `--live` dot + "Thanks! I'll get back to you soon." On error, the server message in `--danger`.

### Footer
1px `--line` top, 32px vertical padding, mono `label` `--muted`.
- **Left:** `© 2026 DHANESWORO · BUILT WITH NEXT.JS`
- **Right:** live local time `BANDUNG 14:32 WIB` (updates every minute) + "BACK TO TOP ↑" Text Link

### 404 Page — `app/not-found.tsx`
Same header and footer. Content centered in the column, `min-h-[70svh]`, with the Dot Field behind it.
1. Mono `label`: `ERROR / 404` (`ERROR` in `--accent`)
2. `404` at `display-xl` `--fg`
3. Terminal line in mono 14px `--muted`: `$ cd {pathname}` then `→ no such file or directory` (read the pathname with `usePathname`)
4. One sentence at `body` `--muted`: "This page doesn't exist, or it moved."
5. Primary Pill "Back to home →" + Text Links "Projects" · "Contact"

---

## Do's and Don'ts

### Do
- Set every heading in Schibsted Grotesk **400**. Size and tracking carry hierarchy.
- Open every section with a 1px `--line` rule and a mono `01 / NAME` index.
- Keep the canvas one color top to bottom. Structure comes from lines, not bands.
- Use `--accent` only as a mark: icon strokes, index numbers, the active-nav dot, hover arrows.
- Reserve the `--live` dot for things that are actually live or currently true.
- Lead project descriptions with the outcome: who it was for, what it did, a number if possible.
- Keep one Primary Pill per section at most.
- Keep body text in `--muted` and headings in `--fg`. That contrast step is the hierarchy.
- Test both themes and 360px width for every component.

### Don't
- Never add drop shadows or gradient fills to flat components. Only glass surfaces cast `--glass-shadow`; gradients live only in the Backdrop.
- Never bold a heading (no 600/700/800).
- Never use `--accent` for text paragraphs, backgrounds, or large shapes.
- Never mix radii: flat frames and inputs are 8px, glass panels are 20px, buttons/badges are pills. Nothing else.
- Never use brand-colored tech logos or multicolor icons.
- Never put photography outside the hero, project screenshots, and the gallery.
- Never use the banned fonts.
- Never animate on loop (except the live dot, the Backdrop drift and the photo columns) or animate the page's scroll position.
- Never break the 1200px column. Only the canvas and the mobile menu go full-bleed.
- Never put `backdrop-filter` on many moving elements at once (performance).

---

## Agent Prompt Guide

**Quick reference (dark):** canvas `#0b0d12` · text `#eef1f6` · muted `#969db0` · line `#1c2130` · line-strong `#3a4358` · accent `#4a7be3` · live `#98ff38` · primary pill `#ffffff` on `#0b0d12`.

**Example component prompts:**
1. **Hero name:** "Using DESIGN.md tokens, set the hero name at `display` (Schibsted Grotesk 400, clamp 40–64px, line-height 1.02, tracking -0.03em) in `--fg`. Above it, a live Status Badge. Below it, the tagline at `subheading` in `--muted`, then a Primary Pill 'Download CV ↓' and a Ghost Button 'View projects →'."
2. **Section header:** "Full-width 1px `--line` rule, then mono label `02 / SELECTED WORK` with '02' in `--accent`, then the title at `heading-lg` in `--fg`. On the right, an `01 / 04` counter and two Icon Buttons."
3. **Project card:** "No card background. 16:10 image in an 8px-radius frame with a 1px `--line` border on `--carbon`. Below it, a mono meta row, title at `heading-sm`, a 3-line clamped description at `body-sm` `--muted`, Tags, and Text Links. On hover the image scales 1.03 and the border becomes `--line-strong`."
4. **Gallery tile:** "8px radius, 1px `--line`, grayscale image that turns color and scales 1.03 on hover (hover-capable devices only). Bottom-left caption chip: `--canvas` at 70% + blur, 4px radius, mono `micro` uppercase."

---

## Quick Start — Tailwind v4 (`app/globals.css`)

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

:root,
:root[data-theme="dark"] {
  color-scheme: dark;
  --canvas: #0b0d12;
  --carbon: #07080c;
  --raised: #131721;
  --fg: #eef1f6;
  --muted: #969db0;
  --line: #1c2130;
  --line-strong: #3a4358;
  --accent: #4a7be3;
  --live: #98ff38;
  --danger: #ff7a6b;
  --action-bg: #ffffff;
  --action-fg: #0b0d12;
  --overlay: rgb(7 8 12 / 0.92);
  /* Liquid glass */
  --glass-fill: rgb(13 16 24 / 0.58);
  --glass-border: rgb(255 255 255 / 0.1);
  --glass-highlight: rgb(255 255 255 / 0.09);
  --glass-shadow: 0 18px 70px -24px rgb(0 0 0 / 0.65);
}

:root[data-theme="light"] {
  color-scheme: light;
  --canvas: #f4f6f9;
  --carbon: #ffffff;
  --raised: #ffffff;
  --fg: #10131a;
  --muted: #5c6475;
  --line: #e0e4eb;
  --line-strong: #c3c9d4;
  --accent: #1e47b8;
  --live: #3a9d0b;
  --danger: #b42318;
  --action-bg: #10131a;
  --action-fg: #ffffff;
  --overlay: rgb(244 246 249 / 0.92);
  /* Liquid glass */
  --glass-fill: rgb(255 255 255 / 0.55);
  --glass-border: rgb(16 19 26 / 0.09);
  --glass-highlight: rgb(255 255 255 / 0.85);
  --glass-shadow: 0 18px 60px -28px rgb(16 19 26 / 0.28);
}

@theme inline {
  /* Colors */
  --color-canvas: var(--canvas);
  --color-carbon: var(--carbon);
  --color-raised: var(--raised);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-accent: var(--accent);
  --color-live: var(--live);
  --color-danger: var(--danger);
  --color-action-bg: var(--action-bg);
  --color-action-fg: var(--action-fg);
  --color-overlay: var(--overlay);

  /* Fonts (variables come from next/font in app/layout.tsx) */
  --font-sans: var(--font-schibsted), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, monospace;

  /* Type scale */
  --text-display-xl: clamp(6rem, 14vw, 10rem);
  --text-display-xl--line-height: 0.9;
  --text-display-xl--letter-spacing: -0.04em;
  --text-display: clamp(2.5rem, 6vw, 4rem);
  --text-display--line-height: 1.02;
  --text-display--letter-spacing: -0.03em;
  --text-heading-lg: clamp(2rem, 4vw, 2.75rem);
  --text-heading-lg--line-height: 1.05;
  --text-heading-lg--letter-spacing: -0.02em;
  --text-heading: clamp(1.75rem, 3vw, 2.125rem);
  --text-heading--line-height: 1.1;
  --text-heading--letter-spacing: -0.015em;
  --text-heading-sm: clamp(1.25rem, 2vw, 1.4375rem);
  --text-heading-sm--line-height: 1.2;
  --text-heading-sm--letter-spacing: -0.01em;
  --text-subheading: clamp(1.125rem, 1.6vw, 1.25rem);
  --text-subheading--line-height: 1.4;
  --text-body: 1rem;
  --text-body--line-height: 1.6;
  --text-body-sm: 0.875rem;
  --text-body-sm--line-height: 1.55;
  --text-label: 0.75rem;
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.04em;
  --text-micro: 0.6875rem;
  --text-micro--line-height: 1.4;
  --text-micro--letter-spacing: 0.04em;

  /* Radius */
  --radius-tag: 4px;
  --radius-card: 8px;

  /* Motion */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

body {
  background: var(--canvas);
  color: var(--fg);
  font-family: var(--font-sans);
  transition: background-color 200ms, color 200ms;
}

::selection {
  background: var(--fg);
  color: var(--canvas);
}

section[id] {
  scroll-margin-top: 80px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Fonts (`app/layout.tsx`)

```tsx
import { Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// <html lang="en" data-theme="dark" suppressHydrationWarning
//       className={`${schibsted.variable} ${plexMono.variable}`}>
```
