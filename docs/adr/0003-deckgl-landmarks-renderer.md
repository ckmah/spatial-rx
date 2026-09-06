# deck.gl landmarks renderer

## Context

Microscope coordinates (µm, pixel indices) need pan/zoom scatter and landmark
authoring without geospatial projection hacks. LandmarksWidget separates UI
state (selections, landmarks, modes) from the renderer. A second 2D canvas
camera drifted from the deck.gl viewport (zoom scale, Y flip).

## Decision

One `Deck` in orthographic cartesian space owns all geometry:

- Points: `ScatterplotLayer`
- Selections and shape/buffer fills: `PolygonLayer` (fill + stroke)
- Lines/splines: `PathLayer`
- Vertices, point landmarks, drafts, rotate handle: `ScatterplotLayer` / `PathLayer`

Drafts are short-lived layers updated on pointer move. Pointer events hit the
WebGL canvas; world coordinates come from `viewport.unproject`. Pan is the
orthographic controller in select mode. Hover tips use Deck `getTooltip`.

Implementation lives in `landmarks.js` (deck.gl engine, `mountEngine`) bundled
with React/shadcn chrome. Deck modules come from package pins
in `frontend/package.json` (core/layers/widgets 9.1.14) and are inlined
by Vite into the landmarks bundle.

React hands `mountEngine` one empty plot-slot `host` plus the anywidget `model`.
The engine creates canvas and legend under that host and finds the
`.landmarks` shell via `closest` for theme and sizing. Chrome (topbar, panels,
zoom) stays outside the host and talks to traitlets only through
`useLandmarksModel` (state + domain actions). Shared write recipes live in
`landmarks_state.js` so engine and chrome do not duplicate them; pointer-driven
create/update stays in the engine.

Hover tips use Deck `getTooltip` instead of engine-owned tooltip DOM.
Zoom/reset behavior uses stock `@deck.gl/widgets` `ZoomWidget` /
`ResetViewWidget` (hidden DOM) behind `EngineHandle.zoomBy` /
`resetZoom`; React/shadcn chrome keeps the visible controls.

## Consequences

- One entry point: `LandmarksWidget.from_points(x, y, ...)`.
- Future image layers compose under the same `Deck`.
- Landmark styling follows default deck.gl layer aesthetics (no canvas halo or
  arrowhead overlay).
- Bumping the renderer means changing the exact pin in `frontend/package.json`
  and rebuilding bundles.
