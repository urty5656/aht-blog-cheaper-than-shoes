const withSCSS = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebapckPlugin = require('fork-ts-checker-webpack-plugin');
const withAssetRelocator = require('./assetRelocator');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = withAssetRelocator(
  withTypescript(
    withSCSS({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[path]-[local]-[hash:base64:4]',
        sourceMap: isDev,
      },
      sassLoaderOptions: {
        sourceMap: isDev,
      },
      postcssLoaderOptions: {
        sourceMap: isDev,
      },
      target: 'serverless',
      webpack(config, { dev, isServer }) {
        config.devtool = dev && 'eval-source-map';
        config.resolve.alias['@'] = __dirname;
        if (dev && isServer) {
          config.plugins.push(new ForkTsCheckerWebapckPlugin());
        }
        return config;
      },
    }),
  ),
);
