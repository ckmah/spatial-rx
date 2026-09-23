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
    await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
    await expect(page.getByRole("switch", { name: "Labels" })).not.toBeChecked();
    await expect(
      widget.getByText(/window 128, 128 · 100 µm · X 0–256 · Y 0–256 · Z 0–64/),
    ).toBeVisible();
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
        new RegExp(
          `window ${Math.round(cx)}, ${Math.round(cy)} · 100 µm · X 0–256 · Y 0–256 · Z 0–64`,
        ),
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
    await expect(
      widget.getByText(/window 64, 192 · 100 µm · X 0–256 · Y 0–256 · Z 0–64/),
    ).toBeVisible();
  });

  test("model patch updates axis slice readout", async ({ page }) => {
    const widget = volumeCubeWidget(page);
    await setVolumeModel(page, {
      slice_x_min: 64,
      slice_x_max: 192,
      slice_z_min: 8,
      slice_z_max: 48,
    });
    await page.waitForTimeout(150);
    expect(Number(await getVolumeModel(page, "slice_x_min"))).toBeCloseTo(64, 0);
    expect(Number(await getVolumeModel(page, "slice_z_max"))).toBeCloseTo(48, 0);
    await expect(widget.getByText(/X 64–192 · Y 0–256 · Z 8–48/)).toBeVisible();
  });

  test("labels switch shows and hides the labels VolumeViewer overlay", async ({
    page,
  }) => {
    const widget = volumeCubeWidget(page);
    const canvases = widget.locator("canvas");
    await expect(canvases).toHaveCount(1);

    await page.getByRole("switch", { name: "Labels" }).click();
    await page.waitForTimeout(400);
    await expect(page.getByRole("switch", { name: "Labels" })).toBeChecked();
    await expect(canvases).toHaveCount(2);

    await page.getByRole("switch", { name: "Labels" }).click();
    await page.waitForTimeout(200);
    await expect(page.getByRole("switch", { name: "Labels" })).not.toBeChecked();
    await expect(canvases).toHaveCount(1);
    await shot(page, "labels-off", widget);
  });
});
