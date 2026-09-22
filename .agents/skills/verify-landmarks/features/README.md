# LandmarksWidget feature map

Poteto-style verification index for agents. Each file maps **one user-visible
capability** to existing Playwright coverage — not a product roadmap.

**CI specs:** `frontend/e2e/landmarks/`  
**Harness docs:** [`frontend/e2e/README.md`](../../../frontend/e2e/README.md)  
**Skill entrypoint:** [`../SKILL.md`](../SKILL.md)

## Mapped features

| Feature | Spec source | Visual anchor |
| --- | --- | --- |
| [chrome-rest](chrome-rest.md) | `landmarks.spec.ts` — zoom test preamble | `rest` |
| [zoom-controls](zoom-controls.md) | `landmarks.spec.ts` — `"zoom in/out/reset buttons change viewState"` | (uses `rest` before zoom) |
| [place-landmark-point](place-landmark-point.md) | `landmarks.spec.ts` — `"landmark point authoring happy path"` | `after-place-point` |
| [place-landmark-line](place-landmark-line.md) | `landmarks.spec.ts` — `"line drag places a two-vertex landmark"` | — |
| [place-spline-shape](place-spline-shape.md) | `landmarks.spec.ts` — `"spline and shape are click-to-add only"` | — |
| [selection-neighborhood](selection-neighborhood.md) | `landmarks.spec.ts` — Shift+wheel + radius vs knn overlay | `selection-neighborhood` |
| [pointer-or-select-modes](pointer-or-select-modes.md) | `landmarks.spec.ts` — `"Select / Node / Move / Probe and lasso geometry control"` | — |
| [landmark-edit-node](landmark-edit-node.md) | `landmarks-tools.spec.ts` — `"node mode: drag a vertex, insert via midpoint, then delete"` | — |
| [landmark-undo](landmark-undo.md) | `landmarks-tools.spec.ts` — `"Mod+Z undoes the last landmark geometry edit"` | — |

## Not yet mapped (spec exists, no feature file)

These tests in `landmarks.spec.ts` / `landmarks-tools.spec.ts` have e2e coverage but
no dedicated feature file yet. Extend the map when agents routinely need them:

- Selection overlay highlight without persisted outline
- Inspect pin via model + Esc clears
- Landmark chrome lacks copy/paste / SpatialData LED
- Info panel chart well visible
- Context toolbar dock + buffer/line-style edits
- Context toolbar promote from selection neighborhood
- Point/shape buffer promote, reverse/convert landmark (tools.spec)

## Adding a feature

1. Confirm a spec exists under `frontend/e2e/landmarks/`.
2. Copy an existing feature file shape (four H2 sections).
3. Cite real `getByRole` names, helpers from `frontend/e2e/helpers.ts`, and traitlet keys.
4. Link the spec test title and any named screenshot from the e2e README.
