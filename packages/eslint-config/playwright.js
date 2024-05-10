const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/**  @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/jest"),
    require.resolve("@vercel/style-guide/eslint/playwright-test"),
    "plugin:sonarjs/recommended",
    "eslint-config-turbo",
    "prettier",
  ],
  plugins: ["only-warn", "sonarjs"],
  parserOptions: {
    project,
  },
  globals: {
    Browser: true,
    Node: true,
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
};
