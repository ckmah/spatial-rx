import { expect, test } from "@playwright/test";

import {
  bootVolumeCubeHarness,
  getVolumeModel,
  setVolumeModel,
  shot,
  toyInspectBox,
  volumeCubeWidget,
} from "../helpers";

/**
 * VolumeCube widget tier — functional coverage + 3 visual anchors:
 * rest volume, inspect window offset, labels hidden.
 */
test.describe("VolumeCubeWidget", () => {
  test.beforeEach(async ({ page }) => {
    await bootVolumeCubeHarness(page);
  });

  test("harness boots and OME-Zarr volume renders", async ({ page }) => {
    const widget = volumeCubeWidget(page);
    await expect(widget).toBeVisible();
    await expect(page.getByRole("button", { name: "Iso" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
    await expect(page.getByRole("switch", { name: "Labels" })).toBeChecked();
    await expect(widget.getByText(/window 128, 128 · 100 µm · full Z/)).toBeVisible();
    await expect(widget.locator("canvas").first()).toBeVisible();
    await shot(page, "rest", widget);
  });

  test("toy inspect drag updates synced window traits", async ({ page }) => {
    const widget = volumeCubeWidget(page);
    const { box } = await toyInspectBox(page);

    await page.mouse.move(box.x + box.width * 0.72, box.y + box.height * 0.28);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.72, box.y + box.height * 0.28);
    await page.mouse.up();
    await page.waitForTimeout(200);

    const cx = Number(await getVolumeModel(page, "window_cx"));
    const cy = Number(await getVolumeModel(page, "window_cy"));
    expect(cx).toBeGreaterThan(140);
    expect(cx).toBeLessThan(210);
    expect(cy).toBeGreaterThan(40);
    expect(cy).toBeLessThan(120);
    await expect(
      widget.getByText(
        new RegExp(`window ${Math.round(cx)}, ${Math.round(cy)} · 100 µm · full Z`),
      ),
    ).toBeVisible();
    await shot(page, "window-on-sphere", widget);
  });

  test("model patch updates window readout without inspect drag", async ({
    page,
  }) => {
    const widget = volumeCubeWidget(page);
    await setVolumeModel(page, { window_cx: 64, window_cy: 192 });
    await page.waitForTimeout(150);
    expect(Number(await getVolumeModel(page, "window_cx"))).toBeCloseTo(64, 0);
    expect(Number(await getVolumeModel(page, "window_cy"))).toBeCloseTo(192, 0);
    await expect(widget.getByText(/window 64, 192 · 100 µm · full Z/)).toBeVisible();
  });

  test("labels switch hides the labels VolumeViewer overlay", async ({ page }) => {
    const widget = volumeCubeWidget(page);
    const canvases = widget.locator("canvas");
    await expect(canvases).toHaveCount(2);

    await page.getByRole("switch", { name: "Labels" }).click();
    await page.waitForTimeout(200);
    await expect(page.getByRole("switch", { name: "Labels" })).not.toBeChecked();
    await expect(canvases).toHaveCount(1);
    await shot(page, "labels-off", widget);
  });

  test("Z min slider narrows the displayed Z range readout", async ({ page }) => {
    const widget = volumeCubeWidget(page);
    const zMinSlider = widget.getByRole("slider").first();
    await zMinSlider.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
    await expect(widget.getByText(/window 128, 128 · 100 µm · full Z/)).toBeVisible();
  });
});
