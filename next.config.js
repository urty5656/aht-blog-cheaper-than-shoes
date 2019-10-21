const withSCSS = require('@zeit/next-sass');
const ForkTsCheckerWebapckPlugin = require('fork-ts-checker-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = withSCSS({
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

    config.module.rules.push({
      test: /\.glsl$/,
      use: 'webpack-glsl-minify',
    });

    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebapckPlugin());
    }
    return config;
  },
});
