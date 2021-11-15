import { createStore } from 'vuex'
import {LoginStatus} from 'op/constant.js'
import {sidebarList} from 'op/router/menu'
import Cookie from 'js-cookie'

const userNameFromCookie = Cookie.get('username')
const userIdFromCookie = Cookie.get('userId')
const isLoginFromCookie = Cookie.get('isLogin')
const loginExpiredTime = 1000 * 60 * 60 * 8
function getLoginStatusFromCookie () {
  if (userNameFromCookie && isLoginFromCookie && isLoginFromCookie === 'true') {
    return LoginStatus.Login
  } else {
    return LoginStatus.Unlogin
  }
}
const mainStore = new createStore({
  state: {
    loginStatus: getLoginStatusFromCookie(),
    userInfo: {
      name: userNameFromCookie || '',
      id: userIdFromCookie || ''
    },
    breadcrumbList: [],
    sidebarMenu: sidebarList,
    sidebarCollapsed: false,
    loading: false
  },
  getters: {
    isLogin: state => state.loginStatus === LoginStatus.Login,
    sidebarMenu: state => state.sidebarMenu,
    userName: state => state.userInfo.name,
    userId: state => state.userInfo.id,
    breadcrumbList: state => state.breadcrumbList,
    tableHeight: () => {
      return document.body.clientHeight - 52 - 20 - 30 - 120 - 20 - 100
    },
    sidebarCollapsed: state => state.sidebarCollapsed,
    loading: state => state.loading
  },
  mutations: {
    updateLoginStatus: (state, val) => {
      state.loginStatus = val
    },
    updateUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
      Cookie.set('username', userInfo.name, {expires: (new Date(Date.now() + loginExpiredTime))})
      Cookie.set('userId', userInfo.id, {expires: (new Date(Date.now() + loginExpiredTime))})
    },
    updateUserId: (state, id) => {
      state.userInfo.id = id
      Cookie.set('userId', id, {expires: (new Date(Date.now() + loginExpiredTime))})
    },
    initBreadcrumb: (state, routerName) => {
      const bc = []
      for (let idx1 = 0; idx1 < sidebarList.length; idx1++) {
        const menu1 = sidebarList[idx1]
        if (menu1.routerName && !menu1.children && menu1.routerName === routerName) {
          bc.push(menu1.title)
          break
        } else if (menu1.children && menu1.children.length > 0) {
          for (let idx2 = 0; idx2 < menu1.children.length; idx2++) {
            const menu2 = menu1.children[idx2]
            if (menu2.routerName === routerName) {
              bc.push(menu1.title, menu2.title)
              break
            }
          }
        }
      }
      state.breadcrumbList = bc
    },
    updateBreadcrumb: (state, list) => {
      state.breadcrumbList = list
    },
    setSidebarCollapsed: (state, val) => {
      state.sidebarCollapsed = (!!val)
    },
    loading: (state, val) => {
      state.loading = !!val
    }
  },
  actions: {
    userLogin ({commit}, userInfo) {
      commit('updateUserInfo', userInfo)
      commit('updateLoginStatus', LoginStatus.Login)
      Cookie.set('isLogin', 'true', {expires: (new Date(Date.now() + loginExpiredTime))})
    },
    logout ({commit}) {
      commit('updateLoginStatus', LoginStatus.Unlogin)
      Cookie.remove('isLogin')
      Cookie.remove('userId')
    },
    autoUpdateBreadcrumb ({commit}, routerName) {
      const menuItems = findMenusByName(routerName)
      commit('updateBreadcrumb', menuItems.map((m) => m.title))
    }
  },
  modules: {
  }
})
function findMenusByName (routerName) {
  if (routerName === 'Index') {
    return [{title: '主页'}]
  }
  let list = sidebarList.map(menu1 => {
    let matchedMenu2 = menu1.children.find(menu2 => menu2.routerName === routerName)
    if (matchedMenu2) {
      return matchedMenu2.bc
    } else {
      return null
    }
  }).filter(i => !!i)
  console.assert(list.length === 1, 'Can not match breadcrumb for routerName ' + routerName)
  return list[0].map(title => ({title}))
}
export default mainStore
