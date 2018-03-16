const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve(...pathPart) {
  return path.resolve(__dirname, ...pathPart);
}

module.exports = {
  context: resolve('.'),
  entry: {
    scrollListener: './index.js'
  },
  output: {
    path: resolve('dist'),
    filename: `[name].js`,
    library: "scrollListener",
    libraryTarget: 'umd',
    libraryExport: 'default' // https://segmentfault.com/q/1010000005028964
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dist')])
  ]
};