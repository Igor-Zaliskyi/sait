const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')

module.exports = () => webpack(webpackConfig)
