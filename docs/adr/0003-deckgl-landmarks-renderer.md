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
orthographic controller in select mode.

Implementation lives in `landmarks.js` (deck.gl engine, `mountEngine`) bundled
with React/shadcn chrome, and lazy-loads
`@deck.gl/core` + `@deck.gl/layers` from esm.sh. The layers URL pins
`@deck.gl/core@9.1.14` because bare `^9.1.0` resolves to 9.3.x and breaks luma.

React hands `mountEngine` one empty plot-slot `host` plus the anywidget `model`.
The engine creates canvas / legend / tooltip under that host and finds the
`.landmarks` shell via `closest` for theme and sizing. Chrome (topbar, panels,
zoom) stays outside the host and talks to traitlets only through
`useLandmarksModel` (state + domain actions). Shared write recipes live in
`landmarks_state.js` so engine and chrome do not duplicate them; pointer-driven
create/update stays in the engine.

A vendored bundle is the follow-up if CDN resolution becomes unreliable.

## Consequences

- One entry point: `LandmarksWidget.from_points(x, y, ...)`.
- Future image layers compose under the same `Deck`.
- Landmark styling follows default deck.gl layer aesthetics (no canvas halo or
  arrowhead overlay).
