import Vue from 'vue'
const colorList = [
  'primary',
  'success',
  'error',
  'text-title',
  'text-content',
  'text-sub',
  'disabled',
  'border',
  'warning',
  'background'
]
// color 数组转化为对象
const colorObj = {}
colorList.forEach(colorKey => {
  if (colorKey.indexOf('-') > -1) {
    // 包含-,转化为驼峰
    let copyColorKey = colorKey
    colorKey.match(/-\w/g).forEach(matchChar => {
      copyColorKey = copyColorKey.replace(matchChar, matchChar[1].toUpperCase())
    })
    colorObj[copyColorKey] = colorKey
  } else {
    colorObj[colorKey] = colorKey
  }
})
// 自定义指令
Vue.directive('color', {
  bind: function (el, binding, vnode) {
    const colorValue = binding.value
    if (colorList.includes(colorValue)) {
      el.style.color = `var(--color-${colorValue})`
    } else {
      console.error('unknow color ', colorValue)
    }
  }
})
// mixin
Vue.mixin({
  data: () => {
    return {
      MIXIN_ColorObj: colorObj
    }
  }
})
export {
  colorList
}
