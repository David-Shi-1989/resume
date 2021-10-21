const utils = require('./utils')
var obj = {
  env: 'dev',
  isDev () {
    return !utils.isProduction()
  },
  mysql: {
    _dev: {
      host: 'localhost',
      user: 'root',
      password: 'lymanshi',
      database: 'blog',
      port: 3306,
      useConnectionPooling: true
    },
    _prod: {
      host: '112.124.47.178',
      user: 'kaoshisys',
      password: 'Asx4ki7Ry6cN6wSZ',
      database: 'kaoshisys',
      port: 3336,
      useConnectionPooling: true
    },
    getConfig () {
      return obj.isDev() ? obj.mysql._dev : obj.mysql._prod
    },
    host () {
      return this.getConfig().host
    },
    user () {
      return this.getConfig().user
    },
    password () {
      return this.getConfig().password
    },
    database () {
      return this.getConfig().database
    }
  },
  port () {
    return 8083
  }
}

module.exports = obj
