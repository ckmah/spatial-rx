# AGENTS.md

Guidance for agents working in **spatial-rx**.

Domain language: [`CONTEXT.md`](CONTEXT.md).

Before merging LandmarksWidget changes, verify behavior via Playwright e2e and the feature map in [`.agents/skills/verify-landmarks/`](.agents/skills/verify-landmarks/).

## Skills precedence

When multiple skills could apply, follow this order:

1. **Behavioral proof / before merge Landmarks changes** — [`.agents/skills/verify-landmarks/`](.agents/skills/verify-landmarks/)
2. **Widget chrome composition** — [`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md), then [`.agents/skills/shadcn/SKILL.md`](.agents/skills/shadcn/SKILL.md)
3. **Motion primitives already in use** — [`.agents/skills/cube-motion/SKILL.md`](.agents/skills/cube-motion/SKILL.md) only when editing `Rise` / `Morph` / `leave` / `reveal` usage

Soft Float chrome plus Playwright proofs are the standard for LandmarksWidget work.

## Patterns and anti-patterns

Durable do/don't rules for agents. Prefer short tables over prose; vocabulary matches [`CONTEXT.md`](CONTEXT.md).

### Data and Python

| Prefer | Avoid |
| --- | --- |
| Hold a **reference** to the caller's AnnData; pack genes at construct as designed ([`CONTEXT.md`](CONTEXT.md)) | `obs.copy()`, densifying full `X`, inventing a second CRS for landmarks ([`docs/landmarks-spatialdata-contract.md`](docs/landmarks-spatialdata-contract.md)) |
| Landmark persistence via `landmarks_to_geodataframe` / `geodataframe_to_landmarks` | Treating selections as SpatialData geometry export (M1 contract) |
| Selection hits via `obs_names` / `get_obs_names` / `assign_obs_mask` | Positional indices for selection membership |
| Neighborhood expand in the browser from coordinates | Required or synced `obsp` neighbor graphs |

### Chrome and packaging

| Prefer | Avoid |
| --- | --- |
| shadcn/ReUI primitives for chrome; Soft Float patterns already in landmarks ([`frontend/DESIGN.md`](frontend/DESIGN.md), [Widgets](#widgets)) | Hand-rolled buttons/panels when a UI primitive exists; painting host `:root` (scope tokens under widget / Soft Float) |
| `_esm` as `pathlib.Path` to bundled `.mjs`; anywidget HMR watch flow ([Widget UI development](#widget-ui-development), [`docs/widget-packaging.md`](docs/widget-packaging.md)) | `.read_text()` on bundle; pointing `_esm` at Vite `localhost:5173` |

### Verification and PRs

| Prefer | Avoid |
| --- | --- |
| Before merge Landmarks changes: run relevant Playwright + match [verify-landmarks feature map](.agents/skills/verify-landmarks/) proofs; update the map when adding coverage | Merging on CI green alone without feature-map proof for touched capabilities |
| Path-gated e2e tiers ([`frontend/e2e/README.md`](frontend/e2e/README.md), [`.github/workflows/frontend-e2e.yml`](.github/workflows/frontend-e2e.yml)) | Inventing UI in e2e/feature map that has no real product surface |
| PR visual comments via [`.github/scripts/post-playwright-visuals.sh`](.github/scripts/post-playwright-visuals.sh) | — |
| Resolve merge conflicts before marking a PR ready for review | — |

### Product scope

| Prefer | Avoid |
| --- | --- |
| Imaging / single-molecule resolved platforms; expand live landmarks chrome ([`frontend/PRODUCT.md`](frontend/PRODUCT.md)) | Visium HD / spot-parity UX; speculative overview mockups as the design process (use [`frontend/DESIGN.md`](frontend/DESIGN.md) + harness; see [`docs/widget-ui-dev.md`](docs/widget-ui-dev.md)) |

### Architecture (ADRs)

| Prefer | Avoid |
| --- | --- |
| Prebuilt bundles in the wheel; consumers never need Node ([ADR 0001](docs/adr/0001-prebuilt-bundles-node-free-install.md)) | Node at `pip install`, CDN runtime bundles, or EsmWidget CDN imports without a build step |
| Named traitlets as the widget contract ([ADR 0002](docs/adr/0002-named-traitlets-as-widget-contract.md)) | Single generic `data` JSON blob for library widgets |
| One deck.gl orthographic `Deck` for all geometry ([ADR 0003](docs/adr/0003-deckgl-landmarks-renderer.md)) | A second 2D canvas camera that drifts from the deck.gl viewport |
| Client-side neighborhood overlay from coordinates ([ADR 0004](docs/adr/0004-neighborhood-visuals.md)) | Syncing or requiring `obsp` CSR graphs for expand visuals |

## Widgets

React/shadcn widgets live in `frontend/src/widgets/`. Canvas drawing for landmarks
stays in `spatial_rx/static/landmarks.js` (`mountEngine`) and is bundled with the
React chrome.

**Widget UI must use shadcn/ui primitives** from `frontend/src/components/ui/`.
Compose with `@/components/ui/*` (Button, Card, Slider, Field, Accordion, etc.).
Add missing components via `npx shadcn@latest add` from `frontend/`; the **ReUI**
registry (`@reui/*`, free `c-*` components) is configured in `frontend/components.json`.
Do not hand-roll styled `div`/`button`/`input` markup when a shadcn or ReUI component exists. See
[`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md)
and [`.agents/skills/shadcn/SKILL.md`](.agents/skills/shadcn/SKILL.md).

When adding or changing a React/shadcn widget: read
[`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md).
Architecture: [`docs/widget-packaging.md`](docs/widget-packaging.md),
[`docs/widget-scaffold.md`](docs/widget-scaffold.md).

## Widget UI development

Use anywidget file-watch HMR (not the Vite dev server):

```bash
cd frontend && npm run watch:landmarks
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/<demo>.py
```

`_esm` must remain a `pathlib.Path` to the bundled `.mjs` — see
[Chrome and packaging](#chrome-and-packaging) and [`docs/widget-packaging.md`](docs/widget-packaging.md).
