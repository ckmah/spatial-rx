import { expect, test } from "@playwright/test";

import {
  bootNotebookLinkHarness,
  canvasBox,
  getModel,
  getVolumeModel,
  volumeCubeWidget,
} from "../helpers";

/**
 * Notebook-link tier — Landmarks Inspect mode drives VolumeCube window traits,
 * mirroring demos/volume-cube.py (Python copies inspect_cx/cy → window_cx/cy).
 */
test.describe("VolumeCube notebook link", () => {
  test.beforeEach(async ({ page }) => {
    await bootNotebookLinkHarness(page);
  });

  test("Landmarks inspect click updates VolumeCube window readout", async ({
    page,
  }) => {
    const cube = volumeCubeWidget(page);
    await expect(
      cube.getByText(/window 128, 128 · 100 µm · X 0–256 · Y 0–256 · Z 0–64/),
    ).toBeVisible();

    await page.getByRole("radio", { name: "Inspect", exact: true }).click();
    await page.waitForTimeout(150);

    const box = await canvasBox(page);
    await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.38);
    await page.waitForTimeout(400);

    const inspectCx = Number(await getModel(page, "inspect_cx"));
    const inspectCy = Number(await getModel(page, "inspect_cy"));
    expect(Number.isFinite(inspectCx)).toBe(true);
    expect(Number.isFinite(inspectCy)).toBe(true);
    expect(inspectCx).not.toBeCloseTo(128, 0);
    expect(inspectCy).not.toBeCloseTo(128, 0);

    const windowCx = Number(await getVolumeModel(page, "window_cx"));
    const windowCy = Number(await getVolumeModel(page, "window_cy"));
    expect(windowCx).toBeCloseTo(inspectCx, 0);
    expect(windowCy).toBeCloseTo(inspectCy, 0);

    await expect(
      cube.getByText(
        new RegExp(
          `window ${Math.round(windowCx)}, ${Math.round(windowCy)} · 100 µm · X 0–256 · Y 0–256 · Z 0–64`,
        ),
      ),
    ).toBeVisible();
  });

  test("inspect traits stay within volume XY extents", async ({ page }) => {
    await page.getByRole("radio", { name: "Inspect", exact: true }).click();
    const box = await canvasBox(page);
    await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.38);
    await page.waitForTimeout(400);

    const inspectCx = Number(await getModel(page, "inspect_cx"));
    const inspectCy = Number(await getModel(page, "inspect_cy"));
    const windowCx = Number(await getVolumeModel(page, "window_cx"));
    const windowCy = Number(await getVolumeModel(page, "window_cy"));

    expect(windowCx).toBeCloseTo(inspectCx, 0);
    expect(windowCy).toBeCloseTo(inspectCy, 0);
    expect(inspectCx).toBeGreaterThan(0);
    expect(inspectCx).toBeLessThan(256);
    expect(inspectCy).toBeGreaterThan(0);
    expect(inspectCy).toBeLessThan(256);
  });
});
