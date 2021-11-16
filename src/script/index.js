export const localStorage = {
  key: 'mr-ls',
  getObj () {
    const objStr = window.localStorage.getItem(this.key) || '{}'
    return JSON.parse(objStr)
  },
  get (key) {
    const obj = this.getObj()
    if (key) {
      return obj[key]
    }
    return obj
  },
  set (key, value) {
    const obj = this.getObj()
    obj[key] = value
    window.localStorage.setItem(this.key, JSON.stringify(obj))
  }
}

export function translate (key, obj) {
  if (obj) {
    return window.vm.$i18n.t(key, obj)
  } else {
    return window.vm.$i18n.t(key)
  }
}

export function formatDateTime (val, formatStr = 'yyyy/MM/dd hh:mm:ss') {
  let date = null
  if (typeof val === 'object' && val.getFullYear) {
    date = val
  } else if (typeof val === 'number') {
    date = new Date(val)
  }
  return date.format(formatStr)
}

export function getRandomNum (min = 0, max = 10) {
  let dis = max - min
  return (Math.floor(Math.random() * (dis + 1)) + min)
}

/* eslint-disable */
Date.prototype.format = function (fmt = 'yyyy/MM/dd hh:mm:ss') {
/* eslint-disable */
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/* eslint-disable */
String.prototype.random = function (length, dict) {
/* eslint-disable */
  var len = length || 32
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' || dict /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
