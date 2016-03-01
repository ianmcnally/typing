/* eslint-disable no-var */

var webpackConfig = require('./webpack.config').buildConfig

module.exports = function (config) {
  config.set({
    basePath : '',
    frameworks : ['mocha'],
    files : [
      'node_modules/es5-shim/es5-shim.min.js',
      'node_modules/react/dist/react.min.js',
      'src/test-helpers/test-index.js'
    ],
    webpack : webpackConfig,
    webpackMiddleware : {
      stats : {
        colors : true
      }
    },
    preprocessors : {
      'src/test-helpers/test-index.js' : ['webpack']
    },
    reporters : ['mocha', 'notify'],
    port : 9876,
    colors : true,
    logLevel : config.LOG_INFO,
    autoWatch : true,
    browsers : ['PhantomJS2'],
    singleRun : true

  })
}

/* eslint-enable no-var */

