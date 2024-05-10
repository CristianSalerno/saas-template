const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/**  @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/vitest"),
    "plugin:sonarjs/recommended",
    "eslint-config-turbo",
    "prettier",
  ],
  plugins: ["only-warn", "sonarjs"],
  globals: {
    Node: true,
  },
  env: {
    node: true,
  },
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
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project,
      },
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
