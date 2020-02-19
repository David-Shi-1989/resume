import { localStorage } from '@/utils'
const state = {
  lang: localStorage.get('lang') || 'zhCN' // zhCN, enUS
}

const getters = {
  getLang: (state) => state.lang
}

const actions = {}

const mutations = {
  setLang: (state, lang) => {
    if (['zhCN', 'enUS'].indexOf(lang) > -1) {
      state.lang = lang
      localStorage.set('lang', lang)
      window.location.reload()
    } else {
      console.error('unmatched lang ', lang)
    }
  }
}

export default {
  namespaved: true,
  state,
  getters,
  actions,
  mutations
}
