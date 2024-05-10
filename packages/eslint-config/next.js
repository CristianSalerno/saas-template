const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/**  @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    "plugin:typescript-paths/recommended",
    "plugin:sonarjs/recommended",
    "plugin:tailwindcss/recommended",
    "eslint-config-turbo",
    "prettier",
  ],
  plugins: ["only-warn", "typescript-paths", "tailwindcss", "sonarjs"],
  rules: {
    "import/named": "off",
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-extraneous-class": "off",
  },
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    Browser: true,
    Node: true,
    JSX: true,
    "jest/globals": true,
  },
  env: {
    node: true,
    browser: true,
    "jest/globals": true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      extends: [require.resolve("@vercel/style-guide/eslint/jest")],
    },
    {
      files: ["**/*.test.tsx", "**/*.spec.tsx"],
      extends: [require.resolve("@vercel/style-guide/eslint/vitest")],
    },
  ],
};
