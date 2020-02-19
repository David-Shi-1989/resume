import Vue from 'vue'
import Vuex from 'vuex'

import configModule from './modules/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'zhCN' // zhCN enUS
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    configModule
  }
})
