const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebapckPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript(
  withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[path]-[local]-[hash:base64:4]',
    },
    target: 'serverless',
    webpack(config, { dev, isServer }) {
      config.devtool = 'eval-source-map';
      if (dev && isServer) {
        config.plugins.push(new ForkTsCheckerWebapckPlugin());
      }
      return config;
    },
  }),
);
