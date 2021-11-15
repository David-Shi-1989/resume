import { createRouter, createWebHashHistory } from 'vue-router'
import { routerList } from 'op/router/menu'
import Store from 'op/store/index'
import Index from '../views/index'

const signUpPageRouterName = 'SignUp'

const routes = [
  {
    path: '/sign-up',
    name: signUpPageRouterName,
    component: () => import(/* webpackChunkName: "home" */ '../views/sign-in')
  },
  {
    path: '/',
    component: Index,
    redirect: '/index',
    children: routerList
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  if (to.name === signUpPageRouterName) {
    next()
  } else {
    if (Store.getters.isLogin) {
      Store.dispatch('autoUpdateBreadcrumb', to.name)
      next()
    } else {
      next({name: signUpPageRouterName})
    }
  }
})
export default router
