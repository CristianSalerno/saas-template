module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "all",
  semi: true,
  printWidth: 90,
  arrowParens: "always",
  endOfLine: "auto",
  importOrder: [
    "^reflect-metadata$",
    "(.*)/__mocks__/(.*)",
    "<THIRD_PARTY_MODULES>",
    "^@repo/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  overrides: [
    {
      files: "*.tsx",
      options: {
        parser: "babel-ts",
      },
    },
  ],
};
