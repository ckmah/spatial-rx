import { expect, test, type Page } from "@playwright/test";

async function waitForEngine(page: Page) {
  await page.locator(".landmarks").first().waitFor({ state: "visible" });
  await page.locator("canvas.landmarks__webgl").first().waitFor({ state: "visible" });
  await page.waitForFunction(() => {
    const eng = (window as any).__landmarksEngine;
    const vs = eng?.getViewState?.();
    return Boolean(vs && Number.isFinite(vs.zoom));
  });
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

test.describe("LandmarksWidget UI regressions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await waitForEngine(page);
  });

  test("zoom in/out/reset buttons change viewState", async ({ page }) => {
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
    const before = ((await getModel(page, "landmarks")) as unknown[]).length;
    await page.getByRole("radio", { name: "Point" }).click();
    const canvas = page.locator("canvas.landmarks__webgl").first();
    const box = await canvas.boundingBox();
    expect(box).toBeTruthy();
    const x = box!.x + box!.width * 0.55;
    const y = box!.y + box!.height * 0.45;
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    const after = (await getModel(page, "landmarks")) as any[];
    expect(after.length).toBe(before + 1);
    expect(after[after.length - 1].type).toBe("point");
    expect(after[after.length - 1].vertices?.length).toBe(1);
  });

  test("shift+wheel neighborhood increments and decrements", async ({ page }) => {
    await setModel(page, { selected_kind: "selection", selected_index: 0 });
    await page.waitForTimeout(150);

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
    await setModel(page, { selected_kind: "landmark", selected_index: 0 });
    await page.waitForTimeout(100);
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
    await page.waitForTimeout(100);
    overlay = await page.evaluate(() =>
      (window as any).__landmarksEngine.getSelectionOverlay(),
    );
    const active = overlay.find((r: any) => r.index === 0);
    expect(active?.selected).toBe(true);
    expect(active?.lineWidth).toBeGreaterThan(0);
    expect(active?.lineAlpha).toBeGreaterThan(0);
  });
});
