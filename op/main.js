import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import VueEditor from 'vue-md-editor'
import 'view-design/dist/styles/iview.css'
import './style/style.less'
import '../src/assets/font/iconfont.css'
import '../src/utils'
import 'vue-md-editor/src/styles/markdown.css'

Vue.use(ViewUI)
Vue.use(VueEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')