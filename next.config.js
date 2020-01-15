/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');
const withSCSS = require('@zeit/next-sass');

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
  webpack(config, { dev }) {
    config.devtool = dev && 'eval-source-map';
    config.resolve.alias['@'] = __dirname;
    config.resolve.alias['@@prelude'] = path.join(
      __dirname,
      'utils/prelude.ts',
    );

    config.module.rules.push({
      test: /\.glsl$/,
      use: 'webpack-glsl-minify',
    });

    return config;
  },
});
