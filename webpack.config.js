const path = require('path');
// const Dotenv = require('dotenv-webpack');

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
  module: {
    rules:
    [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
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