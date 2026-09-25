import { expect, test } from "@playwright/test";

import {
  bootLandmarksHarness,
  canvasBox,
  getModel,
  getZoom,
  setModel,
  shot,
} from "../helpers";

/**
 * Landmarks widget tier — functional coverage + 3 visual anchors:
 * rest chrome, selection+neighborhood, authoring commit.
 */
test.describe("LandmarksWidget", () => {
  test.beforeEach(async ({ page }) => {
    await bootLandmarksHarness(page);
  });

  test("zoom in/out/reset buttons change viewState", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    await shot(page, "rest", widget);

    const baseline = await getZoom(page);
    await page.getByRole("button", { name: "Zoom in" }).click();
    await page.waitForTimeout(350);
    const afterIn = await getZoom(page);
    expect(afterIn).toBeGreaterThan(baseline);

    await page.getByRole("button", { name: "Zoom out" }).click();
    await page.waitForTimeout(350);
    const afterOut = await getZoom(page);
    expect(afterOut).toBeLessThan(afterIn);

    await page.getByRole("button", { name: "Reset view" }).click();
    await page.waitForTimeout(450);
    const afterReset = await getZoom(page);
    expect(Math.abs(afterReset - baseline)).toBeLessThan(0.35);
  });

  test("landmark point authoring happy path", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    const before = ((await getModel(page, "landmarks")) as unknown[]).length;
    await page.getByRole("radio", { name: "Point", exact: true }).click();
    await page.waitForTimeout(150);

    const box = await canvasBox(page);
    await page.mouse.click(box.x + box.width * 0.55, box.y + box.height * 0.45);
    await page.waitForTimeout(250);
    const after = (await getModel(page, "landmarks")) as any[];
    expect(after.length).toBe(before + 1);
    expect(after[after.length - 1].type).toBe("point");
    expect(after[after.length - 1].vertices?.length).toBe(1);
    await shot(page, "after-place-point", widget);
  });

  test("line drag places a two-vertex landmark", async ({ page }) => {
    const before = ((await getModel(page, "landmarks")) as unknown[]).length;
    await page.getByRole("radio", { name: "Line", exact: true }).click();
    await page.waitForTimeout(150);

    const box = await canvasBox(page);
    const x0 = box.x + box.width * 0.35;
    const y0 = box.y + box.height * 0.4;
    const x1 = box.x + box.width * 0.65;
    const y1 = box.y + box.height * 0.55;

    await page.mouse.move(x0, y0);
    await page.mouse.down();
    await page.mouse.move(x1, y1, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(200);

    const landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(before + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("line");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(2);
  });

  test("spline and shape are click-to-add only (no drag stroke)", async ({
    page,
  }) => {
    const box = await canvasBox(page);

    await page.getByRole("radio", { name: "Spline", exact: true }).click();
    await page.waitForTimeout(100);
    const beforeSpline = ((await getModel(page, "landmarks")) as unknown[])
      .length;
    const sx0 = box.x + box.width * 0.3;
    const sy0 = box.y + box.height * 0.3;
    await page.mouse.move(sx0, sy0);
    await page.mouse.down();
    await page.mouse.move(sx0 + 80, sy0 + 40, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(150);
    let landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeSpline);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(80);

    await page.mouse.click(box.x + box.width * 0.32, box.y + box.height * 0.32);
    await page.mouse.click(box.x + box.width * 0.48, box.y + box.height * 0.28);
    await page.waitForTimeout(80);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeSpline + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("spline");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(2);

    await page.getByRole("radio", { name: "Shape", exact: true }).click();
    await page.waitForTimeout(100);
    const beforeShape = landmarks.length;
    await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.35);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, {
      steps: 8,
    });
    await page.mouse.up();
    await page.waitForTimeout(100);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeShape);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(80);

    await page.mouse.click(box.x + box.width * 0.6, box.y + box.height * 0.35);
    await page.mouse.click(box.x + box.width * 0.72, box.y + box.height * 0.38);
    await page.mouse.click(box.x + box.width * 0.66, box.y + box.height * 0.52);
    await page.waitForTimeout(80);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeShape + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("shape");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(3);
  });

  test("shift+wheel neighborhood increments and decrements", async ({
    page,
  }) => {
    const widget = page.locator(".landmarks").first();
    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(200);
    await shot(page, "selection-neighborhood", widget);

    const box = await canvasBox(page);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);

    const readRadius = async () => {
      const sels = (await getModel(page, "selections")) as any[];
      return Number(sels[0].neighborhood_radius);
    };

    const start = await readRadius();
    await page.keyboard.down("Shift");
    await page.mouse.wheel(0, -120);
    await page.waitForTimeout(100);
    const afterUp = await readRadius();
    expect(afterUp).toBeGreaterThan(start);

    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(100);
    const afterDown = await readRadius();
    expect(afterDown).toBeLessThan(afterUp);

    const mid = afterDown;
    await page.mouse.wheel(-120, 0);
    await page.waitForTimeout(100);
    const afterXUp = await readRadius();
    expect(afterXUp).toBeGreaterThan(mid);
    await page.mouse.wheel(120, 0);
    await page.waitForTimeout(100);
    const afterXDown = await readRadius();
    expect(afterXDown).toBeLessThan(afterXUp);
    await page.keyboard.up("Shift");
  });

  test("radius shows soft gradient not disks/edges; knn shows edges", async ({
    page,
  }) => {
    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(200);
    let hood = await page.evaluate(() =>
      (window as any).__landmarksEngine.getNeighborhoodOverlay(),
    );
    expect(hood.mode).toBe("radius");
    expect(hood.radiusGradient).toBe(true);
    expect(hood.gradientKind).toBe("bitmap");
    expect(hood.gradientSeedCount).toBeGreaterThan(0);
    expect(hood.radiusDiskCount).toBe(0);
    expect(hood.edgeCount).toBe(0);
    expect(hood.radius).toBeGreaterThan(0);
    expect(hood.gradientBakeRadius).toBeGreaterThanOrEqual(hood.radius);
    expect(hood.gradientTextureSize?.[0]).toBeGreaterThan(0);
    expect(hood.gradientBounds?.length).toBe(4);

    const sels = (await getModel(page, "selections")) as any[];
    const next = [...sels];
    next[0] = {
      ...next[0],
      neighborhood: "knn",
      neighborhood_k: 8,
    };
    await setModel(page, {
      selections: next,
      selected_kind: "selection",
      selected_index: 0,
    });
    await page.waitForTimeout(250);
    hood = await page.evaluate(() =>
      (window as any).__landmarksEngine.getNeighborhoodOverlay(),
    );
    expect(hood.mode).toBe("knn");
    expect(hood.edgeCount).toBeGreaterThan(0);
    expect(hood.radiusGradient).toBe(false);
    expect(hood.radiusDiskCount).toBe(0);
  });

  test("selection points highlight without persisted outline", async ({
    page,
  }) => {
    await setModel(page, { selected_kind: "landmark", selected_index: 0 });
    await page.waitForTimeout(150);
    let overlay = await page.evaluate(() =>
      (window as any).__landmarksEngine.getSelectionOverlay(),
    );
    expect(overlay.length).toBeGreaterThan(0);
    for (const row of overlay) {
      expect(row.selected).toBe(false);
      expect(row.lineWidth).toBe(0);
      expect(row.lineAlpha).toBe(0);
    }

    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(150);
    overlay = await page.evaluate(() =>
      (window as any).__landmarksEngine.getSelectionOverlay(),
    );
    const active = overlay.find((r: any) => r.index === 0);
    expect(active?.selected).toBe(true);
    expect(active?.pointCount).toBeGreaterThan(0);
    expect(active?.lineWidth).toBe(0);
    expect(active?.lineAlpha).toBe(0);
  });

  test("Select / Node / Move / Probe and lasso geometry control", async ({ page }) => {
    await expect(
      page.getByRole("radio", { name: "Select", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Node", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Move", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Probe", exact: true }),
    ).toBeVisible();

    // Geometry is a right-click menu on the lasso button, not a ModeToggle radio.
    await expect(
      page.getByRole("radio", { name: "Selection", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /Lasso/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /Lasso/i }).click();
    await page.waitForTimeout(150);
    expect(await getModel(page, "mode")).toBe("lasso");

    await page.getByRole("radio", { name: "Move", exact: true }).click();
    await page.waitForTimeout(100);
    expect(await getModel(page, "mode")).toBe("move");

    await page.getByRole("radio", { name: "Probe", exact: true }).click();
    await page.waitForTimeout(100);
    expect(await getModel(page, "mode")).toBe("probe");

    await page.getByRole("radio", { name: "Node", exact: true }).click();
    await page.waitForTimeout(100);
    expect(await getModel(page, "mode")).toBe("node");

    await page.getByRole("radio", { name: "Select", exact: true }).click();
    await page.waitForTimeout(100);
    expect(await getModel(page, "mode")).toBe("select");
  });

  test("select pin via model + Esc clears", async ({ page }) => {
    await page.getByRole("radio", { name: "Select", exact: true }).click();
    await setModel(page, { selected_kind: "", selected_index: -1 });
    await page.waitForTimeout(150);

    await setModel(page, { selected_kind: "molecule", selected_index: 0 });
    await page.waitForTimeout(200);
    let pin = await page.evaluate(() =>
      (window as any).__landmarksEngine.getInspectPin(),
    );
    expect(pin).toEqual({ kind: "molecule", index: 0 });

    await page.locator("canvas.landmarks__webgl").first().focus();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);
    pin = await page.evaluate(() =>
      (window as any).__landmarksEngine.getInspectPin(),
    );
    expect(pin).toBeNull();
    expect(await getModel(page, "selected_kind")).toBe("");
  });

  test("Inspect without a 3D image places the square and opens no cube", async ({ page }) => {
    await page.getByRole("radio", { name: "Inspect", exact: true }).click();
    await expect(page.getByTestId("context-inspect-no-volume")).toHaveText("No 3D image in this SpatialData");
    const box = await canvasBox(page);
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await expect.poll(async () => getModel(page, "inspect_cx")).not.toBeNull();
    await expect(page.getByRole("dialog", { name: "Cube" })).toHaveCount(0);
    await page.getByRole("radio", { name: "Select", exact: true }).click();
    await expect(page.getByTestId("context-inspect-no-volume")).toHaveCount(0);
  });

  test("landmark chrome has no copy/paste or SpatialData LED", async ({
    page,
  }) => {
    await setModel(page, {
      landmarks: [
        {
          id: "lm-spline",
          type: "spline",
          vertices: [
            [2500, 800],
            [2700, 1000],
            [2900, 800],
          ],
          tension: 0.2,
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
    });
    await page.waitForTimeout(200);

    await expect(page.getByRole("button", { name: "Copy landmark" })).toHaveCount(
      0,
    );
    await expect(
      page.getByRole("button", { name: "Paste landmark" }),
    ).toHaveCount(0);
    await expect(page.getByTestId("save-landmarks")).toHaveCount(0);
    await expect(page.getByTestId("spatialdata-led")).toHaveCount(0);
  });

  test("info panel chart well is visible", async ({ page }) => {
    await page.waitForTimeout(200);
    await expect(page.getByTestId("info-panel")).toBeVisible();
    await expect(page.getByTestId("info-chart-well")).toBeVisible();
  });

  test("context toolbar docks at bottom center for selected landmark", async ({
    page,
  }) => {
    await setModel(page, {
      landmarks: [
        {
          id: "lm-line",
          type: "line",
          vertices: [
            [2500, 800],
            [2800, 1000],
          ],
          buffer_width: 40,
          buffer_side: "both",
          line_style: "solid",
          color: "#00e5ff",
        },
      ],
      selected_kind: "landmark",
      selected_index: 0,
    });
    await page.waitForTimeout(300);

    const bar = page.getByTestId("context-selection-toolbar");
    await expect(bar).toBeVisible();
    await expect(bar).toHaveAttribute("data-placement", "dock");

    const widget = page.locator(".landmarks").first();
    const widgetBox = await widget.boundingBox();
    const box = await bar.boundingBox();
    expect(box).toBeTruthy();
    expect(widgetBox).toBeTruthy();
    expect(box!.y + box!.height).toBeGreaterThan(
      widgetBox!.y + widgetBox!.height * 0.6,
    );

    await page.getByTestId("context-line-style").click();
    await page.waitForTimeout(100);
    const landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].line_style).toBe("dashed");

    await page.getByTestId("context-buffer-toggle").click();
    await page.waitForTimeout(100);
    await expect(page.getByTestId("context-buffer-panel")).toBeVisible();
    await page.getByTestId("context-buffer-both").click();
    await page.waitForTimeout(100);
    const after = (await getModel(page, "landmarks")) as any[];
    expect(after[0].buffer_side).toBe("right");
  });

  test("context toolbar promote from selection neighborhood", async ({
    page,
  }) => {
    await setModel(page, {
      selected_kind: "selection",
      selected_index: 0,
      selections: [
        {
          id: "lasso-1",
          type: "polygon",
          vertices: [
            [2800, 600],
            [3100, 600],
            [3100, 900],
            [2800, 900],
          ],
          neighborhood: "knn",
          neighborhood_k: 4,
        },
      ],
    });
    await page.waitForTimeout(200);

    const bar = page.getByTestId("context-selection-toolbar");
    await expect(bar).toBeVisible();
    await expect(page.getByTestId("context-hood-knn-mode")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    const before = ((await getModel(page, "selections")) as any[]).length;
    await page.getByTestId("promote-neighborhood").click();
    await page.waitForTimeout(200);
    expect(await getModel(page, "promote_tick")).toBeGreaterThan(0);
    expect(
      ((await getModel(page, "selections")) as any[]).length,
    ).toBeGreaterThanOrEqual(before);
  });
});
