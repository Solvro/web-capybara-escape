const solvroConfig = require("@solvro/config/prettier");

const baseConfig = solvroConfig.default || solvroConfig;

module.exports = {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins || []),
    "@trivago/prettier-plugin-sort-imports",
  ],
};
