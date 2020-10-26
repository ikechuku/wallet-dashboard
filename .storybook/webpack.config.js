const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SRC_PATH = path.join(__dirname, '../components');
//dont need stories path if you have your stories inside your //components folder
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './.storybook/tsconfig.json',
        },
      },
      { loader: require.resolve('react-docgen-typescript-loader') },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loaders: ['file-loader'],
    include: path.resolve(__dirname, '../'),
  });
  config.plugins.push(
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/fonts'),
        to: 'static/fonts',
      },
    ])
  );
  return config;
};
