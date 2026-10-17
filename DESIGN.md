# Dhanes Portfolio — Design System
> Blueprint scratched into obsidian, signed with a portrait. Hairlines carve the page out of near-black, type does the talking at weight 400, and small ember marks point the way.

**Theme:** dark by default, with a light toggle.
**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · framer-motion · embla-carousel-react · lucide-react.
**Companion doc:** [`docs/redesign-brief.md`](docs/redesign-brief.md) covers **what** goes on the page (content, sections, backend). This file covers **how it looks**. If the two conflict on visuals, this file wins.

## Lineage

This system blends three references. Each one contributes something specific:

| Source | What we take |
|---|---|
| **Hyperstudio** (Refero style) | The visual language: near-black canvas, 1px hairline structure, weight-400 display type with negative tracking, no shadows, white pill for primary actions, outlined icons, a pulse-green dot for live status, slow editorial section rhythm. |
| **farrel.me** | Content density and proof. Projects in a horizontal **carousel** of cards, small status badges (NEW / LIVE), outcome-driven one-liners, a compact Achievements list (title · issuer · year). |
| **wisee.info** | Structure and personality. Sticky header with anchor links, hero with two CTAs and a portrait, grouped tech stack, **numbered** experience timeline, a personal photo gallery with one-word captions, light/dark toggle. |

**Where we break from Hyperstudio, on purpose:**
- **Photography is allowed in three places only:** the hero portrait, project screenshots, and the Beyond Tech gallery. It always gets a disciplined treatment (fade mask, hairline frame, grayscale).
- **There's one personal accent, Ember** (`#d4a15a`). It replaces Hyperstudio's dim Compass Gold, but follows the same rule: it marks things, it never fills them.
- **A light theme exists.** Every token has a light value.
- **The header is sticky.**

---

## Tokens — Colors

Components use **semantic tokens** only (`bg-canvas`, `text-fg`, `text-muted`, `border-line`…). Never hardcode hex in components. The main text color is called `fg`, not `text`, so it doesn't collide with Tailwind's `--text-*` font-size namespace.

| Token | Dark (default) | Light | Role |
|---|---|---|---|
| `--canvas` | `#101010` Obsidian | `#f6f6f4` Paper | Page background. Never changes between sections. |
| `--carbon` | `#080808` Carbon | `#ffffff` | Deepest surface: form inputs, lightbox, image wells. |
| `--raised` | `#161616` | `#ffffff` | Status badges, the only "filled" small surfaces. |
| `--fg` | `#f3f3f3` Chalk | `#141414` Ink | Headings, primary text, active nav. |
| `--muted` | `#9c9c9c` Smoke | `#6b6b6b` | Body copy, descriptions, labels, captions. |
| `--line` | `#212121` Graphite | `#e4e4e1` | **The** structural 1px line: dividers, frames, tags. |
| `--line-strong` | `#474747` Iron | `#c9c9c5` | Hover borders, input borders, dot-field dots. |
| `--accent` | `#d4a15a` Ember | `#8a5d1c` | Compass marks: icon strokes, section index numbers, active-nav dot, archive hover arrow. |
| `--live` | `#98ff38` Pulse | `#3a9d0b` | Live/available dot **only** (6px). Never text. |
| `--danger` | `#ff7a6b` | `#b42318` | Form error text and error border **only**. |
| `--action-bg` | `#ffffff` Signal White | `#141414` | Primary pill button fill. |
| `--action-fg` | `#101010` | `#ffffff` | Primary pill button text. |
| `--overlay` | `rgb(8 8 8 / 0.92)` | `rgb(246 246 244 / 0.92)` | Lightbox, mobile menu backdrop. |

Contrast is checked: `--muted` on `--canvas` is ≈6.9:1 in dark and ≈4.9:1 in light, and `--accent` light passes 4.5:1 for small numerals.

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
| Cards, image frames, inputs, ghost buttons, gallery tiles | `8px` radius |
| Primary buttons, icon buttons | `9999px` (pill / circle) |
| Content max-width | `1200px`, centered |
| Text measure | `640px` max |
| Page gutter | 24px desktop · 20px tablet · 16px mobile |
| Section padding (vertical) | 160px desktop · 112px tablet · 80px mobile |
| Card / frame padding | 32px desktop · 24px mobile |
| Element gap | 20–24px |
| Header height | 64px |

Grid: 12 columns, 24px gap on desktop. Breakpoints follow Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).

---

## Elevation & Surfaces

**No drop shadows. Anywhere.** Elevation comes from three things only:
1. **Hairlines:** a 1px `--line` around or between things.
2. **Contrast:** the primary pill is the only bright filled shape on the page.
3. **Blur:** the sticky header (after scroll) and the lightbox use `backdrop-filter: blur(12px)` over `--canvas` / `--overlay`.

The page background never changes between sections. Sections are separated by a 1px `--line` rule at the top of each section header. **The line is the layout.**

---

## Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Color and border changes on hover |
| `--duration-base` | 300ms | Theme switch, menu open, icon nudges |
| `--duration-slow` | 600ms | Scroll reveals, image color transitions |
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything |

- **Reveal:** `opacity 0 → 1`, `y 12px → 0`, staggered 80ms, once per element (framer-motion `whileInView`, `viewport={{ once: true, amount: 0.2 }}`).
- **Hover:** color and border shifts, image `scale(1.03)`, arrow glyph nudge 2px. Nothing jumps.
- **Allowed loops:** only the pulse on the `--live` dot.
- **Not allowed:** parallax, cursor followers, scroll-jacking, typing effects, marquees that can't be paused.
- `prefers-reduced-motion: reduce` disables reveals, image scale, and the pulse. Color transitions stay.

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
| **Hero portrait** | Background removed (transparent PNG/WebP), **grayscale(100%) contrast(1.05)**, bottom **fade mask** (variant A), floating over a **dot field**. No frame, no border, no radius. |
| **Project screenshots** | Full color, 16:10, inside an 8px-radius frame with a 1px `--line` border on a `--carbon` well. |
| **Beyond Tech gallery** | Grayscale by default, color on hover (only on `@media (hover: hover)` devices; touch devices show color). 8px radius, 1px `--line`. |

Always use `next/image` with an accurate `alt` and correct `sizes`. The hero portrait gets `priority`.

---

## Components

### Top Navigation (sticky)
**Role:** Persistent header with wordmark, anchors, theme toggle, CTA.

64px tall, content max-width 1200px. At the top of the page it's transparent. After scrolling 8px it becomes `--canvas` at 80% opacity with `backdrop-blur(12px)` and a 1px `--line` bottom border (300ms transition).
- **Left:** wordmark "Dhanesworo" in sans 18px 400 `--fg`.
- **Center:** ABOUT · PROJECTS · EXPERIENCE · BEYOND TECH · CONTACT, in mono `label` `--muted`, 24px gaps. Hover → `--fg`. **Active section:** `--fg` with a 4px `--accent` dot before the label (uses `hooks/useActiveSection.ts`).
- **Right:** theme toggle (Icon Button) + outlined pill "LET'S CONNECT ↗" (transparent, 1px `--fg` border, 9999px, 8px 16px, mono 12px uppercase).
- **Mobile (<768px):** wordmark + toggle + a menu Icon Button. The menu opens a full-screen `--overlay` with blur, links stacked at `heading` size, staggered in.

### Theme Toggle
36–40px Icon Button. Shows `Sun` in dark mode and `Moon` in light mode. `aria-label="Switch to light theme"` / `"Switch to dark theme"`. Sets `data-theme` on `<html>`, persists to `localStorage` (try/catch). An inline `<head>` script applies the stored theme before paint so there's no flash. Background, color and border transition over 200ms on theme switch.

### Primary Pill Button
**Role:** The single highest-priority action per view: **Download CV ↓**, **Send message**, **Back to home**.

`--action-bg` fill, `--action-fg` text, 9999px radius, 12px 24px padding, sans 14px **500** UPPERCASE, `letter-spacing 0.02em`, trailing glyph. Hover: opacity 0.9, glyph nudges 2px in its direction. Focus: 2px `--fg` outline, 3px offset. **At most one per section.**

### Ghost Button
**Role:** Secondary action next to a primary: **View projects →**.

Transparent, 1px `--fg` border, **8px radius** (not a pill, which is what tells it apart from primary), 12px 20px padding, sans 14px 500 uppercase. Hover: background `--fg` at 6%.

### Icon Button
40px circle, transparent, 1px `--line` border, icon 18px `--fg`. Hover: border `--line-strong`. Disabled: 40% opacity. Used for carousel arrows, theme toggle, menu, lightbox close.

### Text Link
`--fg`, no underline at rest. On hover: 1px underline, 4px offset, plus the `↗` glyph nudging up-right. In body copy, links are always underlined (1px, `--line-strong` → `--fg` on hover).

### Status Badge
**Role:** Live / availability / project status. Examples: "Currently building QuaCompute", "LIVE", "NEW", "HACKATHON".

`--raised` background, 1px `--line` border, 4px radius, 6px 12px padding, mono `label` `--muted`. **Live variant:** a 6px `--live` dot prefix with a soft pulse (scale 1 → 1.8 ring fading out, 2s loop). Only "Currently…" and "LIVE" get the dot.

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

### Hero (Profile) — `#about`
Viewport-tall minus header (`min-h-[calc(100svh-64px)]`), content vertically centered, no section header.
- **Desktop:** 12-col grid. Text in cols 1–7, portrait in cols 8–12.
- **Mobile:** portrait first (max 320px wide, centered), text below.
- **Text stack:**
  1. Live Status Badge "Currently building …"
  2. Name at `display` `--fg`, max 2 lines
  3. Tagline at `subheading` `--muted` ("Informatics Student at ITB · Web Developer")
  4. Bio at `body` `--muted`, max 560px, 2–3 sentences
  5. CTA row: Primary Pill "Download CV ↓" + Ghost "View projects →", 12px gap
  6. Meta row: mono `label` `--muted`: `BANDUNG, ID` · GitHub · LinkedIn · Email icon links (20px)
- **Portrait:** 4:5 ratio, grayscale, fade mask variant A, Dot Field behind it.
  ```css
  mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  ```
- Elements reveal with a staggered 80ms fade-up on load.

### Tool Grid — `#tools`
Hyperstudio's 2×2 service grid, repurposed. A bordered frame (1px `--line`, 8px radius) split into **4 cells** by internal 1px `--line` dividers: 2×2 on desktop and tablet, stacked on mobile. Each cell has 32px padding.
- Top-left: compass icon 24px in `--accent` (`Code2` Languages, `LayoutTemplate` Frontend, `Database` Backend & Data, `GitBranch` Workflow)
- Group name: mono `label` `--fg`, margin-top 16px
- Then a wrap row of **tool items**: monochrome logo 16px + name in sans 14px `--muted`, 16px gaps. On hover the logo and name turn `--fg`.

No skill bars, no percentages, no soft-skill cards.

### Project Carousel — `#projects`
Built on **embla-carousel-react** (`align: "start"`, `dragFree: false`, `containScroll: "trimSnaps"`).
- **Section Header, right side:** counter in mono `label` (`01 / 04`, current in `--fg`, total in `--muted`) + prev/next Icon Buttons.
- **Track:** inside the 1200px column with a 24px slide gap. Slides are 440px wide on desktop (≈2.5 visible), 85% wide on mobile. The track's right edge fades with `mask-image: linear-gradient(to right, black 85%, transparent)`, removed once the last slide is reached.
- **Progress:** a 1px `--line` track below the slides, with a `--fg` segment showing scroll progress (embla `scrollProgress`).
- **Input:** drag/swipe, arrow buttons, and ← → keys when the carousel has focus. `aria-roledescription="carousel"`, each slide `aria-label="2 of 4"`.

### Project Card
No card background, no outer border. Only the image is framed and the content sits on the canvas.
1. **Image frame:** 16:10, 8px radius, 1px `--line`, `--carbon` well, `overflow: hidden`
2. **Meta row** (margin-top 20px): mono `label` `--muted` `HACKATHON · 2026` on the left, Status Badge (`LIVE` / `NEW`) on the right
3. **Title:** `heading-sm` `--fg`, margin-top 8px
4. **Description:** `body-sm` `--muted`, clamped to 3 lines, leading with the outcome
5. **Tags row:** Tags, 8px gap
6. **Links row:** Text Links "Live ↗" / "Code ↗"

**Hover:** image `scale(1.03)` over 600ms, frame border → `--line-strong`, title gets a trailing `↗`.

### Archive Row
Below the carousel, a mono `label` "ARCHIVE" followed by rows separated by 1px `--line`.
- **Desktop grid:** title (sans 16px `--fg`) | category (`body-sm` `--muted`) | year (mono `label`) | `↗`
- **Mobile:** title + `↗` on line 1, `category · year` on line 2
- **Hover:** title shifts 4px right, `↗` turns `--accent`. The whole row is the link.

### Timeline Item (Experience) — `#experience`
**Desktop:** Experience timeline in cols 1–7, Achievements in cols 9–12. **Mobile:** stacked.

Each item: 1px `--line` top border, 24px vertical padding, 2-column grid:
- **Left (120px):** index in mono `label` `--accent` (`01`), period below in mono `label` `--muted` (`2025 — NOW`)
- **Right:** kind Tag (`EDUCATION` / `ORGANIZATION` / `COMMITTEE` / `FREELANCE`), role at `heading-sm` `--fg`, organization in `body` `--muted`, then 1–3 bullets in `body-sm` `--muted`, each prefixed with an en dash `–` (no dot bullets)

### Achievement Row
Mono `label` "ACHIEVEMENTS" above the list. Each row has a 1px `--line` top and 16px padding:
- `Trophy` icon 16px `--accent` · title in sans 16px `--fg` · issuer in `body-sm` `--muted` below · year in mono `label` right-aligned
- If there's a certificate, the whole row links to it with `↗`

### Beyond Tech Gallery — `#beyond`
- **Intro:** Hyperstudio's manifesto block. Centered, max 600px, title at `heading`, one or two sentences at `body` `--muted`.
- **Bento grid:** 4 columns desktop / 2 mobile, row height 200px desktop / 160px mobile, 16px gap. Tile spans come from data: `big` 2×2, `wide` 2×1, `tall` 1×2, default 1×1. Aim for 6–9 tiles with no holes.
- **Tile:** 8px radius, 1px `--line`, `overflow: hidden`, image `object-cover`, grayscale → color + `scale(1.03)` on hover (600ms).
- **Caption chip:** bottom-left, 12px inset, `--canvas` at 70% + `backdrop-blur(8px)`, 4px radius, 4px 8px padding, mono `micro` `--fg`. **One to three words:** "FUTSAL", "HIKING", "COFFEE".
- **Optional lightbox:** `--overlay` with blur, image centered at max 90vh, caption in mono below, Icon Button close, `Esc` closes, focus trapped.

### Contact — `#contact`
**Desktop:** 2 columns (cols 1–5 info, cols 7–12 form). **Mobile:** stacked.
- **Left:** headline "Let's connect." at `heading`, one line at `body` `--muted`, a live Status Badge ("OPEN TO INTERNSHIPS"), then **link rows** separated by 1px `--line`: mono `label` key (`EMAIL`, `LINKEDIN`, `GITHUB`, `INSTAGRAM`) on the left, value in sans 16px `--fg` + `↗` on the right. The email row also has a copy Icon Button that confirms with "COPIED" in mono for 2s.
- **Right:** the form inside a frame (1px `--line`, 8px radius, 32px padding).

### Form Field
- **Label:** mono `label` `--muted`, 8px above the input
- **Input / textarea:** `--carbon` background, 1px `--line-strong` border, 8px radius, 12px 14px padding, sans **16px** (prevents iOS zoom) `--fg`, placeholder `--muted` at 70%. Textarea min-height 160px, vertical resize only.
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
- Never add drop shadows, glows, or gradient fills.
- Never bold a heading (no 600/700/800).
- Never use `--accent` for text paragraphs, backgrounds, or large shapes.
- Never fully round cards, frames, or inputs. 8px is the max, and pills are for buttons only.
- Never use brand-colored tech logos or multicolor icons.
- Never put photography outside the hero, project screenshots, and the gallery.
- Never use the banned fonts.
- Never animate on loop (except the live dot) or animate scroll position.
- Never break the 1200px column. Only the canvas and the mobile menu go full-bleed.

---

## Agent Prompt Guide

**Quick reference (dark):** canvas `#101010` · text `#f3f3f3` · muted `#9c9c9c` · line `#212121` · line-strong `#474747` · accent `#d4a15a` · live `#98ff38` · primary pill `#ffffff` on `#101010`.

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
  --canvas: #101010;
  --carbon: #080808;
  --raised: #161616;
  --fg: #f3f3f3;
  --muted: #9c9c9c;
  --line: #212121;
  --line-strong: #474747;
  --accent: #d4a15a;
  --live: #98ff38;
  --danger: #ff7a6b;
  --action-bg: #ffffff;
  --action-fg: #101010;
  --overlay: rgb(8 8 8 / 0.92);
}

:root[data-theme="light"] {
  color-scheme: light;
  --canvas: #f6f6f4;
  --carbon: #ffffff;
  --raised: #ffffff;
  --fg: #141414;
  --muted: #6b6b6b;
  --line: #e4e4e1;
  --line-strong: #c9c9c5;
  --accent: #8a5d1c;
  --live: #3a9d0b;
  --danger: #b42318;
  --action-bg: #141414;
  --action-fg: #ffffff;
  --overlay: rgb(246 246 244 / 0.92);
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
