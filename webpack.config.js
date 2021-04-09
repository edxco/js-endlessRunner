const path = require('path');
//const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  performance: {
    hints: false,
  },
  // plugins: [
  //   new Dotenv(),
  // ],
  module: {
    rules:
    [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif|mov|mp4)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'media',
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
};