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
    await expect(
      widget.getByText(/window 256, 256 · 100 µm · X 0–512 · Y 0–512 · Z 0–128/),
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
    expect(cx).toBeGreaterThan(280);
    expect(cx).toBeLessThan(420);
    expect(cy).toBeGreaterThan(80);
    expect(cy).toBeLessThan(240);
    await expect(
      widget.getByText(
        new RegExp(
          `window ${Math.round(cx)}, ${Math.round(cy)} · 100 µm · X 0–512 · Y 0–512 · Z 0–128`,
        ),
      ),
    ).toBeVisible();
    await shot(page, "window-on-sphere", widget);
  });

  test("model patch updates window readout without inspect drag", async ({
    page,
  }) => {
    const widget = volumeCubeWidget(page);
    await setVolumeModel(page, { window_cx: 128, window_cy: 384 });
    await page.waitForTimeout(150);
    expect(Number(await getVolumeModel(page, "window_cx"))).toBeCloseTo(128, 0);
    expect(Number(await getVolumeModel(page, "window_cy"))).toBeCloseTo(384, 0);
    await expect(
      widget.getByText(/window 128, 384 · 100 µm · X 0–512 · Y 0–512 · Z 0–128/),
    ).toBeVisible();
  });

  test("model patch updates axis slice readout", async ({ page }) => {
    const widget = volumeCubeWidget(page);
    await setVolumeModel(page, {
      slice_x_min: 64,
      slice_x_max: 192,
      slice_z_min: 8,
      slice_z_max: 96,
    });
    await page.waitForTimeout(150);
    expect(Number(await getVolumeModel(page, "slice_x_min"))).toBeCloseTo(64, 0);
    expect(Number(await getVolumeModel(page, "slice_z_max"))).toBeCloseTo(96, 0);
    await expect(widget.getByText(/X 64–192 · Y 0–512 · Z 8–96/)).toBeVisible();
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
});
