import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iview from 'iview'
// import '@/script/utils.js'
import 'iview/dist/styles/iview.css'
import './style/style.less'
// import '../src/assets/font/iconfont.css'

Vue.use(iview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')