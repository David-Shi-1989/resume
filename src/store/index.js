import { createStore } from 'vuex'
import { LANG, THEME, LocalStorage_key_userInfo } from '@/script/constant'
import {get} from 'lodash'

const localUserInfo = getUserInfo()

export default createStore({
  state: {
    lang: LANG.zhCN,
    theme: THEME.light,
    backBtnRouterName: '',
    loading: false,
    userInfo: {
      id: get(localUserInfo, 'id', ''),
      name: get(localUserInfo, 'name', ''),
      avatar: get(localUserInfo, 'avatar', ''),
      email: get(localUserInfo, 'email', '')
    }
  },
  getters: {
    backBtnRouterName: state => state.backBtnRouterName,
    showLoading: state => state.loading,
    userId: state => state.userInfo.id,
    userName: state => state.userInfo.name,
    userAvatar: state => state.userInfo.avatar,
    userEmail: state => state.userInfo.email,
    userInfo: state => state.userInfo
  },
  mutations: {
    setBackBtnRouterName: (state, routerName) => {
      state.backBtnRouterName = routerName || ''
    },
    loading: (state, isShow) => {
      state.loading = (isShow === true)
    },
    updateUserInfo: (state, userInfo) => {
      Object.assign(state.userInfo, userInfo)
      setUserInfo(
        get(userInfo, 'id', ''),
        get(userInfo, 'name', ''),
        get(userInfo, 'avatar', ''),
        get(userInfo, 'email', '')
      )
    }
  },
  actions: {
  },
  modules: {
  }
})
function getUserInfo () {
  let userInfo = {}
  try {
    userInfo = JSON.parse(localStorage.getItem(LocalStorage_key_userInfo) || '{}')
  } catch (e) {

  }
  return userInfo
}
function setUserInfo (id = '', name = '', avatar = '', email = '') {
  const userInfo = {id, name, avatar, email}
  localStorage.setItem(LocalStorage_key_userInfo, JSON.stringify(userInfo))
}