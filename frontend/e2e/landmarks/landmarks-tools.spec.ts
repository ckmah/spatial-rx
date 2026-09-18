import { expect, test, type Page } from "@playwright/test";

import { bootLandmarksHarness, canvasBox, getModel, setModel } from "../helpers";

/**
 * Landmark tool-completeness coverage: point/shape buffers, node editing
 * (drag / insert / delete vertex), extend, undo, and the buffer↔selection
 * promote/convert round trips. These exercise the engine (landmarks.js)
 * directly via `window.__landmarksEngine` / `window.__landmarksModel`, since
 * several of these are chrome-agnostic capabilities exposed on the handle.
 */
test.describe("LandmarksWidget tool completeness", () => {
  test.beforeEach(async ({ page }) => {
    await bootLandmarksHarness(page);
  });

  async function bounds(page: Page) {
    const [xMin, xMax] = (await getModel(page, "x_bounds")) as [number, number];
    const [yMin, yMax] = (await getModel(page, "y_bounds")) as [number, number];
    return { xMin, xMax, yMin, yMax, spanX: xMax - xMin, spanY: yMax - yMin };
  }

  /**
   * Derive the screen<->world mapping for the current (unrotated,
   * axis-aligned) orthographic view. The scale/offset come from the engine's
   * own `getViewportWorldBounds()` (deck.gl `viewport.unproject`, exact — no
   * click round-trip error); a single point placement is only used to
   * disambiguate the y-axis sign, since we don't assume deck.gl's
   * screen/world y orientation.
   */
  async function calibrate(page: Page) {
    const box = await canvasBox(page);
    const [xMin, yMin, xMax, yMax] = (await page.evaluate(() =>
      (window as any).__landmarksEngine.getViewportWorldBounds(),
    )) as [number, number, number, number];

    const before = ((await getModel(page, "landmarks")) as unknown[]).length;
    await page.getByRole("radio", { name: "Point", exact: true }).click();
    await page.waitForTimeout(80);
    const sample = { fx: 0.3, fy: 0.35 };
    await page.mouse.click(box.x + box.width * sample.fx, box.y + box.height * sample.fy);
    await page.waitForTimeout(80);

    const landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(before + 1);
    const [, wy] = landmarks[landmarks.length - 1].vertices[0];
    const predictedNoFlip = yMin + sample.fy * (yMax - yMin);
    const predictedFlip = yMax - sample.fy * (yMax - yMin);
    const flipY = Math.abs(wy - predictedFlip) < Math.abs(wy - predictedNoFlip);

    await setModel(page, {
      landmarks: landmarks.slice(0, before),
      selected_kind: "",
      selected_index: -1,
    });
    await page.getByRole("radio", { name: "Pointer", exact: true }).click();
    await page.waitForTimeout(80);
    return {
      worldToScreen: (wx: number, worldY: number) => ({
        x: box.x + ((wx - xMin) / (xMax - xMin)) * box.width,
        y: flipY
          ? box.y + ((yMax - worldY) / (yMax - yMin)) * box.height
          : box.y + ((worldY - yMin) / (yMax - yMin)) * box.height,
      }),
    };
  }

  test("point buffer promotes contained points to a selection", async ({
    page,
  }) => {
    await setModel(page, {
      landmarks: [
        {
          id: "seed-point",
          type: "point",
          vertices: [[2650, 320]],
          buffer_width: 80,
          buffer_side: "both",
          line_style: "solid",
          color: "#00e5ff",
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
      selections: [],
    });
    await page.waitForTimeout(200);

    const before = ((await getModel(page, "selections")) as unknown[]).length;
    await setModel(page, {
      promote_buffer_tick: ((await getModel(page, "promote_buffer_tick")) as number || 0) + 1,
    });
    await page.waitForTimeout(200);

    expect(await getModel(page, "promote_buffer_tick")).toBeGreaterThan(0);
    const selections = (await getModel(page, "selections")) as any[];
    expect(selections.length).toBe(before + 1);
    expect(selections[selections.length - 1].point_indices.length).toBeGreaterThan(0);
    const landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].buffer_width).toBe(0);
  });

  test("shape buffer side (out/in/both) shapes the promoted selection", async ({
    page,
  }) => {
    const { xMin, spanX, yMin, spanY } = await bounds(page);
    const tri = [
      [xMin + spanX * 0.35, yMin + spanY * 0.25],
      [xMin + spanX * 0.55, yMin + spanY * 0.25],
      [xMin + spanX * 0.45, yMin + spanY * 0.45],
    ];

    async function promoteCount(side: string) {
      await setModel(page, {
        landmarks: [
          {
            id: "shape-1",
            type: "shape",
            vertices: tri,
            tension: 0,
            buffer_width: spanX * 0.06,
            buffer_side: side,
            line_style: "solid",
            color: "#ff2d95",
          },
        ],
        selected_kind: "landmark",
        selected_index: 0,
        selections: [],
      });
      await page.waitForTimeout(150);
      await setModel(page, {
        promote_buffer_tick: ((await getModel(page, "promote_buffer_tick")) as number || 0) + 1,
      });
      await page.waitForTimeout(150);
      const selections = (await getModel(page, "selections")) as any[];
      return selections[selections.length - 1]?.point_indices?.length ?? 0;
    }

    const outCount = await promoteCount("out");
    const inCount = await promoteCount("in");
    const bothCount = await promoteCount("both");

    // "both" spans the full [-width, +width] corridor, so it is a superset of
    // (or equal to) either single-sided corridor for a convex shape.
    expect(bothCount).toBeGreaterThanOrEqual(inCount);
    expect(bothCount).toBeGreaterThanOrEqual(outCount);
    expect(bothCount).toBeGreaterThan(0);
  });

  test("selection → landmark: point selection becomes a hull shape/line/point", async ({
    page,
  }) => {
    await setModel(page, {
      landmarks: [],
      selections: [
        {
          id: "sel-1",
          type: "points",
          point_indices: [0, 1, 2, 3, 4, 5, 6, 7],
          neighborhood: "off",
        },
      ],
      selected_kind: "selection",
      selected_index: 0,
    });
    await page.waitForTimeout(150);

    await setModel(page, {
      selection_to_landmark_tick:
        ((await getModel(page, "selection_to_landmark_tick")) as number || 0) + 1,
    });
    await page.waitForTimeout(150);

    const landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(1);
    expect(["point", "line", "shape"]).toContain(landmarks[0].type);
    expect(await getModel(page, "selected_kind")).toBe("landmark");
  });

  test("reverse and convert the selected landmark via engine handle", async ({
    page,
  }) => {
    await setModel(page, {
      landmarks: [
        {
          id: "lm-line",
          type: "line",
          vertices: [
            [2500, 300],
            [2700, 500],
          ],
          buffer_width: 20,
          buffer_side: "left",
          line_style: "solid",
          color: "#00e5ff",
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
    });
    await page.waitForTimeout(150);

    await page.evaluate(() => (window as any).__landmarksEngine.reverseSelectedLandmark());
    await page.waitForTimeout(100);
    let landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].vertices).toEqual([
      [2700, 500],
      [2500, 300],
    ]);
    expect(landmarks[0].buffer_side).toBe("right");

    await page.evaluate(() =>
      (window as any).__landmarksEngine.convertSelectedLandmark("spline"),
    );
    await page.waitForTimeout(100);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].type).toBe("spline");
    expect(landmarks[0].tension).toBe(0);
  });

  test("Mod+Z undoes the last landmark geometry edit", async ({ page }) => {
    await setModel(page, {
      landmarks: [
        {
          id: "lm-nudge",
          type: "point",
          vertices: [[2650, 320]],
          line_style: "solid",
          color: "#00e5ff",
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
    });
    await page.waitForTimeout(150);
    const box = await canvasBox(page);
    // Click a spot far from the point landmark to focus the canvas without
    // hitting/dragging it (pointer mode ignores clicks that miss a landmark).
    await page.mouse.click(box.x + box.width * 0.05, box.y + box.height * 0.9);
    await page.waitForTimeout(80);
    await setModel(page, { selected_kind: "landmark", selected_index: 0 });
    await page.waitForTimeout(80);

    const before = ((await getModel(page, "landmarks")) as any[])[0].vertices[0];
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);
    const nudged = ((await getModel(page, "landmarks")) as any[])[0].vertices[0];
    expect(nudged[0]).not.toBeCloseTo(before[0], 5);

    const mod = process.platform === "darwin" ? "Meta" : "Control";
    await page.keyboard.press(`${mod}+z`);
    await page.waitForTimeout(100);
    const reverted = ((await getModel(page, "landmarks")) as any[])[0].vertices[0];
    expect(reverted[0]).toBeCloseTo(before[0], 5);
    expect(reverted[1]).toBeCloseTo(before[1], 5);
  });

  test("pointer mode: drag a vertex, insert via midpoint, then delete", async ({
    page,
  }) => {
    const { worldToScreen } = await calibrate(page);
    const { xMin, spanX, yMin, spanY } = await bounds(page);
    const v0: [number, number] = [xMin + spanX * 0.3, yMin + spanY * 0.3];
    const v1: [number, number] = [xMin + spanX * 0.7, yMin + spanY * 0.3];

    await setModel(page, {
      landmarks: [
        {
          id: "lm-edit",
          type: "line",
          vertices: [v0, v1],
          line_style: "solid",
          color: "#00e5ff",
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
    });
    await page.waitForTimeout(150);

    // Drag the first vertex to a new world position.
    const target: [number, number] = [xMin + spanX * 0.35, yMin + spanY * 0.45];
    const from = worldToScreen(v0[0], v0[1]);
    const to = worldToScreen(target[0], target[1]);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(to.x, to.y, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(150);

    let landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].vertices[0][0]).toBeCloseTo(target[0], -1);
    expect(landmarks[0].vertices[0][1]).toBeCloseTo(target[1], -1);
    expect(landmarks[0].vertices.length).toBe(2);

    // Click the segment midpoint to insert a new vertex.
    const midWorld: [number, number] = [
      (landmarks[0].vertices[0][0] + landmarks[0].vertices[1][0]) / 2,
      (landmarks[0].vertices[0][1] + landmarks[0].vertices[1][1]) / 2,
    ];
    const midScreen = worldToScreen(midWorld[0], midWorld[1]);
    await page.mouse.click(midScreen.x, midScreen.y);
    await page.waitForTimeout(150);

    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].vertices.length).toBe(3);

    // The inserted vertex is active — Delete removes just that vertex.
    await page.keyboard.press("Delete");
    await page.waitForTimeout(100);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(1);
    expect(landmarks[0].vertices.length).toBe(2);

    // With no active vertex, Delete removes the whole landmark.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(80);
    await setModel(page, { selected_kind: "landmark", selected_index: 0 });
    await page.waitForTimeout(80);
    await page.keyboard.press("Delete");
    await page.waitForTimeout(100);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(0);
  });

  test("the legacy `locked` field no longer blocks nudge or drag edits", async ({
    page,
  }) => {
    const { worldToScreen } = await calibrate(page);
    const { xMin, spanX, yMin, spanY } = await bounds(page);
    const v0: [number, number] = [xMin + spanX * 0.3, yMin + spanY * 0.3];
    const v1: [number, number] = [xMin + spanX * 0.7, yMin + spanY * 0.3];

    await setModel(page, {
      landmarks: [
        {
          id: "lm-locked",
          type: "line",
          vertices: [v0, v1],
          locked: true,
          line_style: "solid",
          color: "#00e5ff",
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
    });
    await page.waitForTimeout(150);
    const widget = page.locator(".landmarks").first();
    await widget.click({ position: { x: 5, y: 5 } });
    await setModel(page, { selected_kind: "landmark", selected_index: 0 });
    await page.waitForTimeout(80);

    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);
    let landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].vertices[0][0]).not.toBeCloseTo(v0[0], 5);

    const from = worldToScreen(landmarks[0].vertices[0][0], landmarks[0].vertices[0][1]);
    const to = worldToScreen(v0[0] + spanX * 0.1, v0[1] + spanY * 0.1);
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(to.x, to.y, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(100);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].vertices[0][0]).toBeCloseTo(v0[0] + spanX * 0.1, -1);
    expect(landmarks[0].vertices[0][1]).toBeCloseTo(v0[1] + spanY * 0.1, -1);
  });
});
