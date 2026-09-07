import { defineConfig, devices } from "@playwright/test";

/** Canonical visual snapshots: Linux Chromium (CI). Mac soft-skips unless E2E_SCREENSHOTS=1. */
export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    },
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : [["list"]],
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}",
  use: {
    ...devices["Desktop Chrome"],
    channel: (process.env.PLAYWRIGHT_CHANNEL as "chrome" | undefined) || undefined,
    baseURL: "http://127.0.0.1:5173",
    headless: true,
    trace: "on-first-retry",
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    launchOptions: { args: ["--disable-lcd-text", "--font-render-hinting=none"] },
  },
  projects: [{
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 1,
      channel: (process.env.PLAYWRIGHT_CHANNEL as "chrome" | undefined) || undefined,
    },
  }],
  webServer: {
    command: "npm run dev:landmarks -- --host 127.0.0.1 --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
