import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/main.vue'
import Login from '../views/login.vue'
import Store from 'op/store/index'

import articleEditorPage from '../views/article/editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'Index',
        component: () => import(/* webpackChunkName: "Index" */ '../views/index.vue')
      },
      {
        path: 'article/list',
        name: 'Article_List',
        component: () => import(/* webpackChunkName: "Article_List" */ '../views/article/list.vue')
      },
      {
        path: 'article/create',
        name: 'Article_Create',
        component: articleEditorPage
      },
      {
        path: 'article/:id',
        name: 'Article_Edit',
        props: true,
        component: articleEditorPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
  } else {
    if (Store.getters.isLogin) {
      next()
    } else {
      next({name: 'Login'})
    }
  }
})
router.afterEach((to) => {
  Store.dispatch('autoUpdateBreadcrumb', to.name)
})

export default router
