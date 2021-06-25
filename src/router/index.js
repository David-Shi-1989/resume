import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'

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
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home.vue')
      },
      {
        path: 'career',
        name: 'Career',
        component: () => import('../views/career.vue')
      },
      {
        path: 'project',
        name: 'Project',
        component: () => import('../views/project.vue')
      },
      {
        path: 'demo',
        name: 'Demo',
        component: () => import('../views/demo/index.vue')
      },
      {
        path: 'demo/log-animate',
        name: 'Demo_Animate',
        component: () => import('../views/demo/demos/log-animate.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  let wrapEl = document.getElementById('routeWrap')
  if (wrapEl) {
    wrapEl.scrollTop = 0
  }
  next()
})

export default router
