import { defineConfig } from "@playwright/test";

// `npm run ui:conformance`: visual-engineering/UI-LAYOUT-INTERACTION@1.0.0
// evidence for the Echelon Foundry site. Chromium only: text scaling uses the
// Chromium DevTools protocol. The built site (dist/) is served the way GitHub
// Pages resolves it. The evidence reporter writes
// test-results/ui-conformance/evidence.json.
const port = Number(process.env.UI_CONFORMANCE_PORT ?? 4317);
const executablePath = process.env.UI_CONFORMANCE_CHROMIUM || undefined;

export default defineConfig({
  testDir: "./test/ui-conformance",
  testMatch: "*.spec.mjs",
  outputDir: "test-results/ui-conformance/artifacts",
  fullyParallel: true,
  // The machine and CI runners are shared: keep concurrency low.
  workers: Number(process.env.UI_CONFORMANCE_WORKERS ?? 2),
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: [[process.env.CI ? "line" : "list"], ["./test/ui-conformance/evidence-reporter.mjs"]],
  timeout: 60_000,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: executablePath ? { executablePath } : {}
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: "node test/ui-conformance/serve.mjs",
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: !process.env.CI,
    env: { UI_CONFORMANCE_PORT: String(port) }
  }
});
