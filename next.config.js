/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');
const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  optimizeImagesInDev: true,
});

module.exports = withTypescript();
module.exports = { distDir: 'build' };

module.exports = withCSS(
  withSass({
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
          'webp-loader',
        ],
      });
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));

      return config;
    },
  })
);
