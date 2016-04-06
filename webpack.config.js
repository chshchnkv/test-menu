var path = require('path');
var webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'build')
  },

  entry: './src/js/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
//    publicPath: path.resolve(__dirname, '/build/js'),
    filename: './js/main.js',
    sourceMapFilename: '[file].map'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src/js']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'}
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    })
  ]
};
