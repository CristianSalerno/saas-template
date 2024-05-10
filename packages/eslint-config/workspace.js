const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/**  @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "eslint-config-turbo",
    "prettier",
  ],
  plugins: ["only-warn"],
  globals: {
    Node: true,
  },
  env: {
    node: true,
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
        extensions: [".js", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", "build/", "public/", "apps/", "packages/"],
};
