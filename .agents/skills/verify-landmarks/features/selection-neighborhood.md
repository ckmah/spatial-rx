# selection-neighborhood

Focused Selection neighborhood: Shift+wheel adjusts radius; radius mode shows gradient overlay, k-NN shows edges.

**Spec:** `frontend/e2e/landmarks/landmarks.spec.ts` —  
`"shift+wheel neighborhood increments and decrements"`,  
`"radius shows soft gradient not disks/edges; knn shows edges"`,  
`"selection points highlight without persisted outline"` (overlay half)

## Sub-features

- Focus a Selection via synced `selected_kind` / `selected_index`
- Shift + vertical or horizontal wheel changes `selections[i].neighborhood_radius`
- Radius neighborhood: gradient bitmap overlay, no k-NN edges
- k-NN neighborhood: `edgeCount > 0`, no radius gradient
- Active selection highlights points without a persisted outline stroke

## How to get to it (user POV)

Create or focus a **Selection** on the widget (lasso/polygon region). With the
selection focused, hold **Shift** and scroll the mouse wheel over the canvas to grow
or shrink the neighborhood radius. Switch neighborhood mode between radius and k-NN
(in chrome or via model) to change how neighbors are visualized.

## Driving it with Playwright

**Focus selection + Shift+wheel:**

```ts
await setModel(page, { selected_kind: "selection", selected_index: 0 });
await page.waitForTimeout(200);
await shot(page, "selection-neighborhood", widget);

const readRadius = async () => {
  const sels = (await getModel(page, "selections")) as any[];
  return Number(sels[0].neighborhood_radius);
};

const box = await canvasBox(page);
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.keyboard.down("Shift");
await page.mouse.wheel(0, -120);  // radius increases
await page.mouse.wheel(0, 120);   // radius decreases
await page.mouse.wheel(-120, 0); // horizontal also works
await page.keyboard.up("Shift");
```

**Overlay probes:**

```ts
let hood = await page.evaluate(() =>
  (window as any).__landmarksEngine.getNeighborhoodOverlay(),
);
// radius mode: hood.mode === "radius", hood.radiusGradient === true,
//   hood.radiusDiskCount === 0, hood.edgeCount === 0

await setModel(page, {
  selections: [{ ...sels[0], neighborhood: "knn", neighborhood_k: 8 }],
  selected_kind: "selection",
  selected_index: 0,
});
hood = await page.evaluate(() =>
  (window as any).__landmarksEngine.getNeighborhoodOverlay(),
);
// knn: hood.mode === "knn", hood.edgeCount > 0, hood.radiusGradient === false
```

**Selection highlight overlay:**

```ts
await setModel(page, { selected_kind: "selection", selected_index: 0 });
const overlay = await page.evaluate(() =>
  (window as any).__landmarksEngine.getSelectionOverlay(),
);
// active row: selected === true, pointCount > 0, lineWidth === 0, lineAlpha === 0
```

Helpers: `bootLandmarksHarness`, `setModel`, `getModel`, `canvasBox`, `shot`.

Model keys: `selections`, `selected_kind`, `selected_index`; per-selection
`neighborhood`, `neighborhood_k`, `neighborhood_radius`.

**Proof**

- Traitlet: `neighborhood_radius` monotonic with wheel direction under Shift.
- Engine: `getNeighborhoodOverlay()` mode/gradient/edge counts per table above.
- Visual: `shot(page, "selection-neighborhood", widget)`.

## Gotchas

- Neighborhood expand runs in the browser (k-NN / radius from coordinates) — no `obsp` graph required.
- Seed data in the harness must include at least one selection at index 0 for these tests.
- Shift must be held during wheel events; release with `keyboard.up("Shift")` when done.
