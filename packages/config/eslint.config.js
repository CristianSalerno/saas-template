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
    {
      // adjust the path to your Next.js files
      files: ["apps/**/*.ts", "apps/**/*.tsx"],
      extends: [
        "eslint:recommended",
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/react"),
        require.resolve("@vercel/style-guide/eslint/next"),
        "plugin:@typescript-eslint/recommended",
        "plugin:tailwindcss/recommended",
        "prettier",
        "eslint-config-turbo",
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
      },
      settings: {
        "import/resolver": {
          typescript: {
            project,
          },
        },
      },
    },
    {
      // adjust the path to your library files
      files: ["packages/**/*.ts", "packages/**/*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        require.resolve("@vercel/style-guide/eslint/react"),
        require.resolve("@vercel/style-guide/eslint/next"),
        "prettier",
        "eslint-config-turbo",
      ],
      plugins: ["only-warn", "@typescript-eslint"],
      globals: {
        React: true,
        JSX: true,
      },
      env: {
        node: true,
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
