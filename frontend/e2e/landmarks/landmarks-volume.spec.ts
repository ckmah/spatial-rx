import { expect, test, type Page } from "@playwright/test";

import { bootLandmarksVolumeHarness, canvasBox, getModel, setModel } from "../helpers";

/**
 * Landmarks over a toy SpatialData (`E2E_HARNESS=landmarks-volume`): Inspect
 * hovers a window square, a click opens the floating cube, a drag pans it, Esc
 * closes it; the Inspect context bar drives the cube. The cube's `data-*`
 * mirrors are read from its `.volume-cube__view` inside the Cube dialog.
 *
 * The toy table has three cells (labels 1-3) at about (70, 80), (160, 150) and
 * (100, 190) µm, typed type1 / type0 / type1. The map fits them, so a 100 µm
 * window at the canvas centre (~(115, 135)) covers all three: both types.
 */
const cubeWindow = (page: Page) => page.getByRole("dialog", { name: "Cube" });

async function openCubeAtCentre(page: Page) {
  await page.getByRole("radio", { name: "Inspect", exact: true }).click();
  const box = await canvasBox(page);
  await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
  await expect(cubeWindow(page)).toBeVisible();
  return box;
}

test.describe("Landmarks inspect cube", () => {
  test.beforeEach(async ({ page }) => bootLandmarksVolumeHarness(page));

  test("hover shows the window square without model writes; click opens the cube", async ({ page }) => {
    await page.getByRole("radio", { name: "Inspect", exact: true }).click();
    const box = await canvasBox(page);
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    const overlay = await page.evaluate(() => (window as any).__landmarksEngine.getInspectOverlay());
    expect(overlay.hover).not.toBeNull();
    expect(overlay.placed).toBeNull();
    expect(await getModel(page, "inspect_cx")).toBeNull();
    await expect(cubeWindow(page)).toHaveCount(0);

    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await expect(cubeWindow(page)).toBeVisible();
    await expect(cubeWindow(page).getByText("Cube · 100 µm")).toBeVisible();
    await expect(cubeWindow(page).locator(".volume-cube__view")).toHaveAttribute("data-channels", /1|2/);
    expect(Number(await getModel(page, "inspect_cx"))).toBeGreaterThan(0);
    expect((await page.evaluate(() => (window as any).__landmarksEngine.getInspectOverlay())).placed).not.toBeNull();

    await cubeWindow(page).getByRole("button", { name: "Close cube" }).click();
    await expect(cubeWindow(page)).toHaveCount(0);
  });

  test("drag pans the cube; Esc closes it", async ({ page }) => {
    const box = await openCubeAtCentre(page);
    const view = cubeWindow(page).locator(".volume-cube__view");
    await expect(view).toHaveAttribute("data-pan", "0,0");
    await view.evaluate((el) => {
      const seen: string[] = [];
      (window as any).__pans = seen;
      new MutationObserver(() => seen.push(el.getAttribute("data-pan") ?? "")).observe(el, {
        attributes: true,
        attributeFilter: ["data-pan"],
      });
    });
    const cx0 = Number(await getModel(page, "inspect_cx"));
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.56, box.y + box.height * 0.5, { steps: 4 });
    await page.mouse.up();
    await expect.poll(async () => Number(await getModel(page, "inspect_cx"))).toBeGreaterThan(cx0);
    // The loaded volume slides under the frame, then the refetch lands at the new window.
    await expect(view).toHaveAttribute("data-pan", "0,0");
    expect((await page.evaluate(() => (window as any).__pans)).some((p: string) => p !== "0,0")).toBe(true);

    await page.keyboard.press("Escape");
    await expect(cubeWindow(page)).toHaveCount(0);
    expect((await page.evaluate(() => (window as any).__landmarksEngine.getInspectOverlay())).hover).toBeNull();
  });

  test("inspect toolbar: presets, MIP, palette, alpha/gamma, committed Z cut", async ({ page }) => {
    await openCubeAtCentre(page);
    const bar = page.getByTestId("context-inspect-toolbar");
    const view = cubeWindow(page).locator(".volume-cube__view");
    await expect(view).toHaveAttribute("data-channels", "1");

    await bar.getByRole("radio", { name: "Top view" }).click();
    await expect(bar.getByRole("radio", { name: "Top view" })).toHaveAttribute("aria-checked", "true");
    await bar.getByRole("radio", { name: "Oblique view" }).click();
    await expect(bar.getByRole("radio", { name: "Oblique view" })).toHaveAttribute("aria-checked", "true");

    await bar.getByRole("radio", { name: "Maximum intensity" }).click();
    await expect(view).toHaveAttribute("data-render", "mip");

    await bar.getByRole("button", { name: "Palette" }).click();
    await page.getByRole("menuitemradio", { name: "viridis" }).click();
    await expect(view).toHaveAttribute("data-palette", "viridis");

    await bar.getByRole("button", { name: "Image", exact: true }).click();
    await expect(view).toHaveAttribute("data-image-gamma", "1");
    const gamma = page.getByRole("slider", { name: "Image gamma" });
    await gamma.focus();
    await page.keyboard.press("ArrowRight");
    await expect(view).not.toHaveAttribute("data-image-gamma", "1");
    const alpha = page.getByRole("slider", { name: "Image alpha" });
    await alpha.focus();
    await page.keyboard.press("ArrowLeft");
    await expect(alpha).toHaveAttribute("aria-valuenow", "0.95");
    // Uniforms only: no labels fetched, same single image channel.
    await expect(view).toHaveAttribute("data-channels", "1");

    await bar.getByRole("button", { name: "Cuts" }).click();
    await expect(page.getByRole("slider", { name: "Image gamma" })).toHaveCount(0);
    const zHi = page.getByRole("slider", { name: "Z cut" }).nth(1);
    await expect(zHi).toHaveAttribute("aria-valuenow", "64");
    await zHi.focus();
    for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowLeft");
    await expect.poll(async () => ((await getModel(page, "volume_cut")) as number[])[5]).toBe(54);
  });

  test("a partial X cut moves with the window", async ({ page }) => {
    const box = await openCubeAtCentre(page);
    await page.getByTestId("context-inspect-toolbar").getByRole("button", { name: "Cuts" }).click();
    const xHi = page.getByRole("slider", { name: "X cut" }).nth(1);
    await xHi.focus();
    for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowLeft");
    const cx0 = Number(await getModel(page, "inspect_cx"));
    await expect.poll(async () => ((await getModel(page, "volume_cut")) as number[])[1]).toBeCloseTo(cx0 + 40, 3);
    expect(((await getModel(page, "volume_cut")) as number[])[0]).toBeCloseTo(cx0 - 50, 3);

    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5, { steps: 3 });
    await page.mouse.up();
    await expect.poll(async () => Number(await getModel(page, "inspect_cx"))).toBeGreaterThan(cx0);
    const cx1 = Number(await getModel(page, "inspect_cx"));
    await expect.poll(async () => ((await getModel(page, "volume_cut")) as number[])[1]).toBeCloseTo(cx1 + 40, 3);
    // Both edges keep their place in the window: 0-90 µm from its left edge.
    expect(((await getModel(page, "volume_cut")) as number[])[0]).toBeCloseTo(cx1 - 50, 3);
  });

  test("highlight follows focus: everything, a category, a Selection", async ({ page }) => {
    await openCubeAtCentre(page);
    const bar = page.getByTestId("context-inspect-toolbar");
    await bar.getByRole("switch", { name: "Labels" }).click();
    const view = cubeWindow(page).locator(".volume-cube__view");
    await expect(view).toHaveAttribute("data-labels", "on");
    await expect(view).toHaveAttribute("data-channels", "2");
    // Nothing focused: every cell in the window, by category (type1 and type0).
    await expect(view).toHaveAttribute("data-highlight", "2");
    await expect(cubeWindow(page).getByLabel("Highlighted cells").getByText("type0")).toBeVisible();

    // A category: only its cells (category 0 is type1, cells 1 and 3).
    await setModel(page, { selected_kind: "type", selected_index: 0 });
    await expect(view).toHaveAttribute("data-highlight", "1");
    await expect(cubeWindow(page).getByLabel("Highlighted cells").getByText("type0")).toHaveCount(0);

    // A Selection: its cells by category (cell 2 only, type0).
    await setModel(page, {
      selections: [{ id: "sel-1", type: "polygon", point_indices: [1] }],
      selected_kind: "selection",
      selected_index: 0,
    });
    await expect(view).toHaveAttribute("data-highlight", "1");
    await expect(cubeWindow(page).getByLabel("Highlighted cells").getByText("type0")).toBeVisible();

    await setModel(page, { selected_kind: "", selected_index: -1 });
    await expect(view).toHaveAttribute("data-highlight", "2");
  });
});
