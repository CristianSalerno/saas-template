import path from "node:path";
import { type PlaywrightTestConfig, devices } from "@playwright/test";

const PORT = process.env.PORT ?? 3000;
const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
  timeout: 5 * 1000,
  testDir: path.join(__dirname, "test"),
  retries: 0,
  webServer: {
    command: "pnpm start:test",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  globalSetup: "./test/config/global-setup.ts",
  use: {
    baseURL,
    storageState: "./e2e/config/storage-state.json",
  },
  reporter: [["html", { open: "always" }]],
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};
export default config;
