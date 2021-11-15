import { createStore } from 'vuex'
import { LANG, THEME } from '@/script/constant'

export default createStore({
  state: {
    lang: LANG.zhCN,
    theme: THEME.light,
    backBtnRouterName: '',
    loading: false
  },
  getters: {
    backBtnRouterName: state => state.backBtnRouterName,
    showLoading: state => state.loading
  },
  mutations: {
    setBackBtnRouterName: (state, routerName) => {
      state.backBtnRouterName = routerName || ''
    },
    loading: (state, isShow) => {
      state.loading = (isShow === true)
    }
  },
  actions: {
  },
  modules: {
  }
})
