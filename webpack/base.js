const webpack = require('webpack');
const path = require('path'); // Node.js module used to manipulate file paths
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Generates an HTML file for the application by injecting automatically all the generated bundles.
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
// This plugin will remove all files inside webpack's output.path directory, as well as all unused
// webpack assets after every successful rebuild.
module.exports = {
  mode: 'development',
  // Enable webpack's built-in optimizations that correspond to development
  devtool: 'eval-source-map',
  // Each module is executed with eval() and a SourceMap is added as a DataUrl to the eval().
  module: {
    rules: [{
      test: /\.js$/,
      // Checks for files with .js extension in the path specified below
      include: path.resolve(__dirname, 'src/'),
      // Checks in this path
      exclude: /node_modules/,
      // Exclude node_modules folder
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        }, // Uses babel-loader to transpile your ES6 code
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
      test: [/\.vert$/, /\.frag$/],
      use: 'raw-loader',
    },
    // This loader will bundle Vertex and Fragment shaders.
    {
      test: /\.(gif|png|jpe?g|svg|xml)$/i,
      use: 'file-loader',
    },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../'),
    }),
    // Path where this plugin will delete the
    // files on each rebuild
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    // config webpack to handle renderer swapping in our app
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // specify where the HTML template is located
  ],
};