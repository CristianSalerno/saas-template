const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["only-warn", "@typescript-eslint"],
  env: {
    node: true,
  },
  ignorePatterns: ["node_modules", "dist", ".next", "*.config.js"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    // All Vitest test files
    {
      files: [
        "apps/portal/app/**/*.test.tsx",
        "apps/portal/components/**/*.test.tsx",
        "apps/portal/lib/**/*.test.tsx",
        "packages/**/*.test.tsx",
        "packages/**/*.test.ts",
      ],
      extends: [
        "prettier",
        "eslint-config-turbo",
        "plugin:@typescript-eslint/recommended",
        "plugin:vitest/legacy-all",
      ],
      plugins: ["@typescript-eslint", "prettier", "vitest"],
      rules: {
        "vitest/no-hooks": "off",
      },
    },
    // Portal server unit test files
    {
      files: ["apps/portal/server/**/*.spec.ts"],
      extends: [
        "prettier",
        "eslint-config-turbo",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:jest/style",
      ],
      env: {
        node: true,
        "jest/globals": true,
      },
      plugins: ["@typescript-eslint", "prettier", "jest"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve("apps/portal/tsconfig.json"),
          },
        },
      },
    },
    // Portal  files
    {
      files: ["apps/portal/**/*.ts", "apps/portal/**/*.tsx"],
      extends: [
        "prettier",
        "eslint-config-turbo",
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/react"),
        require.resolve("@vercel/style-guide/eslint/next"),
        "plugin:@typescript-eslint/recommended",
        "plugin:tailwindcss/recommended",
      ],
      globals: {
        React: true,
        JSX: true,
      },
      env: {
        node: true,
        browser: true,
      },
      plugins: ["only-warn", "@typescript-eslint", "tailwindcss", "prettier"],
      rules: {
        "import/no-default-export": "off",
        "import/no-extraneous-dependencies": "off",
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve("apps/portal/tsconfig.json"),
          },
        },
      },
    },
    // All React library files
    {
      files: ["packages/**/*.tsx"],
      extends: [
        "prettier",
        "eslint-config-turbo",
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/react"),
        "plugin:@typescript-eslint/recommended",
        "plugin:tailwindcss/recommended",
      ],
      plugins: ["only-warn", "@typescript-eslint", "tailwindcss", "prettier"],
      globals: {
        React: true,
        JSX: true,
      },
      env: {
        browser: true,
      },
      settings: {
        "import/resolver": {
          typescript: {
            project,
          },
        },
      },
    },
    // All Node library files
    {
      files: ["packages/**/*.ts"],
      extends: [
        "prettier",
        "eslint-config-turbo",
        require.resolve("@vercel/style-guide/eslint/node"),
        "plugin:@typescript-eslint/recommended",
      ],
      plugins: ["@typescript-eslint", "prettier"],
      globals: {
        node: true,
        browser: true,
      },
      env: {
        node: true,
        browser: true,
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
      },
      settings: {
        "import/resolver": {
          typescript: {
            project,
          },
        },
      },
    },
  ],
};
