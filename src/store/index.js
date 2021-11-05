import Vue from 'vue'
import Vuex from 'vuex'

import configModule from './modules/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'zhCN', // zhCN enUS
    showLoading: false,
  },
  getters: {
    showLoading: state => state.showLoading
  },
  mutations: {
    loading: (state, isShow) => {
      state.showLoading = (isShow === true)
    }
  },
  actions: {
  },
  modules: {
    configModule
  }
})
