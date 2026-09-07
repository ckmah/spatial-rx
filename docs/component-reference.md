# Component Reference

Visual primitives for the spatial-rx Design Guide. Each component exists in **dark** and **light** variants. Source of truth: `frontend/src/widgets/landmarks/chrome.tsx`, `landmarks.css`, `globals.css`.

---

## Tokens

### Chrome (`.spatial-rx-widget`)

| Token | Light | Dark | Source |
|-------|-------|------|--------|
| `--background` | `#ffffff` | `#000000` | `globals.css:62,85` |
| `--foreground` | `#111111` | `#ffffff` | `globals.css:63,86` |
| `--card` | `#ffffff` | `#111111` | `globals.css:64,87` |
| `--muted` | `#f5f5f5` | `#171717` | `globals.css:72,95` |
| `--muted-foreground` | `#666666` | `#999999` | `globals.css:73,96` |
| `--accent` | `#f0f0f0` | `#242424` | `globals.css:74,97` |
| `--border` | `#e5e5e5` | `rgb(255 255 255 / 10%)` | `globals.css:78,100` |
| `--primary` | `#171717` | `#ffffff` | `globals.css:68,91` |
| `--input` | `#e5e5e5` | `rgb(255 255 255 / 14%)` | `globals.css:79,101` |

### Canvas (`--lm-*`)

| Token | Light | Dark | Source |
|-------|-------|------|--------|
| `--lm-bg` | `#ffffff` | `#1e1e1e` | `landmarks.css:14,47` |
| `--lm-border` | `#e2e8f0` | `#3a3a3a` | `landmarks.css:15,48` |
| `--lm-text` | `#1e293b` | `#f1f5f9` | `landmarks.css:17,50` |
| `--lm-text-muted` | `#64748b` | `#94a3b8` | `landmarks.css:18,51` |
| `--lm-tooltip-bg` | `#0f172a` | `#f8fafc` | `landmarks.css:19,52` |
| `--lm-tooltip-text` | `#f8fafc` | `#0f172a` | `landmarks.css:20,53` |
| `--lm-float-bg` | `color-mix(in oklab, var(--card) 78%, transparent)` | `color-mix(in oklab, var(--card) 68%, transparent)` | `landmarks.css:93,75` |
| `--lm-float-shadow` | `0 8px 24px color-mix(in srgb, #000 8%, transparent)` | `0 1px 0 rgb(255 255 255 / 6%) inset, 0 10px 28px rgba(0,0,0,0.4)` | `landmarks.css:94,77-79` |

---

## 1. Color Swatch

Three variants for layer-row and legend contexts.

### Solid
- **Size:** `10×10px` (`size-2.5`)
- **Border:** `ring-1 ring-border`
- **Fill:** Solid `backgroundColor` from palette
- **Source:** `ColorSwatch` default branch (`chrome.tsx`)

### Landmark
- **Size:** `10×10px`
- **Border:** `borderColor` from `LANDMARK_COLORS`
- **Fill:** `color-mix(in srgb, ${color} 25%, transparent)`
- **Source:** `ColorSwatch` landmark branch

### Selection
- **Size:** `10×10px`
- **Border:** `borderColor` from `SELECTION_COLORS`
- **Fill:** Transparent
- **Source:** `ColorSwatch` selection branch

**Palette (source `helpers.ts`):**
- Landmarks: `["#00e5cc", "#ff2d95", "#b8ff00", "#ffb347", "#9b8fff"]`
- Selections: `["#94a3b8", "#fb923c", "#a78bfa", "#34d399", "#f472b6"]`
- Genes: `["#ff0099", "#b8ff00", "#00b7ff"]`

---

## 2. Chrome Hit Button Icon Sm

Compact icon-only button used in toolbars and trail rows.

- **Size:** `32×32px` (`size-8`)
- **Border-radius:** `full` (pill)
- **Text:** `text-muted-foreground`
- **Hover:** `hover:bg-muted hover:text-foreground`
- **Icon:** `size-4` (16px), Lucide
- **Source:** `chromeHitClass` constant (`chrome.tsx`)

**Active variant (Topbar mode toggle):**
- **Active bg:** `data-[state=on]:bg-foreground`
- **Active text:** `data-[state=on]:text-background`

---

## 3. Capsule Slider Row

Single-line instrument row: label, capsule track, value overlay.

- **Layout:** `flex items-center gap-1.5`
- **Height:** `h-[30px]`
- **Label:** `text-xs font-medium text-foreground` (13px, weight 500)
- **Capsule:** `relative h-2.5 w-12 rounded-full`
  - **Track bg:** Light `bg-[#e8e8e8]`, Dark `bg-[#121212]`
  - **Track shadow:** `inset-shadow-[0_1px_0_theme("colors.white/10%")]`
  - **Range bg:** Light `bg-[#d4d4d4]`, Dark `bg-[#5a5a5a]`
  - **Range height:** `h-full rounded-full`
- **Value:** `text-[10px] font-semibold text-foreground` (absolute inside capsule)
- **Source:** `landmarks.css` `.landmarks-slider-*` classes, `SliderRow` component

---

## 4. Toggle Switch

Binary on/off toggle with thumb animation.

- **Container:** `flex items-center gap-2`
- **Track:** `w-8 h-[18px] rounded-full p-[2px]`
  - **Off bg:** Light `bg-[#f5f5f5]`, Dark `bg-white/10`
  - **On bg:** Light `bg-[#e5e5e5]`, Dark `bg-white`
- **Thumb:** `block size-3.5 rounded-full`
  - **Off:** Light `bg-[#64748b]` (slides left), Dark `bg-[#999999]`
  - **On:** Light `bg-[#1e293b]` (slides right), Dark `bg-[#111111]`
- **Label:** `text-xs text-foreground`
- **Source:** `landmarks.css` `.landmarks-switch`

---

## 5. Soft Toggle Group

Segmented control for mutually exclusive options (e.g., neighborhood type).

- **Container:** `rounded-lg bg-muted/55 p-0.5` (`gap-1`)
- **Item:** `h-7 min-w-0 flex-1 rounded-md border-0 px-2 text-[0.6875rem]`
  - **Off:** `text-muted-foreground`
  - **On:** `bg-background text-foreground`
- **Source:** `SoftToggleGroup` component (`chrome.tsx`)

---

## 6. Layer Row

Row in a layers list (selections, categories, landmarks).

- **Container:** `h-[30px] items-center` flex row
- **Active bg:** Light `bg-[#f0f0f0]`, Dark `bg-[#242424]`
- **Active text:** `text-foreground font-medium`
- **Inactive text:** `text-foreground font-normal`
- **Label:** `text-xs leading-[1.33333]` (truncated, `flex-1`)
- **Trail:** 2 icon slots (`size-6`), `text-muted-foreground`
- **Editing:** `<Input>` replaces label, `h-6 text-xs`, auto-focused
- **Source:** `LayerRow` component, `landmarks.css` `.landmarks-layer-row`

### States
| State | Background | Text | Trail |
|-------|-----------|------|-------|
| Default | Transparent | `text-foreground` normal | Eye + X icons |
| Active | `bg-accent` | `text-foreground` medium | Eye + X icons |
| Editing | (input replaces label) | Input value | Eye + X icons |
| Hidden | `opacity-50` | Muted | EyeOff + X |

---

## 7. Pin Banner

Inline notification showing pinned molecule/type.

- **Container:** `rounded-md bg-muted/50 px-2 py-1.5`
- **Text:** `text-[0.6875rem]`
- **Label:** `text-muted-foreground` ("Pinned · ")
- **Value:** `font-medium text-foreground`
- **Source:** `ControlPanel` pinBanner (`chrome.tsx`)

---

## 8. Chrome Tooltip

Floating label for icon buttons.

- **Container:** Frosted glass float material
  - **Bg:** `bg-card/95`
  - **Border:** `border-border/60`
  - **Shadow:** `shadow-md`
  - **Radius:** `rounded-lg` (inherited from tooltip component)
- **Text:** `text-foreground text-xs`
- **Offset:** `sideOffset={6}` from trigger
- **Source:** `ChromeTooltip` component

---

## 9. Stat Grid

Key-value stat chips in the Stats panel section.

- **Grid:** `grid grid-cols-2 gap-1`
- **Chip:** `rounded-lg bg-muted/70 px-2 py-1.5`
  - **dt (label):** `text-[10px] text-muted-foreground`
  - **dd (value):** `text-[10px] font-semibold text-foreground`
- **Span:** Chips span 2 cols for "Pinned" and "Extent"
- **Source:** `landmarks.css` `.landmarks-stat-grid`, `.landmarks-stat-chip`

---

## 10. Soft Float Panel

Base floating surface for all panels and toolbars.

- **Shared tokens:** `--lm-float-bg`, `--lm-float-border`, `--lm-float-blur`, `--lm-float-shadow`
- **Panel variant:** `landmarks-float landmarks-float--panel`
  - **Radius:** `calc(var(--radius) + 2px)` (≈14px)
  - **Padding:** `py-1`
  - **Inset:** `px-2.5` (content padding)
- **Toolbar variant:** `landmarks-float landmarks-float--toolbar`
  - **Radius:** `full` (pill)
  - **Padding:** `px-1.5 py-1`
- **Blur:** `blur(14px) saturate(1.05)`
- **Source:** `landmarks.css` `.landmarks-float`, `chrome.tsx` constants

---

## 11. LayersPanel Floating Card

Full layers panel (Selections, Categories, Genes, Landmarks sections).

- **Container:** `FLOAT_PANEL` = `landmarks-float landmarks-float--panel`
- **Max height:** `max-h-full`
- **Overflow:** `overflow-hidden` (scroll inside)
- **Sections:** Accordion with `border-b` dividers
- **Section trigger:** `landmarks-section-trigger px-0 py-1.5`
  - **Text:** `text-xs font-semibold` (muted → foreground when open)
- **Content inset:** `px-2.5`
- **Source:** `LayersPanel` component

---

## 12. ControlPanel Floating Card

Settings panel (Style, Stats, Neighbors, Landmark sections).

- Same container as LayersPanel
- **Pin banner:** When molecule/type selected, shows inline `bg-muted/50` banner
- **Slider rows:** Grouped in `FieldGroup gap-2.5`
- **Source:** `ControlPanel` component

---

## 13. Layers List

Stacked layer rows with section headers.

- **Row height:** `h-[30px]`
- **Row gap:** `gap-0.5`
- **Max height:** `max-h-40` (scrollable)
- **Section headers:** `text-xs font-semibold` with `border-b`
- **Source:** `LayersPanel` accordion content

---

## 14. Gallery Item Card

Card showing a category/type with color swatch.

- **Size:** `w-[200px] h-fit min-h-24`
- **Container:** `flex flex-col rounded-xl p-2 gap-2 overflow-clip`
- **Normal bg:** `bg-[#111111]` (dark) / `bg-[#f5f5f5]` (light)
- **Selected bg:** `bg-[#242424]` (dark) / `bg-[#f0f0f0]` (light)
- **Swatch:** `h-12 rounded-lg` (fills card width, colored by palette)
- **Title:** `text-xs font-medium text-foreground` (truncated)
- **Caption:** `text-[10px] text-muted-foreground`
- **Source:** Canvas-only reference card (not a live component)

---

## 15. Genes Bar

Horizontal gradient bar showing gene expression range.

- **Bar:** `h-2.5 w-full rounded-full border border-border`
- **Gradient:** `linear-gradient(to right, ${color1}, ${blend}, ${color2})`
- **Labels above:** `text-[10px] text-foreground` with color swatch
- **Values below:** `text-[10px] text-muted-foreground tabular-nums`
- **Source:** `GenesHorizontalBar` component

---

## 16. Genes Ternary Legend

Triangle color legend for 3+ gene co-expression.

- **Size:** `64×64px` (`size-16`)
- **Triangle:** Rounded path, `stroke-border` outline
- **Fill:** Canvas-rendered gradient from `GENE_COLORS` (magenta/lime/azure)
- **Vertex dots:** `r=4` circles at each vertex
- **Source:** `GenesTernaryLegend` component

---

## 17. Topbar

Centered pill with mode toggles, zoom, and fullscreen.

- **Container:** `landmarks-float landmarks-float--toolbar`
- **Radius:** `rounded-full`
- **Padding:** `px-1.5 py-1`
- **Mode toggle:** `rounded-full bg-muted/45 p-0.5`
  - **Item:** `size-8 rounded-full`
  - **Active:** `bg-foreground text-background`
- **Dividers:** `Separator vertical mx-0.5 h-5 bg-border/50`
- **Hit buttons:** `size-8 rounded-full` ghost icons
- **Source:** `Topbar` component

---

## 18. Section Bar (Narrow)

Bottom navigation bar for narrow layouts (<640px).

- **Container:** `landmarks-float landmarks-float--toolbar`
- **Position:** Bottom-left, above dock
- **Items:** Text labels (`text-xs font-medium`)
  - **Active:** `text-foreground`
  - **Inactive:** `text-muted-foreground`
- **Tap:** Opens float sheet with corresponding panel section
- **Source:** `landmarks.css` narrow layout rules

---

## 19. Section Bar (Expanded)

Shows the section bar with an expanded panel sheet.

- **Bar:** Same as collapsed
- **Sheet:** Float panel above bar, `landmarks-float landmarks-float--panel`
- **Active section:** Opens corresponding accordion panel
- **Source:** Narrow mode interaction pattern

---

## Artboard Inventory

### Dark Column (x ≈ 134113)
| ID | Label | Component |
|----|-------|-----------|
| `ric` | Chrome Hit Button Icon Sm | Button |
| `www` | Capsule Slider Row Dark | Slider |
| `one` | Toggle Switch Dark On | Switch |
| `vid` | Toggle Switch Dark Off | Switch |
| `net` | Soft Toggle Group Dark | Toggle Group |
| `fan` | Color Swatch Selection | Swatch |
| `noa` | Color Swatch Landmark | Swatch |
| `cur` | Color Swatch Solid | Swatch |
| `far` | Layer Row Landmark Active | Layer Row |
| `nec` | Layer Row Editing | Layer Row |
| `dvd` | Layers List | List |
| `sie` | Topbar Dark | Topbar |
| `bmw` | Section Bar Collapsed Dark | Section Bar |
| `you` | Section Bar Expanded Dark | Section Bar |
| `war` | Pin Banner Dark | Pin Banner |
| `lcd` | Chrome Tooltip | Tooltip |
| `xml` | Stat Grid Dark | Stat Grid |
| `pas` | Soft Float Panel Dark | Float Panel |
| `her` | LayersPanel Floating Card | Panel |
| `job` | ControlPanel Floating Card | Panel |
| `lut` | Gallery Item Card | Card |
| `low` | Gallery Item Card Selected | Card |
| `wit` | Genes Bar | Legend |
| `raw` | Genes Ternary Legend | Legend |

### Light Column (x = 136000)
| ID | Label | Component |
|----|-------|-----------|
| `was` | Chrome Hit Button Icon Sm Light | Button |
| `dev` | Capsule Slider Row Light | Slider |
| `llp` | Toggle Switch Light On | Switch |
| `say` | Toggle Switch Light Off | Switch |
| `oam` | Soft Toggle Group Light | Toggle Group |
| `yea` | Layer Row Landmark Active Light | Layer Row |
| `pig` | Layer Row Editing Light | Layer Row |
| `hoi` | Topbar Light | Topbar |
| `pet` | Section Bar Collapsed Light | Section Bar |
| `tew` | Section Bar Expanded Light | Section Bar |
| `aud` | Pin Banner Light | Pin Banner |
| `jun` | Chrome Tooltip Light | Tooltip |
| `urw` | Stat Grid Light | Stat Grid |
| `sky` | Soft Float Panel Light | Float Panel |
| `wae` | LayersPanel Floating Card Light | Panel |
| `nod` | ControlPanel Floating Card Light | Panel |
| `mom` | Layers List Light | List |
| `imu` | Gallery Item Card Light | Card |
| `thu` | Gallery Item Card Selected Light | Card |
| `gnu` | Genes Bar Light | Legend |
| `che` | Genes Ternary Legend Light | Legend |
