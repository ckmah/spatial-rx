# AGENTS.md

Guidance for agents working in **spatial-rx**.

Domain language: [`CONTEXT.md`](CONTEXT.md).

Before merging LandmarksWidget changes, verify behavior via Playwright e2e and the feature map in [`.agents/skills/verify-landmarks/`](.agents/skills/verify-landmarks/) (on `main`). Before merging VolumeCubeWidget changes, use [`.agents/skills/verify-volume-cube/`](.agents/skills/verify-volume-cube/). Active roadmap: [`ROADMAP.md`](ROADMAP.md).

## Skills precedence

When multiple skills could apply, follow this order:

1. **Behavioral proof / before merge widget changes**
   - Landmarks: [`.agents/skills/verify-landmarks/`](.agents/skills/verify-landmarks/) (on `main`)
   - VolumeCube: [`.agents/skills/verify-volume-cube/`](.agents/skills/verify-volume-cube/)
2. **Widget chrome composition** — [`.agents/skills/shadcn-anywidget/SKILL.md`](.agents/skills/shadcn-anywidget/SKILL.md), then [`.agents/skills/shadcn/SKILL.md`](.agents/skills/shadcn/SKILL.md)
3. **Motion primitives already in use** — [`.agents/skills/cube-motion/SKILL.md`](.agents/skills/cube-motion/SKILL.md) only when editing `Rise` / `Morph` / `leave` / `reveal` usage

Playwright proofs plus feature maps are the standard for widget work on user-visible surfaces.

## Merge policy

Less-supervision gate for agents merging their own PRs. CI green alone is not a verdict.

**Agents may merge their own PR only when all applicable gates pass:**

1. CI green on the head commit.
2. Merge conflicts resolved; PR not left as draft when intending to land.
3. Verification PASS by change class:
   - **LandmarksWidget / landmarks surface** (`frontend/src/widgets/landmarks/`, `spatial_rx/static/landmarks.js`, landmark traitlets, selection/neighborhood UX): run relevant Playwright + match verify-landmarks feature map proof criteria for touched mapped capabilities (on `main`).
   - **VolumeCubeWidget / volume-cube surface** (`frontend/src/widgets/volume-cube/`, `spatial_rx/volume_cube.py`, Viv/OME-Zarr wiring, `window_*` traitlets): run `npm run test:e2e:volume-cube` + match [verify-volume-cube feature map](.agents/skills/verify-volume-cube/) proof criteria for touched capabilities; update the map when adding coverage.
   - **Other UI with a Playwright tier**: run the path-gated e2e that covers the change ([`frontend/e2e/README.md`](frontend/e2e/README.md), [`.github/workflows/frontend-e2e.yml`](.github/workflows/frontend-e2e.yml)).
   - **Docs / AGENTS / skills / non-runtime only**: feature-map not required; CI + conflict-free is enough unless the PR also touches runtime UI.
4. Visual evidence on the PR when the change is user-visible chrome or canvas ([`.github/scripts/post-playwright-visuals.sh`](.github/scripts/post-playwright-visuals.sh) or equivalent proof on the PR). Docs-only skips this.

**Do not merge — stop and escalate to the human (Clarence):**

- Unresolved review threads that need a product/design call
- Scope creep outside product rules (Visium HD, speculative chrome, new panels without an issue/brief)
- ADR / SpatialData / landmarks persistence contract breaks without an explicit decision
- Verification failed, or the only way to pass would be inventing UI/tests that have no real product surface
- Dependent/stacked PR whose ancestor is not yet merged and verified

**How to merge:** prefer squash + delete branch. Leave a brief PR note of what was verified (spec names / feature map files).

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

VolumeCube harness (Playwright / manual):

```bash
cd frontend && npm run dev:volume-cube
cd frontend && npm run test:e2e:volume-cube
```

`_esm` must remain a `pathlib.Path` to the bundled `.mjs`. Do not `.read_text()`
it and do not point it at `http://localhost:5173`. Details:
[`docs/widget-packaging.md`](docs/widget-packaging.md).
