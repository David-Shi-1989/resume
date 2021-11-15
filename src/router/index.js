import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index'
import Storex from '@/store'

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          noPadding: true
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
      },
      {
        path: 'blog',
        name: 'blogPost',
        component: () => import(/* webpackChunkName: "post" */ '../views/post/index.vue')
      },
      {
        path: 'blog/:id',
        name: 'blogPostItem',
        props: true,
        meta: {
          backRouterName: 'blogPost'
        },
        component: () => import(/* webpackChunkName: "post" */ '../views/post/item.vue')
      },
      {
        title: 'Works',
        path: 'works',
        name: 'Works',
        component: () => import('../views/works/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const wrapEl = document.getElementById('routeWrap')
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

export default router
