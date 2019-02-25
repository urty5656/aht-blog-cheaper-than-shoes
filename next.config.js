const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebapckPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  target: 'serverless',
  webpack(config, { dev, isServer }) {
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebapckPlugin());
    }
    return config;
  },
});
