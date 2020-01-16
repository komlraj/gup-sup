 
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require("webpack-node-externals");
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  target: "node",
  node: {
    __dirname: true,
    __filename: true
  },
  entry: "./app.js",
  output: {
    filename: "server.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new HtmlWebpackPlugin({
      template: 'ejs-loader!./server/views/index.ejs'
    })
  ]
}

module.exports = merge(baseConfig, config);