# landmark-edit-node

Node mode: drag vertices, insert at segment midpoint, delete vertex; Esc returns to Select.

**Spec:** `frontend/e2e/landmarks/landmarks-tools.spec.ts` — `"node mode: drag a vertex, insert via midpoint, then delete"`

## Sub-features

- Enter Node mode on a selected line Landmark
- Drag first vertex to new world coordinates
- Click segment midpoint inserts a vertex
- Delete removes active vertex; double Esc → Select mode; Delete removes landmark

## How to get to it (user POV)

Select a **Landmark** (e.g. a line), switch to **Node** mode, then drag vertices on
the canvas. Click the midpoint of a segment to insert a new vertex. **Delete** removes
the active vertex. Press **Esc** to clear the active node, **Esc** again to leave Node
mode for Select.

## Driving it with Playwright

The spec seeds a line landmark and uses `calibrate(page)` for world→screen mapping:

```ts
await page.getByRole("radio", { name: "Node", exact: true }).click();
expect(await getModel(page, "mode")).toBe("node");

// Drag vertex (worldToScreen from calibrate helper in spec):
await page.mouse.move(from.x, from.y);
await page.mouse.down();
await page.mouse.move(to.x, to.y, { steps: 6 });
await page.mouse.up();
// landmarks[0].vertices[0] near target world coords

// Insert at midpoint:
await page.mouse.click(midScreen.x, midScreen.y);
// landmarks[0].vertices.length === 3

await page.keyboard.press("Delete");
// vertices.length back to 2

await page.keyboard.press("Escape");
await page.keyboard.press("Escape");
expect(await getModel(page, "mode")).toBe("select");
```

Seed via `setModel`:

```ts
await setModel(page, {
  landmarks: [{ id: "lm-edit", type: "line", vertices: [v0, v1], ... }],
  selected_kind: "landmark",
  selected_index: 0,
});
```

Helpers: `bootLandmarksHarness`, `setModel`, `getModel`, `canvasBox`; spec-local
`calibrate(page)` and `bounds(page)` in `landmarks-tools.spec.ts`.

Selectors: `getByRole("radio", { name: "Node", exact: true })`.

Engine: `__landmarksEngine.getViewportWorldBounds()` for calibration.

Model keys: `landmarks`, `mode`, `selected_kind`, `selected_index`.

**Proof**

- Vertex drag: `landmarks[0].vertices[0]` matches target within tolerance (`toBeCloseTo(..., -1)`).
- Midpoint click: vertex count 2 → 3.
- Delete: vertex count 3 → 2; after Esc×2 + Delete landmark: `landmarks.length === 0`.

## Gotchas

- Node interactions require **Node** mode — Select mode never hit-tests vertices.
- `calibrate` places a temporary Point to detect Y-axis flip for screen/world mapping; it cleans up via `setModel`.
- First Esc clears active node; second Esc exits Node → Select — order matters.
