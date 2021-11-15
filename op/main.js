import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery'
import '@/script/index'

import '@arco-design/web-vue/dist/arco.css'
import '@/style/index.less'

import 'op/style/op.less'

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .mount('#app')
