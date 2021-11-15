const log4js = require('log4js')
const path = require('path')
const logDir = path.join(__dirname, '../', 'log')
log4js.configure({
  replaceConsole: true,
  pm2: true,
  appenders: {
    stdout: {
      type: 'console'
    },
    info: {
      type: 'dateFile',
      filename: path.join(logDir, 'info'),
      pattern: 'yyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    login: {
      type: 'dateFile',
      filename: path.join(logDir, 'login'),
      pattern: 'yyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    error: {
      type: 'dateFile',
      filename: path.join(logDir, 'err'),
      pattern: 'yyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    oth: {
      type: 'dateFile',
      filename: path.join(logDir, 'log'),
      pattern: 'yyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    op: {
      type: 'dateFile',
      filename: path.join(logDir, 'op'),
      pattern: 'yyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['stdout', 'info'],
      level: 'debug'
    },
    err: {
      appenders: ['stdout', 'error'],
      level: 'error'
    },
    login: {
      appenders: ['stdout', 'login'],
      level: 'info'
    },
    op: {
      appenders: ['stdout', 'op'],
      level: 'info'
    }
  }
})

exports.getLogger = function (name) {
  return log4js.getLogger(name || 'default')
}