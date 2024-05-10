/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["./packages/eslint-config/workspace"],
  ignorePatterns: ["apps/", "packages/"],
};
