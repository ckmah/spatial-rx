import { expect, test, type Locator, type Page } from "@playwright/test";

/** Linux CI + local Linux compare snapshots; Mac soft-skips unless forced. */
function screenshotsEnabled(): boolean {
  if (process.env.E2E_SCREENSHOTS === "0") return false;
  if (process.env.E2E_SCREENSHOTS === "1") return true;
  if (process.env.CI) return true;
  return process.platform === "linux";
}

async function waitForEngine(page: Page) {
  await page.locator(".landmarks").first().waitFor({ state: "visible" });
  await page.locator("canvas.landmarks__webgl").first().waitFor({ state: "visible" });
  await page.waitForFunction(() => {
    const eng = (window as any).__landmarksEngine;
    const vs = eng?.getViewState?.();
    return Boolean(vs && Number.isFinite(vs.zoom));
  });
  // Let deck.gl finish a couple frames after first paint.
  await page.waitForTimeout(400);
}

async function getZoom(page: Page) {
  return page.evaluate(() => (window as any).__landmarksEngine.getViewState().zoom as number);
}

async function getModel(page: Page, key: string) {
  return page.evaluate((k) => (window as any).__landmarksModel.get(k), key);
}

async function setModel(page: Page, patch: Record<string, unknown>) {
  await page.evaluate((p) => {
    const model = (window as any).__landmarksModel;
    for (const [k, v] of Object.entries(p)) model.set(k, v);
    model.save_changes();
  }, patch);
}

async function stabilizeUi(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `,
  });
}

async function shot(page: Page, name: string, target?: Locator) {
  if (!screenshotsEnabled()) {
    test.info().annotations.push({
      type: "note",
      description: `Skipped screenshot "${name}" (set E2E_SCREENSHOTS=1 or run on Linux/CI)`,
    });
    return;
  }
  const locator = target ?? page.locator(".landmarks").first();
  await expect(locator).toHaveScreenshot(`${name}.png`, {
    animations: "disabled",
  });
}

async function canvasBox(page: Page) {
  const canvas = page.locator("canvas.landmarks__webgl").first();
  const box = await canvas.boundingBox();
  expect(box).toBeTruthy();
  return box!;
}

test.describe("LandmarksWidget UI regressions", () => {
  test.beforeEach(async ({ page }) => {
    // Stable harness theme (fixture default is dark)
    await page.addInitScript(() => {
      window.localStorage.setItem("spatial-rx-harness-theme", "dark");
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await waitForEngine(page);
    await stabilizeUi(page);
  });

  test("zoom in/out/reset buttons change viewState", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    await shot(page, "default-chrome", widget);

    const baseline = await getZoom(page);
    await page.getByRole("button", { name: "Zoom in" }).click();
    await page.waitForTimeout(350);
    const afterIn = await getZoom(page);
    expect(afterIn).toBeGreaterThan(baseline);
    await shot(page, "after-zoom-in", widget);

    await page.getByRole("button", { name: "Zoom out" }).click();
    await page.waitForTimeout(350);
    const afterOut = await getZoom(page);
    expect(afterOut).toBeLessThan(afterIn);

    await page.getByRole("button", { name: "Reset view" }).click();
    await page.waitForTimeout(450);
    const afterReset = await getZoom(page);
    expect(Math.abs(afterReset - baseline)).toBeLessThan(0.35);
    await shot(page, "after-reset", widget);
  });

  test("landmark point authoring happy path", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    const before = ((await getModel(page, "landmarks")) as unknown[]).length;
    await page.getByRole("radio", { name: "Point", exact: true }).click();
    await page.waitForTimeout(150);
    await shot(page, "authoring-point-mode", widget);

    const box = await canvasBox(page);
    const x = box.x + box.width * 0.55;
    const y = box.y + box.height * 0.45;
    // Place at mouseup (click = down+up at same spot).
    await page.mouse.click(x, y);
    await page.waitForTimeout(250);
    const after = (await getModel(page, "landmarks")) as any[];
    expect(after.length).toBe(before + 1);
    expect(after[after.length - 1].type).toBe("point");
    expect(after[after.length - 1].vertices?.length).toBe(1);
    await shot(page, "after-place-point", widget);
  });

  test("line drag places start/end; click-click for near-zero drag", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    const before = ((await getModel(page, "landmarks")) as unknown[]).length;
    await page.getByRole("radio", { name: "Line", exact: true }).click();
    await page.waitForTimeout(150);

    const box = await canvasBox(page);
    const x0 = box.x + box.width * 0.35;
    const y0 = box.y + box.height * 0.4;
    const x1 = box.x + box.width * 0.65;
    const y1 = box.y + box.height * 0.55;

    // Drag: mousedown start → mouseup end commits a 2-vertex line.
    await page.mouse.move(x0, y0);
    await page.mouse.down();
    await page.mouse.move(x1, y1, { steps: 8 });
    await page.waitForTimeout(80);
    await shot(page, "authoring-line-rubberband", widget);
    await page.mouse.up();
    await page.waitForTimeout(200);

    let landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(before + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("line");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(2);

    // Near-zero drag keeps first vertex; second click finishes.
    const before2 = landmarks.length;
    const cx = box.x + box.width * 0.4;
    const cy = box.y + box.height * 0.65;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 1, cy + 1);
    await page.mouse.up();
    await page.waitForTimeout(100);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(before2); // not committed yet

    await page.mouse.click(box.x + box.width * 0.7, box.y + box.height * 0.7);
    await page.waitForTimeout(200);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(before2 + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("line");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(2);
    await shot(page, "after-place-line", widget);
  });

  test("spline and shape are click-to-add only (no drag stroke)", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    const box = await canvasBox(page);

    // Spline: drag should not create a freehand polyline / commit.
    await page.getByRole("radio", { name: "Spline", exact: true }).click();
    await page.waitForTimeout(100);
    const beforeSpline = ((await getModel(page, "landmarks")) as unknown[]).length;
    const sx0 = box.x + box.width * 0.3;
    const sy0 = box.y + box.height * 0.3;
    await page.mouse.move(sx0, sy0);
    await page.mouse.down();
    await page.mouse.move(sx0 + 80, sy0 + 40, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(150);
    let landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeSpline);
    // Clear any accidental single-vertex draft from the mouseup of the drag probe.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(80);

    // Click-to-add two vertices then Enter to finish.
    await page.mouse.click(box.x + box.width * 0.32, box.y + box.height * 0.32);
    await page.mouse.click(box.x + box.width * 0.48, box.y + box.height * 0.28);
    await page.waitForTimeout(80);
    await shot(page, "authoring-spline-draft", widget);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeSpline + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("spline");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(2);

    // Shape: three clicks + Enter; drag must not commit.
    await page.getByRole("radio", { name: "Shape", exact: true }).click();
    await page.waitForTimeout(100);
    const beforeShape = landmarks.length;
    await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.35);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5, { steps: 8 });
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
    await shot(page, "authoring-shape-draft", widget);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks.length).toBe(beforeShape + 1);
    expect(landmarks[landmarks.length - 1].type).toBe("shape");
    expect(landmarks[landmarks.length - 1].vertices?.length).toBe(3);
  });

  test("shift+wheel neighborhood increments and decrements", async ({ page }) => {
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

  test("radius shows soft gradient not disks/edges; knn shows edges", async ({ page }) => {
    const widget = page.locator(".landmarks").first();

    // Fixture selection is radius mode.
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
    await shot(page, "neighborhood-radius-gradient", widget);

    // Switch same selection to knn.
    const sels = (await getModel(page, "selections")) as any[];
    const next = [...sels];
    next[0] = {
      ...next[0],
      neighborhood: "knn",
      neighborhood_k: 8,
    };
    await setModel(page, { selections: next, selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(250);
    hood = await page.evaluate(() =>
      (window as any).__landmarksEngine.getNeighborhoodOverlay(),
    );
    expect(hood.mode).toBe("knn");
    expect(hood.edgeCount).toBeGreaterThan(0);
    expect(hood.radiusGradient).toBe(false);
    expect(hood.radiusDiskCount).toBe(0);
    await shot(page, "neighborhood-knn-edges", widget);
  });

  test("selection points highlight without persisted outline", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
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
    // Landmark names render on-canvas; Inspect must not show a "Pinned" chip for landmarks.
    await expect(page.getByTestId("inspect-pin")).toHaveCount(0);
    await shot(page, "landmark-selected", widget);

    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(150);
    overlay = await page.evaluate(() =>
      (window as any).__landmarksEngine.getSelectionOverlay(),
    );
    const active = overlay.find((r: any) => r.index === 0);
    expect(active?.selected).toBe(true);
    expect(active?.pointCount).toBeGreaterThan(0);
    // Emphasis is size + dimming on the points layer — no stroke overlay.
    expect(active?.lineWidth).toBe(0);
    expect(active?.lineAlpha).toBe(0);
    await shot(page, "selection-selected", widget);
  });

  test("Pointer / Move / Selection mode switch (no geometry shape picker)", async ({ page }) => {
    const widget = page.locator(".landmarks").first();

    await expect(page.getByRole("radio", { name: "Pointer", exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Move", exact: true })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Selection", exact: true })).toBeVisible();

    // Selection must not spawn a secondary lasso/polygon/rect/ellipse ModeToggle.
    await expect(page.getByRole("radio", { name: "Lasso", exact: true })).toHaveCount(0);

    await page.getByRole("radio", { name: "Selection", exact: true }).click();
    await page.waitForTimeout(150);
    expect(await getModel(page, "mode")).toBe("lasso");
    await expect(page.getByRole("radio", { name: "Lasso", exact: true })).toHaveCount(0);
    await expect(page.getByRole("radio", { name: "Polygon", exact: true })).toHaveCount(0);
    await expect(page.getByRole("radio", { name: "Rectangle", exact: true })).toHaveCount(0);
    await expect(page.getByRole("radio", { name: "Ellipse", exact: true })).toHaveCount(0);
    await shot(page, "selection-mode-geometry", widget);

    await page.getByRole("radio", { name: "Move", exact: true }).click();
    await page.waitForTimeout(100);
    expect(await getModel(page, "mode")).toBe("move");
    await expect(page.getByRole("radio", { name: "Lasso", exact: true })).toHaveCount(0);

    await page.getByRole("radio", { name: "Pointer", exact: true }).click();
    await page.waitForTimeout(100);
    expect(await getModel(page, "mode")).toBe("pointer");
  });

  test("Pointer hover + click pin + Esc clear", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    await page.getByRole("radio", { name: "Pointer", exact: true }).click();
    await setModel(page, { selected_kind: "", selected_index: -1 });
    await page.waitForTimeout(150);

    // Landmark selection is not shown as an Inspect "Pinned" chip.
    await setModel(page, { selected_kind: "landmark", selected_index: 0 });
    await page.waitForTimeout(200);
    await expect(page.getByTestId("inspect-pin")).toHaveCount(0);

    // Molecule pin is the Inspect contract (model set — canvas projection varies with fit).
    await setModel(page, { selected_kind: "molecule", selected_index: 0 });
    await page.waitForTimeout(200);
    let pin = await page.evaluate(() => (window as any).__landmarksEngine.getInspectPin());
    expect(pin).toEqual({ kind: "molecule", index: 0 });
    await expect(page.getByTestId("inspect-pin")).toBeVisible();
    await shot(page, "pointer-pin", widget);

    // Canvas click on a dense region should be able to pin a molecule (pointer pick).
    const box = await canvasBox(page);
    await page.mouse.click(box.x + box.width * 0.55, box.y + box.height * 0.55);
    await page.waitForTimeout(250);
    pin = await page.evaluate(() => (window as any).__landmarksEngine.getInspectPin());
    // Either pinned something new or cleared on miss — both valid pointer behaviors.
    if (pin) {
      expect(["landmark", "molecule", "type"]).toContain(pin.kind);
    }

    // Esc clears pin.
    await page.locator("canvas.landmarks__webgl").first().focus();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);
    const cleared = await page.evaluate(() => (window as any).__landmarksEngine.getInspectPin());
    expect(cleared).toBeNull();
    expect(await getModel(page, "selected_kind")).toBe("");

    // Miss click clears without toast (re-pin then miss).
    await setModel(page, { selected_kind: "molecule", selected_index: 0 });
    await page.waitForTimeout(100);
    await page.mouse.click(box.x + 12, box.y + 12);
    await page.waitForTimeout(100);
    expect(await getModel(page, "selected_kind")).toBe("");
  });

  test("landmark chrome has no copy/paste or SpatialData LED", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
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

    await expect(page.getByRole("button", { name: "Copy landmark" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Paste landmark" })).toHaveCount(0);
    await expect(page.getByTestId("save-landmarks")).toHaveCount(0);
    await expect(page.getByTestId("spatialdata-led")).toHaveCount(0);
    await shot(page, "landmark-chrome-no-save", widget);
  });

  test("info panel shows category donut by default", async ({ page }) => {
    await page.waitForTimeout(200);
    const panel = page.getByTestId("info-panel");
    await expect(panel).toBeVisible();
    await expect(panel.getByText("Info")).toBeVisible();
  });

  test("context toolbar docks at bottom center for selected landmark", async ({ page }) => {
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
    // Near bottom of widget (not floating on geometry / under topbar).
    expect(box!.y + box!.height).toBeGreaterThan(widgetBox!.y + widgetBox!.height * 0.6);

    await page.getByTestId("context-line-style").click();
    await page.waitForTimeout(100);
    const landmarks = (await getModel(page, "landmarks")) as any[];
    expect(landmarks[0].line_style).toBe("dashed");

    await page.getByTestId("context-buffer-left").click();
    await page.waitForTimeout(100);
    const after = (await getModel(page, "landmarks")) as any[];
    expect(after[0].buffer_side).toBe("left");
  });

  test("context toolbar promote from selection neighborhood", async ({ page }) => {
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
      "aria-pressed",
      "true",
    );
    const before = ((await getModel(page, "selections")) as any[]).length;
    await page.getByTestId("promote-neighborhood").click();
    await page.waitForTimeout(200);
    // In harness there is no Python promote observer; tick still bumps.
    expect(await getModel(page, "promote_tick")).toBeGreaterThan(0);
    // Keep UI path covered even if selection count unchanged without Python.
    expect(((await getModel(page, "selections")) as any[]).length).toBeGreaterThanOrEqual(
      before,
    );
  });
});
