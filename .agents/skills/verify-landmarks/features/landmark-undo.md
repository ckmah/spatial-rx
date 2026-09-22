# landmark-undo

Mod+Z undoes the last landmark geometry edit (keyboard nudge).

**Spec:** `frontend/e2e/landmarks/landmarks-tools.spec.ts` — `"Mod+Z undoes the last landmark geometry edit"`

## Sub-features

- Arrow-key nudge moves selected point landmark vertex
- Mod+Z (Control+Z on Linux/Windows, Meta+Z on macOS) reverts coordinates

## How to get to it (user POV)

With a **Landmark** selected and focus on the canvas, nudge geometry with arrow keys.
Press **Ctrl+Z** (or **Cmd+Z** on macOS) to undo the last geometry edit.

## Driving it with Playwright

```ts
await setModel(page, {
  landmarks: [{
    id: "lm-nudge",
    type: "point",
    vertices: [[2650, 320]],
    line_style: "solid",
    color: "#00e5ff",
  }],
  selected_kind: "landmark",
  selected_index: 0,
});

const box = await canvasBox(page);
// Click away from landmark to focus canvas without dragging it:
await page.mouse.click(box.x + box.width * 0.05, box.y + box.height * 0.9);
await setModel(page, { selected_kind: "landmark", selected_index: 0 });

const before = ((await getModel(page, "landmarks")) as any[])[0].vertices[0];
await page.keyboard.press("ArrowRight");
const nudged = ((await getModel(page, "landmarks")) as any[])[0].vertices[0];
// nudged[0] !== before[0]

const mod = process.platform === "darwin" ? "Meta" : "Control";
await page.keyboard.press(`${mod}+z`);
const reverted = ((await getModel(page, "landmarks")) as any[])[0].vertices[0];
// reverted close to before
```

Helpers: `bootLandmarksHarness`, `setModel`, `getModel`, `canvasBox`.

Model keys: `landmarks`, `selected_kind`, `selected_index`.

**Proof**

- After `ArrowRight`: first vertex X changes (`not.toBeCloseTo(before[0], 5)`).
- After Mod+Z: vertex returns to pre-nudge coordinates (`toBeCloseTo(before[0], 5)` and Y).

## Gotchas

- Click a empty canvas area first — pointer mode ignores clicks that miss a landmark but focus matters for keys.
- Re-select the landmark via `setModel` after the focus click so nudge applies to the seeded point.
- Use platform-correct modifier: `Control` on Linux CI, `Meta` on darwin.
