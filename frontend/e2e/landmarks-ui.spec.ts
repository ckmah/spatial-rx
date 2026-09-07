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
    await page.getByRole("radio", { name: "Point" }).click();
    await page.waitForTimeout(150);
    await shot(page, "authoring-point-mode", widget);

    const canvas = page.locator("canvas.landmarks__webgl").first();
    const box = await canvas.boundingBox();
    expect(box).toBeTruthy();
    const x = box!.x + box!.width * 0.55;
    const y = box!.y + box!.height * 0.45;
    await page.mouse.click(x, y);
    await page.waitForTimeout(250);
    const after = (await getModel(page, "landmarks")) as any[];
    expect(after.length).toBe(before + 1);
    expect(after[after.length - 1].type).toBe("point");
    expect(after[after.length - 1].vertices?.length).toBe(1);
    await shot(page, "after-place-point", widget);
  });

  test("shift+wheel neighborhood increments and decrements", async ({ page }) => {
    const widget = page.locator(".landmarks").first();
    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(200);
    await shot(page, "selection-neighborhood", widget);

    const canvas = page.locator("canvas.landmarks__webgl").first();
    const box = await canvas.boundingBox();
    expect(box).toBeTruthy();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);

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

  test("selection outline only on active selection", async ({ page }) => {
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
    await shot(page, "landmark-selected", widget);

    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(150);
    overlay = await page.evaluate(() =>
      (window as any).__landmarksEngine.getSelectionOverlay(),
    );
    const active = overlay.find((r: any) => r.index === 0);
    expect(active?.selected).toBe(true);
    expect(active?.lineWidth).toBeGreaterThan(0);
    expect(active?.lineAlpha).toBeGreaterThan(0);
    await shot(page, "selection-selected", widget);
  });
});
