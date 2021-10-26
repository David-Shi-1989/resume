import Vue from 'vue'
import Vuex from 'vuex'
import {LoginStatus} from 'op/constant.js'
import Cookie from 'js-cookie'

Vue.use(Vuex)

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
const sidebarMenu = [
  {
    title: '文章',
    icon: 'iconfont icon-bianjiwenzhang_huaban',
    children: [
      {title: '标签', name: 'a-tag', routerName: 'Article_Tag'},
      {
        title: '列表',
        name: 'a-list',
        routerName: 'Article_List',
        children: [
          {title: '新建', name: 'a-list-create', routerName: 'Article_Create'},
          {title: '编辑', name: 'a-list-edit', routerName: 'Article_Edit'}
        ]
      }
    ]
  },
  {
    title: '统计',
    icon: 'iconfont icon-paiming',
    children: [
      {title: '个人排名', name: 's-rank', routerName: 'Rank_User'},
      {title: '机构排名', name: 's-apartment', routerName: 'Rank_Apartment'},
      {title: '比赛记录', name: 's-score', routerName: 'Match_List'}
    ]
  },
  {
    title: '系统配置',
    icon: 'ivu-icon ivu-icon-ios-settings',
    children: [
      {title: '规则文本', name: 'c-score', routerName: 'Rule_Config'},
      {title: '答题配置', name: 'c-question', routerName: 'Question_Config'}
    ]
  }
]
const mainStore = new Vuex.Store({
  state: {
    loginStatus: getLoginStatusFromCookie(),
    userInfo: {
      name: userNameFromCookie || '',
      id: userIdFromCookie || ''
    },
    breadcrumbList: [],
    loading: {
      show: false
    },
    sidebarMenu
  },
  getters: {
    isLogin: state => state.loginStatus === LoginStatus.Login,
    sidebarMenu: state => state.sidebarMenu,
    userName: state => state.userInfo.name,
    userId: state => state.userInfo.id,
    breadcrumbList: state => state.breadcrumbList,
    showLoading: state => state.loading.show,
    tableHeight: () => {
      return document.body.clientHeight - 52 - 20 - 30 - 120 - 20 - 100
    }
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
      for (let idx1 = 0; idx1 < sidebarMenu.length; idx1++) {
        const menu1 = sidebarMenu[idx1]
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
    loading: (state, isShow) => {
      state.loading.show = (isShow === true)
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
  let matchedMenuItem = recurArr(sidebarMenu)
  if (matchedMenuItem) {
    const result = [matchedMenuItem]
    while (matchedMenuItem._parent) {
      matchedMenuItem = matchedMenuItem._parent
      result.unshift(matchedMenuItem)
    }
    return result
  } else {
    return []
  }
  function recurArr (arr) {
    if (arr && Array.prototype.isPrototypeOf(arr)) {
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (item.routerName === routerName) {
          return item
        }
        if (item.children) {
          item.children.forEach(child => {
            child._parent = item
          })
          return recurArr(item.children)
        }
      }
    }
    return null
  }
}
export default mainStore
