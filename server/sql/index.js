const conn = require('./mysql')
const utils = require('../utils')
const mysql = require('mysql')

var sqlUtils = {
  execute (sql) {
    return new Promise((resolve, reject) => {
      conn.query(sql, function (err, result) {
        if (err) {
          utils.logger.error('[SQL Execute Error]:', sql, err)
        } else {
          resolve(result)
        }
      })
    })
  },
  getCount (sql) {
    const me = this
    return new Promise((resolve, reject) => {
      me.execute(sql).then(result => {
        if (result.length > 0) {
          for (let key in result[0]) {
            let val = result[0][key]
            if (!isNaN(val)) {
              resolve(val)
              return
            }
          }
        }
        resolve(0)
      })
    })
  },
  escape: mysql.escape
}
module.exports = sqlUtils