/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');

module.exports = {
  experimental: {
    scss: true,
  },
  target: 'serverless',
  webpack(config) {
    config.resolve.alias['@'] = __dirname;

    config.module.rules.push({
      test: /\.glsl$/,
      use: 'webpack-glsl-minify',
    });

    return config;
  },
};
