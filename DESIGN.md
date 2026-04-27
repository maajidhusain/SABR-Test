---
name: SABR Platform
description: A warm, organic design system for a professional network and analytics dashboard. Rooted in natural forest greens and terracotta earth tones layered over a parchment canvas.
colors:
  background: "#f7f1e5"
  on-background: "#14281d"
  surface: "#fffaf1"
  surface-dim: "#f2ecdf"
  surface-container-low: "#fffcf5"
  surface-container: "#fffcf5"
  on-surface: "#14281d"
  on-surface-variant: "#5f6f65"
  outline: "#1a281d1f"
  outline-variant: "#14281d1e"
  primary: "#1b5e4a"
  on-primary: "#ffffff"
  primary-container: "#dceadf"
  on-primary-container: "#14281d"
  secondary: "#b46a36"
  on-secondary: "#ffffff"
  secondary-container: "#f4ddca"
  on-secondary-container: "#3d1e09"
  tertiary: "#2f7d63"
  on-tertiary: "#ffffff"
  quaternary: "#6e7b6d"
  on-quaternary: "#ffffff"
  error: "#9b2c2c"
  on-error: "#ffffff"
  error-container: "#fff4f2"
  on-error-container: "#9b2c2c"
  inverse-surface: "#14281d"
  inverse-on-surface: "#f7f1e5"
typography:
  display:
    fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Garamond, serif"
    fontSize: clamp(3.1rem, 6vw, 5.2rem)
    fontWeight: "400"
    lineHeight: 1.08
  headline-lg:
    fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Garamond, serif"
    fontSize: clamp(1.6rem, 2.5vw, 2.5rem)
    fontWeight: "400"
    lineHeight: 1.2
  headline-md:
    fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Garamond, serif"
    fontSize: 1.4rem
    fontWeight: "400"
    lineHeight: 1.25
  body-lg:
    fontFamily: "Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.6
  body-md:
    fontFamily: "Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 0.95rem
    fontWeight: "400"
    lineHeight: 1.55
  label-md:
    fontFamily: "Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 0.92rem
    fontWeight: "500"
    lineHeight: 1.4
  label-sm:
    fontFamily: "Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 0.84rem
    fontWeight: "700"
    lineHeight: 1.3
    letterSpacing: 0.01em
  caption:
    fontFamily: "Avenir Next, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 0.9rem
    fontWeight: "400"
    lineHeight: 1.45
rounded:
  sm: 8px
  DEFAULT: 14px
  md: 14px
  lg: 24px
  xl: 28px
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  card: 24px
  container: 1180px
components:
  card:
    backgroundColor: rgba(255, 252, 245, 0.84)
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card}"
  card-strong:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 0.75rem 1.1rem
  button-primary-hover:
    backgroundColor: "#164839"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: rgba(255, 250, 241, 0.92)
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 0.75rem 1.1rem
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  button-danger:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.error}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 0.75rem 1.1rem
  input-field:
    backgroundColor: rgba(255, 252, 247, 0.88)
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.md}"
    padding: 0.88rem 1rem
  pill:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 0.45rem 0.9rem
  pill-accent:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: 0.45rem 0.9rem
  network-node-viewer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    size: 22px
  network-node-member:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    size: 18px
  network-node-business:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    size: 18px
  network-node-student:
    backgroundColor: "{colors.quaternary}"
    textColor: "{colors.on-quaternary}"
    size: 16px
  metric-cell:
    backgroundColor: rgba(255, 252, 247, 0.62)
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 1.4rem
---

## Overview

The SABR Platform design system conveys **scholarly warmth and quiet authority**. The visual language draws from academia and nature — a worn parchment background, hand-laid ink typography, and a palette pulled from old-growth forests and sun-baked clay. The result is a dashboard that feels more like a premium reference book than a software product.

The aesthetic style is **Editorial Organic**: structured enough for dense analytical data, yet warm enough to feel approachable for community and network features. There are no harsh blacks or cold blues. Every surface, shadow, and transition is softened, as if the interface were printed on high-quality paper and lit by afternoon light.

## Colors

The palette is built on two dominant hues held in balance: **Forest Green** (`#1b5e4a`) as the primary brand color and **Terracotta** (`#b46a36`) as the accent. These are never competing — they are complementary earth tones that feel purposeful together.

- **Background (`#f7f1e5`):** A warm parchment that reads as off-white. Never use pure white (`#ffffff`) as a page background — it would break the editorial warmth.
- **Foreground (`#14281d`):** Deep forest ink, not black. All body text and high-emphasis content uses this color.
- **Primary (`#1b5e4a`):** Forest green. Used for primary actions, active navigation states, and brand identity.
- **Primary Container (`#dceadf`):** Soft sage. Used for tag backgrounds, subtle highlights, and hover fill on primary-tinted surfaces.
- **Secondary (`#b46a36`):** Terracotta. Used for accent elements, the "member" node type in the network graph, and warm call-to-action variants.
- **Secondary Container (`#f4ddca`):** Warm blush. Soft fill for accent-tinted pills and chips.
- **Muted (`#5f6f65`):** A gray-green for secondary text, metadata, and supporting labels.
- **Outline (`rgba(20, 40, 29, 0.12)`):** The border color for all inputs and dividers — always semi-transparent so it inherits warmth from the surface beneath.
- **Error (`#9b2c2c`):** A deep, muted brick red for destructive actions. Avoided except for genuine warnings; it does not appear in the primary palette.

The page background itself is a **radial gradient composition**: two corner blooms (terracotta top-left, green top-right) layered over a linear base that fades from `#f7f1e5` to `#f2ecdf`. The effect is subtle — like sunlight catching the corner of a page — and grounds the experience without distracting from content.

## Typography

The type system is a **deliberate serif/sans pairing** designed to evoke editorial authority and analytical clarity.

- **Display & Headlines:** *Iowan Old Style* (fallbacks: Palatino Linotype, Book Antiqua, Garamond). A warm, humanist serif chosen for its ink-trap details and readability at large sizes. Used exclusively for section headings, hero text, and site identity. The serif voice signals permanence and scholarship.
- **Body & UI:** *Avenir Next* (fallbacks: Segoe UI, Helvetica, Arial). A geometric humanist sans-serif that reads cleanly at every size from 10px node labels to 18px card copy. Its rounded geometry complements the serif without competing.

**Scale and application:**
- **Display** (`clamp(3.1rem, 6vw, 5.2rem)`): Hero headings only. The fluid clamp ensures the headline never feels cramped on mobile or oversized on widescreen.
- **Headline LG** (`clamp(1.6rem, 2.5vw, 2.5rem)`): Major section titles. Also fluid — the section title and the hero scale together.
- **Headline MD** (`1.4rem`): Site header branding. Fixed, because navigation must be stable.
- **Body LG** (`1rem`): Primary prose content, form inputs, card descriptions.
- **Label SM** (`0.84rem`, weight 700): Data labels, kickers above section titles, network graph callout headings. The heavy weight keeps small text legible against warm backgrounds.
- **Caption** (`0.9rem`): Hints, helper text, graph annotations.

Do not mix serif into UI micro-components (buttons, inputs, pills). Serif is reserved for layout-level headings only.

## Layout & Spacing

The layout is a **centered column** with a maximum width of `1180px`. On smaller screens, a `2rem` margin maintains breathing room. The interior follows an implicit 4px base grid, but designers should work in the named spacing scale (`sm`, `md`, `lg`) rather than raw multiples.

**Key layout patterns:**
- **Dashboard Shell:** Two-column grid (`280px` sidebar + `minmax(0, 1fr)` content). The sidebar is sticky at `top: 94px` to remain visible during long scrolls.
- **Hero:** Asymmetric two-column (`1.2fr 0.8fr`) — the text column slightly dominates, reinforcing the editorial voice.
- **Metric Strip:** Four equal columns on desktop (`repeat(4, minmax(0, 1fr))`), collapsing to 2-up at 900px and single-column at 560px.
- **Network Layout:** `1.5fr 0.7fr` — the graph canvas dominates, with the results panel as a secondary column.
- **Standard Grids:** `1rem` gap throughout. Use `0.75rem` only for tighter sub-layouts like filter controls.

**Responsive breakpoints:**
| Breakpoint | Layout change |
|---|---|
| `1100px` | Network layout and controls collapse to single column |
| `900px` | Hero, two-column, and metric strip reflow to single column |
| `700px` | Network canvas height drops from `620px` to `440px` |
| `560px` | Metric strip collapses from 2-column to 1-column |

## Elevation & Depth

The elevation system is built on **glassmorphism without the darkness**: cards float above a warm, textured background using transparency and blur rather than dark drop shadows.

- **Page background:** Radial gradient composition (see Colors). The canvas itself has depth.
- **Standard card:** `background: rgba(255, 252, 245, 0.84)`, `backdrop-filter: blur(10px)`. The semi-transparency lets the page gradient breathe through, keeping cards warm rather than flat white.
- **Strong card / sidebar:** `background: #fffaf1` (opaque). Used when a surface needs full opacity for legibility over complex content.
- **Site header:** `backdrop-filter: blur(16px)`. Slightly heavier blur than cards to reinforce the header's permanent layer above content.
- **Drop shadow:** `0 28px 65px rgba(31, 42, 35, 0.12)`. Deeply diffused, green-tinted. The tint prevents a "dirty gray" look on the warm background.
- **Hover shadow:** `0 16px 32px rgba(20, 40, 29, 0.08)`. Smaller, lighter — reveals on interactive card hover.
- **Borders:** `1px solid rgba(20, 40, 29, 0.12)`. All card and input borders are semi-transparent so they read as warm dividers, never cold lines.

There is no dark mode. The warm parchment is the intended experience at all times.

## Shapes

The shape language is **generously rounded** throughout, softening the analytical density of the data.

- **Cards (`28px`):** The most prominent container radius. Large rounded corners make data cards feel approachable, not like a spreadsheet.
- **Network canvas (`24px`):** Slightly less than card radius to give the interactive canvas a distinct visual weight.
- **Buttons & Inputs (`14px`):** A medium radius — substantial and clickable without looking like a pill. Consistent across all interactive form controls.
- **Pills & Tags (`9999px`):** Fully circular. Used for category labels, relationship types, and status indicators. The pill shape signals categorization rather than action.

Avoid `border-radius: 0` anywhere in the UI. Even structural containers should carry the `sm` radius (`8px`) at minimum to maintain visual consistency.

## Components

### Cards

Cards are the primary content container. Standard cards use `rgba(255, 252, 245, 0.84)` with `backdrop-filter: blur(10px)` and `box-shadow: 0 28px 65px rgba(31, 42, 35, 0.12)`. They float over the gradient background without fully blocking it. Strong cards (`#fffaf1`, fully opaque) are used for sidebar panels and data-dense areas where blur artifacts would reduce legibility.

### Buttons

Three button variants share the same `14px` radius and `0.75rem 1.1rem` padding:
- **Primary:** Green gradient (`linear-gradient(135deg, #1b5e4a, #164839)`). White text. Used for the single most important action per view.
- **Secondary:** Near-white (`rgba(255, 250, 241, 0.92)`) with a faint outline border. Foreground text. Used for secondary actions alongside a primary.
- **Danger:** Soft red fill (`#fff4f2`) with `#9b2c2c` text and a subtle red border. For destructive actions only.

All buttons animate with `transform: translateY(-1px)` and `transition: 140ms ease` on hover, producing a gentle "lift" without overselling the interaction.

### Inputs & Fields

All inputs share `background: rgba(255, 252, 247, 0.88)`, `border: 1px solid rgba(20, 40, 29, 0.14)`, and `14px` border radius. The near-transparent background keeps form fields warm and contextual. Focus states should reinforce the primary brand green to clearly communicate active editing.

### Pills & Tags

Pills use the `9999px` fully circular radius. The default pill style uses `primary-container` (sage) fill. The accent variant uses `secondary-container` (warm blush). Never use a solid primary or secondary color for a pill — the soft container versions maintain hierarchy without competing with buttons.

### Network Graph

The network graph canvas has its own background: a three-layer gradient (terracotta bloom top-left, green bloom bottom-right, warm linear base) that mirrors the page background but is slightly more saturated to signal an interactive zone. Node colors encode relationship type: **viewer** (forest green `#1b5e4a`), **member** (terracotta `#b46a36`), **business** (deep green `#2f7d63`), **student** (muted sage `#6e7b6d`). Node labels use 11px Avenir Next at weight 600; selected nodes scale up and use 12px at weight 700.

### Metric Strip

A grid of four metric cells, each with `background: rgba(255, 252, 247, 0.62)` — lighter than cards to read as a data table row rather than an elevated card. `8px` border radius (the only major UI surface using the small radius).

## Do's and Don'ts

**Do:**
- Use the parchment background (`#f7f1e5`) as the only page background. Never substitute pure white or gray.
- Pair serif headlines with sans-serif body text in every section. The contrast is essential to the editorial voice.
- Keep all interactive elements at `14px` border radius (buttons, inputs, selects). Consistency here builds a stable visual grammar.
- Use `rgba` semi-transparent backgrounds for cards so the warm gradient breathes through.
- Apply `transition: 140ms ease` to all hover state changes — no faster, no slower.

**Don't:**
- Use solid black (`#000000`) anywhere. The darkest color in the system is `#14281d`.
- Use serif fonts inside buttons, pills, inputs, or navigation links. Serif is layout-level only.
- Apply the full `--shadow` drop shadow to anything smaller than a card (e.g., buttons). Reserve it for card-level containers.
- Create new border radii outside the defined scale (`8px`, `14px`, `24px`, `28px`, `9999px`).
- Use the danger color (`#9b2c2c`) for informational or warning states. It signals irreversible actions only.
