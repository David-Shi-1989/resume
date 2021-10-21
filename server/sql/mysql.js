const mysql = require('mysql');
const config = require('../setting').mysql.getConfig()
const utils = require('../utils')

var db = null

var pingInterval;

function handleError (err) {
  connect()
}
function connect() {
  if (db !== null) {
    db.destory && db.destory()
    db = null
  }
  db = mysql.createConnection(config)
  db.connect(function (err) {
    if (err) {
      utils.logger.error('Error when connecting to db, reconnecting after 2 seconds:')
      setTimeout(connect, 2000)
    }
  })
  db.on("error", handleError)
  clearInterval(pingInterval)
  pingInterval = setInterval(() => {
    utils.logger.info('ping mysql to check if alive...', (new Date()).toGMTString())
    db.ping(err => {
      if (err) {
        utils.logger.info('ping error:' + JSON.stringify(err))
      }
    })
  }, 1000 * 60 * 60)
}

connect()
module.exports = db