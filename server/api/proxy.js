var http = require('http')
var request = require('request')
var utils = require('../utils')

const config = {
  hostname: process.env.Area + '.laonongjin.com',
  port: 80
}
module.exports = {
  get (path, paramsObj) {
    let curPath = path
    if (paramsObj) {
      curPath += '?'
      for (let key in paramsObj) {
        curPath += `${key}=${paramsObj[key]}&`
      }
      curPath = 'http://' + encodeURI(config.hostname + curPath.replace(/&$/, ''))
      return new Promise(function (resolve, reject) {
        request(curPath, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            try {
              let data = JSON.parse(body.toString())
              resolve(data)
              return true
            } catch (err) {
              utils.logger.error(`Error proxy.get `, curPath, err.message)
            }
          }
          const errMsg = error ? error.message : response.statusCode
          utils.logger.error(`Error proxy.get `, errMsg)
          reject(errMsg)
        })
      })
    }
  }
  // get2 (path, paramsObj) {
  //   let curPath = path
  //   if (paramsObj) {
  //     curPath += '?'
  //     for (let key in paramsObj) {
  //       curPath += `${key}=${paramsObj[key]}&`
  //     }
  //     curPath = curPath.replace(/&$/, '')
  //   }
  //   const curConfig = Object.assign(config, {
  //     path: curPath,
  //     method: 'GET'
  //   })
  //   return new Promise(function (resolve) {
  //     var req = http.request(curConfig, function (res) {
  //       res.setEncoding('utf-8')
  //       body = ''
  //       res.on('data', chunk => {
  //         body += chunk
  //       })
  //       res.on('end', () => {
  //         debugger
  //         resolve(body.toString())
  //       })
  //     })
  //     req.on('error', e => {
  //       console.error(`error when request:${e.message}`)
  //     })
  //   })
  // }
}