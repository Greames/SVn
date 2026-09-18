import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

// Some sandboxed environments pre-install a Chromium build that doesn't
// match this project's pinned @playwright/test version and can't reach
// the network to download the matching one. Fall back to it only if
// present; everywhere else, Playwright resolves its own browser normally.
const sandboxChromium = "/opt/pw-browsers/chromium";
const executablePath = existsSync(sandboxChromium)
  ? sandboxChromium
  : undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: executablePath ? { executablePath } : {},
      },
    },
  ],
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
