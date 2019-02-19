const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebapckPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  target: 'server',
  webpack(config, { isServer }) {
    if (isServer) {
      config.plugins.push(new ForkTsCheckerWebapckPlugin());
    }
    return config;
  },
});
