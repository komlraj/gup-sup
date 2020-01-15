 
const merge = require('webpack-merge');
const common = require('./webpack.server');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: "server.prod.bundle.js",
    path: path.resolve(__dirname, "dist")
  },
});