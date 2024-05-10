const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/**  @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/vitest"),
    "plugin:sonarjs/recommended",
    "plugin:tailwindcss/recommended",
    "eslint-config-turbo",
    "prettier",
  ],
  plugins: ["only-warn", "tailwindcss", "sonarjs"],
  rules: {
    "import/named": "off",
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-extraneous-class": "off",
  },
  globals: {
    Node: true,
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    project,
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
