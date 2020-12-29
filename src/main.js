import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import gsap from 'gsap'

import './style/style.less'

import iview from 'view-design'
import 'view-design/dist/styles/iview.css'

import 'font-awesome/css/font-awesome.min.css'

import './utils/theme-mixin-directive'

Vue.config.productionTip = false

Vue.use(iview)
Vue.use(i18n)

Vue.prototype.$gsap = gsap

window.vm = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
