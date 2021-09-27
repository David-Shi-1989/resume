const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    port: 8082,
    disableHostCheck: true
  },
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Blog' + (isDev ? ' - dev' : ''),
      filename: 'index.html'
    },
    op: {
      entry: 'op/main.js',
      title: '管理平台',
      filename: 'op.html'
    }
  },
  configureWebpack: config => {
    Object.assign(config.resolve.alias, {
      op: resolve('op')
    })
    config.plugins.push(
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, 'static'), to: 'static' }
      ])
    )
  }
}