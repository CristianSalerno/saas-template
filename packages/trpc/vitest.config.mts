import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.{test}.?(c|m)[jt]s?(x)"],
    passWithNoTests: true,
  },
  cacheDir: ".vitest",
});
