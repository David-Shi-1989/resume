import { localStorage } from '@/utils'
const state = {
  lang: localStorage.get('lang') || 'zhCN', // zhCN, enUS
  theme: {
    list: [
      { name: 'Light', color: '#ddd' },
      { name: 'Dark', color: '#101b3b' }
    ],
    current: localStorage.get('theme') || 'Light',
  },
  backBtnRouterName: ''
}

const getters = {
  getLang: (state) => state.lang,
  getThemeList: state => state.theme.list,
  getTheme: state => {
    return state.theme.current
  },
  backBtnRouterName: state => state.backBtnRouterName
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
  },
  setTheme: (state, theme) => {
    if (state.theme.list.some(item => item.name === theme)) {
      localStorage.set('theme', theme)
      state.theme.current = theme
    }
  },
  setBackBtnRouterName: (state, routerName) => {
    state.backBtnRouterName = routerName || ''
  }
}

export default {
  namespaved: true,
  state,
  getters,
  actions,
  mutations
}
