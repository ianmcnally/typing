/* eslint-env node */
/* eslint-disable no-var,object-shorthand,prefer-template */

var path = require('path')
var assign = require('lodash.assign')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var PATHS = {
  OUTPUT: path.join(__dirname, 'dist'),
  SOURCE: path.join(__dirname, 'src'),
  LIB: path.join(__dirname, 'lib')
}

var config = {
  output: {
    path: PATHS.OUTPUT,
    publicPath: '/static/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style',
          'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: /sinon\.js$/,
        loader: 'imports?define=>false,require=>false'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      sinon: 'sinon/pkg/sinon',
      src: PATHS.SOURCE,
      lib: PATHS.LIB
    }
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  postcss: [
    require('autoprefixer')
  ]
}

var buildConfig = assign({}, config, {
  entry: [PATHS.SOURCE + '/index.js']
})

var devConfig = assign({}, buildConfig, {
  entry: [
    'webpack-hot-middleware/client'
  ].concat(buildConfig.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(buildConfig.plugins)
})

module.exports = {
  buildConfig: buildConfig,
  devConfig: devConfig
}

/* eslint-enable no-var,object-shorthand,prefer-template */

