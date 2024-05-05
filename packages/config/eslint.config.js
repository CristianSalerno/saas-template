const { resolve } = require("node:path");

module.exports = {
  extends: [require.resolve("@vercel/style-guide/eslint/node")],
  plugins: ["only-warn"],
  overrides: [
    // Portal App
    {
      files: ["apps/portal/**/*.ts", "apps/portal/**/*.tsx"],
      extends: [
        require.resolve("@vercel/style-guide/eslint/typescript"),
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/react"),
        require.resolve("@vercel/style-guide/eslint/next"),
        require.resolve("@vercel/style-guide/eslint/jest"),
        require.resolve("@vercel/style-guide/eslint/vitest"),
        "plugin:sonarjs/recommended",
        "plugin:tailwindcss/recommended",
        "eslint-config-turbo",
      ],
      plugins: ["tailwindcss", "sonarjs"],
      rules: {
        "import/named": "off",
        "import/no-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-extraneous-class": "off",
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
      parserOptions: {
        project: resolve(`../../apps/portal`, "tsconfig.json"),
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve(`../../apps/portal`, "tsconfig.json"),
          },
        },
      },
    },
    // Portal App e2e
    {
      files: ["apps/portal-e2e/**/*.ts", "apps/portal-e2e/**/*.tsx"],
      extends: [
        require.resolve("@vercel/style-guide/eslint/typescript"),
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/jest"),
        require.resolve("@vercel/style-guide/eslint/playwright-test"),
        "plugin:sonarjs/recommended",
        "eslint-config-turbo",
      ],
      plugins: ["sonarjs"],
      rules: {
        "import/named": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-extraneous-class": "off",
      },
      globals: {
        browser: true,
        node: true,
      },
      env: {
        node: true,
        browser: true,
      },
      parserOptions: {
        // project: resolve(`../../apps/portal-e2e`, "tsconfig.json"),
        project: resolve(process.cwd(), "tsconfig.json"),
      },
      settings: {
        "import/resolver": {
          typescript: {
            // project: resolve(`../../apps/portal-e2e`, "tsconfig.json"),
            project: resolve(process.cwd(), "tsconfig.json"),
          },
        },
      },
    },
    // Packages ts
    {
      files: ["packages/**/*.ts"],
      extends: [
        require.resolve("@vercel/style-guide/eslint/typescript"),
        require.resolve("@vercel/style-guide/eslint/vitest"),
        "plugin:sonarjs/recommended",
        "eslint-config-turbo",
      ],
      plugins: ["sonarjs"],
      rules: {
        "import/named": "off",
        "import/no-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-extraneous-class": "off",
      },
      globals: {
        Node: true,
      },
      env: {
        node: true,
      },
      parserOptions: {
        project: resolve(process.cwd(), "tsconfig.json"),
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve(process.cwd(), "tsconfig.json"),
          },
        },
      },
    },
    // Packages tsx
    {
      files: ["packages/**/*.tsx"],
      extends: [
        require.resolve("@vercel/style-guide/eslint/typescript"),
        require.resolve("@vercel/style-guide/eslint/browser"),
        require.resolve("@vercel/style-guide/eslint/react"),
        require.resolve("@vercel/style-guide/eslint/vitest"),
        "plugin:tailwindcss/recommended",
        "plugin:sonarjs/recommended",
        "eslint-config-turbo",
      ],
      plugins: ["tailwindcss", "sonarjs"],
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
        project: resolve(process.cwd(), "tsconfig.json"),
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: resolve(process.cwd(), "tsconfig.json"),
          },
        },
      },
    },
  ],
};
