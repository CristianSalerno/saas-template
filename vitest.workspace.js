import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./apps/portal/vitest.config.mts",
  "./packages/dto/vitest.config.mts",
]);
