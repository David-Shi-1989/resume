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
