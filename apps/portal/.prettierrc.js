const rootConfig = require("../../packages/config/prettier.config");

module.exports = {
  ...rootConfig,
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
};
