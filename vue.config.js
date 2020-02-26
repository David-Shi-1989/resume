const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // configureWebpack: {
  //   plugins
  // },
  configureWebpack: config => {
    config.plugins.push(
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, 'static'), to: 'static' }
      ])
    )
  }
}