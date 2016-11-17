var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: `./src/app.jsx` ,
  output: {
    path:  path.resolve(__dirname,"public"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
