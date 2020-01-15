const merge = require('webpack-merge');
const common = require('./webpack.client');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: "client.prod.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
});