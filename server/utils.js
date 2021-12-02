const MD5 = require('md5-node')
const uuid = require('uuid')
const logger = require('./middleware/log4js').getLogger('default')
const errorLogger = require('./middleware/log4js').getLogger('err')
const loginLogger = require('./middleware/log4js').getLogger('login')
const opLogger = require('./middleware/log4js').getLogger('op')
const lodash = require('lodash')
const XSS = require('xss')
const http = require('http')
const iconv = require('iconv-lite')
const BufferHelper = require('bufferhelper')

function isArray (obj) {
  return Array.prototype.isPrototypeOf(obj)
}
module.exports = {
  response (res, data, httpCode = 200) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.status(httpCode).end(JSON.stringify(data))
  },
  getIpFromReq (req) {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
  },
  getUserIdFromReq (req) {
    if (req.session.user && req.session.user.userId) {
      return req.session.user.userId
    } else if (req.headers.userid) {
      req.session.user.userId = req.headers.userid
      return req.headers.userid
    } else {
      this.logger.warn('Missing userId in req')
      return null
    }
  },
  getUserInfoFromReq (req) {
    if (req.session.user && req.session.user.userId) {
      return req.session.user
    } else if (req.headers && req.headers.cookie) {
      let cookieObj = this.lodash.arr2obj(req.headers.cookie.split(';').map(s => s.trim().split('=')).map(arr => ({key: arr[0], value: decodeURI(arr[1])})), 'key', 'value')
      req.session.user = {
        userId: cookieObj['userId'],
        userName: cookieObj['userName'],
        avatar: cookieObj['avatar'],
        apartment: cookieObj['apartment'],
        code: cookieObj['code']
      }
      return req.session.user
    }
  },
  getRandom (min = 0, max = 10) {
    var dis = max - min;
    return Math.floor(Math.random() * (dis + 1)) + min;
  },
  getRandomCode (bit = 4) {
    let result = ''
    for (let i = 0; i < bit; i++) {
      result += this.getRandom()
    }
    return result
  },
  md5Encode (str) {
    return MD5(str)
  },
  uuid () {
    return uuid.v1() // timestamp
  },
  uuidV4 () {
    return uuid.v4() // random
  },
  sqlDateTime: `DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s')`,
  formatDate (val, fmt = 'yyyy/MM/dd hh:mm:ss') {
    let dateObj = val || (new Date())
    if (typeof val === 'number') {
      dateObj = new Date(val)
    }
    var o = {
      "M+" : dateObj.getMonth() + 1,                 //月份
      "d+" : dateObj.getDate(),                    //日
      "h+" : dateObj.getHours(),                   //小时
      "m+" : dateObj.getMinutes(),                 //分
      "s+" : dateObj.getSeconds(),                 //秒
      "q+" : Math.floor((dateObj.getMonth() + 3) / 3), //季度
      "S"  : dateObj.getMilliseconds()             //毫秒
    }
    if(/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
    for(var k in o)
      if(new RegExp('('+ k + ')').test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
  },
  tableName: {
    op_user: 'op_user',
    op_user_login: 'op_user_login',
    op_tag: 'op_tag',
    article: 'op_article',
    web_user: 'web_user',
    web_comment: 'web_comment',
    work: 'web_work',
    like: 'web_like',
    visit: 'web_visit',
    ipRegion: 'web_ip_region',
    // TODO delete below
    category: 'op_question_category',
    question: 'op_question_list',
    matchRecord: 'app_match_record',
    scoreRecord: 'app_score_list',
    config: 'op_config',
    user: 'app_user_list',
    rule: 'op_rule'
  },
  sql: {
    addMark (str) {
      return `'${str}'`
    },
    insert (tableName, fieldList, valueList) {
      console.assert(tableName && isArray(fieldList) && isArray(valueList) && fieldList.length === valueList.length, 'incorrect params ', tableName, fieldList, valueList)
      return `INSERT INTO ${tableName} (${fieldList.join(',')}) VALUES (${valueList.join(',')})`
    }
  },
  isArray (obj) {
    return isArray(obj)
  },
  isProduction () {
    return process.env.NODE_ENV === 'production'
  },
  logger: {
    info (...val) {
      logger.info(...val)
    },
    error (...val) {
      errorLogger.error(...val)
    },
    warn (...val) {
      logger.warn(...val)
    },
    login (userName) {
      loginLogger.info(`OP用户登录: ${userName}`)
    },
    op (...val) {
      opLogger.info(...val)
    }
  },
  arrayRandom (arr, count) {
    if (isArray(arr)) {
      return lodash.shuffle(arr).slice(0, count)
    }
    return []
  },
  sortBy (arr, sortFunc) {
    return lodash.sortBy(arr, sortFunc)
  },
  keysValues (obj) {
    const keys = [], values = []
    for (let key in obj) {
      keys.push(key)
      values.push(obj[key])
    }
    return {keys, values}
  },
  lodash: {
    get: lodash.get,
    arr2obj (arr, keyField, valueField) {
      const result = {}
      arr.forEach(item => {
        const key = item[keyField]
        const value = item[valueField]
        if (typeof key === 'string') {
          result[key] = value
        }
      })
      return result
    },
    values: lodash.values,
    uniq: lodash.uniq
  },
  parseUserInput (input = '') {
    return XSS(input.replace(/\'/g, '\\\''))
  },
  httpGet (url, encode = 'UTF8') {
    console.assert(/^http:\/\//.test(url), 'only support http')
    url = url.replace(/^http:\/\//, '')
    let idx = url.indexOf('/')
    var options = {
      hostname: url,
      path: '',
      method: 'GET'
    }
    if (idx > 0) {
      options.hostname = url.substr(0, idx)
      options.path = url.substr(idx)
    }
    return new Promise((resolve, reject) => {
      var bufferHelper = new BufferHelper()
      var req = http.request(options, function (res) {
        res.on('data', (chunk) => {
          bufferHelper.concat(chunk)
        })
        res.on('end', () => {
          resolve(iconv.decode(bufferHelper.toBuffer(), encode))
        })
      })
      req.end()
    })
  }
}
