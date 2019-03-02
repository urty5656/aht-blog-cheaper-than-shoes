module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')({
      features: {
        'custom-media-queries': true,
        'nesting-rules': true,
      },
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          reduceIdents: true,
        },
      ],
    }),
  ],
};
