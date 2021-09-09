import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Storex from '@/store'
import {routerList} from './menu'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: routerList
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let wrapEl = document.getElementById('routeWrap')
  if (wrapEl) {
    wrapEl.scrollTop = 0
  }
  Storex.commit('setBackBtnRouterName', to.meta.backRouterName)
  next()
})
router.afterEach(() => {
  var wrap = document.getElementById('main_container')
  if (wrap) {
    wrap.scrollTop = 0
  }
})

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
