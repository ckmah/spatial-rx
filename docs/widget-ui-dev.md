# Widget UI dev — quick reference

Notebook-free harnesses for widget chrome + canvas. Marimo remains the integration check before ship.

## Chrome iteration (no notebook)

### Landmarks

```bash
cd frontend && npm run dev:landmarks
```

Open http://localhost:5173 — mock traitlet state from `frontend/dev/fixture.json`.

Edit under `frontend/src/widgets/landmarks/` (`chrome.tsx`, `LandmarksView.tsx`, `landmarks.css`, …). Vite HMR reloads on save.

Refresh mock data after Python traitlet changes:

```bash
cd frontend && npm run dev:fixture
```

### Polyrender

```bash
cd frontend && npm run dev:polyrender
```

Open http://localhost:5173 — Soft Float chrome + Fiber tile viewer with committed sample GLBs under `frontend/dev/polyrender/public/`. Mock traitlets: `frontend/dev/polyrender/fixture.json`.

Edit under `frontend/src/widgets/polyrender/` (`PolyrenderView.tsx`, `engine.jsx`, `polyrender.css`, …). Vite HMR reloads on save.

Regenerate harness tiles after meshify / sample changes:

```bash
cd frontend && npm run dev:fixture:polyrender
```

## Impeccable live (visual variants)

Requires the dev server above.

```bash
# terminal 1
cd frontend && npm run dev:landmarks

# terminal 2 — repo root
node .agents/skills/impeccable/scripts/live.mjs --target frontend/dev/index.html

# terminal 3 — repo root (poll loop; or ask the agent for $impeccable live)
node .agents/skills/impeccable/scripts/live-poll.mjs
```

Select elements in the browser, generate variants, accept to write source. Live config: `frontend/.impeccable/live/config.json`.

## Notebook integration check

```bash
cd frontend && npm run watch:landmarks
ANYWIDGET_HMR=1 uv run --extra demo marimo edit demos/landmarks.py
```

Uses real AnnData and kernel sync; not a substitute for the harness, but required before release.

Polyrender:

```bash
cd frontend && npm run watch:polyrender
ANYWIDGET_HMR=1 uv run --extra demo --extra polyrender marimo edit demos/polyrender.py
```

## Ship bundles

```bash
cd frontend && npm run build
git add spatial_rx/static/bundled/
```

CI runs the same build; consumers never need Node.

## Cheat sheet

| Goal | Command |
| ---- | ------- |
| Fast Landmarks UI edits | `npm run dev:landmarks` |
| Fast Polyrender UI edits | `npm run dev:polyrender` |
| Refresh Landmarks mock state | `npm run dev:fixture` |
| Refresh Polyrender tiles/fixture | `npm run dev:fixture:polyrender` |
| Live variant mode | Landmarks: `dev:landmarks` + `live.mjs` + `live-poll.mjs` |
| Real data / traitlets | `watch:<widget>` + marimo demo |
| Typecheck | `npm run typecheck` |
| Publish bundles | `npm run build` |

## Harness layout

```
frontend/dev/
├── index.html          Landmarks live inject target
├── main.tsx            mounts HarnessShell (theme toggle + marimo preview)
├── HarnessShell.tsx    notebook context wrapper
├── mock-model.ts       fake traitlets model
├── fixture.json        generated mock state
├── export-fixture.py   regenerate fixture.json
└── polyrender/
    ├── index.html
    ├── main.tsx
    ├── HarnessShell.tsx
    ├── mock-model.ts
    ├── fixture.json        traitlets for Soft Float + Fiber
    ├── export-fixture.py   regenerate tiles + fixture.json
    └── public/             Vite-served tiles.json + *.glb
```

Design authority: `DESIGN.md`, `PRODUCT.md`. Gallery has no harness yet.
