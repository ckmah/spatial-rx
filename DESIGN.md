---
name: spatial-rx
description: Notebook-native spatial omics widgets — Soft Float glass chrome, Framer neutrals
colors:
  canvas-dark: "#1e1e1e"
  canvas-light: "#ffffff"
  plot-border: "#3a3a3a"
  plot-border-light: "#e2e8f0"
  plot-text: "#f1f5f9"
  plot-text-muted: "#94a3b8"
  landmark-cyan: "#00e5ff"
  landmark-magenta: "#ff2d95"
  landmark-lime: "#b8ff00"
  selection-slate: "#94a3b8"
  neighborhood-teal: "#b3f2e8"
  gene-magenta: "#ff0099"
  gene-lime: "#b8ff00"
  gene-azure: "#00b7ff"
  primary: "#171717"
  primary-foreground: "#ffffff"
  background: "#ffffff"
  foreground: "#111111"
  card: "#ffffff"
  muted: "#f5f5f5"
  muted-foreground: "#666666"
  accent: "#f0f0f0"
  border: "#e5e5e5"
  ring: "#a3a3a3"
  dark-background: "#000000"
  dark-card: "#111111"
  dark-popover: "#171717"
  dark-accent: "#242424"
  dark-muted-foreground: "#999999"
  dark-primary: "#ffffff"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  ui:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  panel-title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  section:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
  canvas-legend:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.25
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  widget: "0.75rem"
  panel: "0.875rem"
  control: "0.5rem"
  pill: "9999px"
  legend: "0.25rem"
spacing:
  panel: "0.5rem"
  panel-inset: "0.625rem"
  chrome-gap: "0.625rem"
  toolbar: "0.25rem"
components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "2.25rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "2.25rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "0 0.75rem"
    height: "2.25rem"
  card-panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
  tool-pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    height: "2.5rem"
---

# Design System: spatial-rx

## Overview

**Creative North Star: Soft Float + Glass**

spatial-rx widgets keep the plot as the specimen and float shadcn chrome above it. Surfaces are Framer-style achromatic neutrals (no blue tint). Docks, sheets, and toolbars share one translucent glass float material (`landmarks-float` + `--lm-float-*` tokens) so the tissue stays visible underneath. A centered icon pill carries draw modes, zoom, and fullscreen. Chrome stays compact in notebook cells; below 640px docks collapse to a labeled section bar with popup sheets.

**Key Characteristics:**

- Framer neutrals: white / `#111` light; `#000` / `#111` / `#171` / `#242` dark
- Shared glass float (`landmarks-float`, `--panel` / `--toolbar` shape roles) with backdrop blur
- Centered tool pill: modes + zoom + fullscreen; icon hits, soft muted trays, inverted active glyphs
- Merged right **Controls** dock (Style, Stats, Neighbors, Landmark)
- Narrow ≤640px: text section bar + one popup sheet at a time
- Saturated color reserved for canvas data (landmarks, genes, selections)

## Colors

Restrained achromatic chrome. Data owns saturation on the canvas.

### Chrome (`.spatial-rx-widget`)

- **Light:** background/card `#ffffff`, foreground `#111111`, primary `#171717`, muted `#f5f5f5`, muted-foreground `#666666`, border `#e5e5e5`
- **Dark:** background `#000000`, card `#111111`, popover `#171717`, accent `#242424`, primary `#ffffff`, muted-foreground `#999999`, borders at ~10–14% white

### Canvas (`--lm-*`)

Landmark cyan/magenta/lime, selection slate, neighborhood teal wash, gene triad — unchanged semantics on the plot layer.

### Named Rules

**The Data Owns Saturation Rule.** Neon hues appear on canvas entities and layer swatches — not on panel fills.

**The Scoped Widget Rule.** Never set `:root` theme tokens globally. Tokens live under `.spatial-rx-widget` / `.spatial-rx-widget.dark`.

**The Framer Neutral Rule.** Chrome stays achromatic; no blue-tinted OKLCH greys in widget tokens.

## Typography

**UI Font:** system-ui stack

**Character:** Compact Operate type — medium labels, semibold titles, no monospace costume.

### Hierarchy

- **Panel title** (600, 0.8125rem): Layers, Controls
- **Section trigger** (600, 0.6875rem, muted → foreground when open): accordion headers
- **Field label / slider value** (500, 0.6875rem): compact instrument rows
- **Canvas legend** (400, 0.625rem): in-plot only

## Layout

- Shell height default 700px (400–1400); plot fills figure under floating chrome
- Shared chrome scale on `.landmarks`: `--lm-space-*` (4px base), `--lm-chrome-inset`, `--lm-chrome-gap`, `--lm-chrome-band` (3.25rem), `--lm-dock-width` (14rem / 15rem fullscreen)
- Tool pill (`landmarks__chrome-tools`): reserved top band, centered — docks start below band + gap
- Wide: left Layers + right Controls (`landmarks__chrome-dock--*`); max-height accounts for band
- Narrow (`landmarks--narrow`, width < 640px): text section bar bottom-left; tapping a label opens one float sheet
- Zoom lives in the top tool pill (in / out / reset), not a separate bottom cluster
- Slider rows: single line — left label + capsule track; fill encodes value; numeral overlays the left of the capsule; thumb nearly invisible until hover/focus

## Elevation & Depth

- Widget body: soft offset shadow (not flat ring-only)
- Shared float tokens (`--lm-float-bg`, `--lm-float-border`, `--lm-float-blur`, `--lm-float-shadow`) drive every floating chrome surface
- Panels and toolbars use the same glass material; `--toolbar` is pill radius, `--panel` is card radius
- Plot canvas: flat — no drop shadows on scatter

Glass is a deliberate float treatment over live canvas, not decorative blur on static chrome.

## Shapes

- Widget shell: 12px (`0.75rem`)
- Panels: ~14px effective radius
- Tool bar and mode hits: full pills (`rounded-full`)
- Layer swatches: circular dots
- Active mode: filled circle inverted against pill tray

## Components

### Tool pill (`Topbar`)

Icon-only select + landmark mode groups, zoom (in / out / reset), and fullscreen. Soft muted trays; active = foreground fill on background glyph. Uses `landmarks-float landmarks-float--toolbar`.

### Glass docks

`landmarks-float landmarks-float--panel` on Card. Layers accordion (Selections, Categories, Genes, Landmarks). Controls accordion (Style, Stats, Neighbors, Landmark params).

### Compact fields

`SliderRow` — single-line instrument row: left-aligned label, rounded-rect capsule whose fill denotes the value, tabular numeral inside the fill (left), thin thumb that stays quiet until hover/focus. Soft segment toggles for neighborhood/buffer.

### Accordion sections

`+` when closed, `−` when open (crossfade). No chevron rotation.

### Section bar (narrow)

Text labels for each panel section in a float pill; active section opens a glass sheet above the bar. Labels, not icons — Operate scanability on a crowded cell.

### Shared float surface

Tokens on `.landmarks`: `--lm-float-radius`, `--lm-float-border`, `--lm-float-bg`, `--lm-float-blur`, `--lm-float-shadow`. Class `landmarks-float` applies the material; `--panel` / `--toolbar` only change radius. Legacy `landmarks-float-panel` / `landmarks-float-toolbar` alias the same tokens.

## Do's and Don'ts

### Do:

- **Do** scope tokens under `.spatial-rx-widget` and follow notebook light/dark ancestors.
- **Do** keep docks ~14rem; scroll inside panels.
- **Do** use the shared glass float tokens for every floating chrome surface.
- **Do** prefer shadcn primitives with Soft Float surface classes.
- **Do** collapse chrome to a labeled section bar under 640px.

### Don't:

- **Don't** reintroduce blue-tinted chrome or phosphor/monospace HUD styling.
- **Don't** set global `:root` / `body` colors from widget CSS.
- **Don't** stack Inspect + Tools as two separate right cards — use merged Controls.
- **Don't** apply drop shadows to the plot canvas.
- **Don't** hand-roll buttons/inputs when a shadcn component exists.
- **Don't** invent a second float material for toolbars — use `landmarks-float`.
