import { rule as tailwindColorClassesRule } from "./rules/disallow-tailwind-color-classes";

export const rules = {
  "disallow-tailwind-color-classes": tailwindColorClassesRule,
};

export const configs = {
  recommended: {
    rules: {
      "@repo/eslint/disallow-tailwind-color-classes": "error",
    },
  },
};
