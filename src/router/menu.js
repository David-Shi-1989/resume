const menuList = [
  {
    title: 'home',
    path: 'home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
    meta: {
      noPadding: true
    }
  },
  {
    title: 'Blog Post',
    path: 'blog',
    name: 'blogPost',
    children: [
      {
        title: 'Blog List',
        name: 'blogPost',
        component: () => import(/* webpackChunkName: "blogPost" */ '../views/post/index.vue'),
      },
      {
        title: 'Blog Article',
        path: ':id',
        name: 'blogPostItem',
        component: () => import(/* webpackChunkName: "blogPostItem" */ '../views/post/item.vue'),
        props: true,
        meta: {
          backRouterName: 'blogPost'
        }
      }
    ]
  },
  {
    title: 'Works',
    path: 'works',
    name: 'Works',
    component: () => import('../views/works/index.vue'),
    children: [
      {
        title: 'Flip Logo',
        path: 'flip-logo',
        name: 'Demo_Flip_Logo',
        meta: {
          backRouterName: 'Works'
        },
        component: () => import(/* webpackChunkName: "Demo_Flip_Logo" */ '../views/works/list/logo-flip.vue'),
      },
      // {
      //   title: 'Animate Log',
      //   path: 'animate-log',
      //   name: 'Demo_Animate_Log',
      //   meta: {
      //     backRouterName: 'Works'
      //   },
      //   component: () => import(/* webpackChunkName: "Demo_Flip_Logo" */ '../views/works/list/log-animate/index.vue'),
      // }
    ]
  }
]

const headerMenus = menuList.map(item => ({
  title: item.title,
  routerName: item.name
}))

const routerList = []
renderRouterList()

function renderRouterList () {
  for (let i = 0; i < menuList.length; i++) {
    const menu1 = menuList[i]
    if (menu1.component) {
      routerList.push(menu1)
    }
    if (menu1.children) {
      for (let j = 0; j < menu1.children.length; j++) {
        const menu2 = menu1.children[j]
        menu2.path = '/' + [menu1.path, menu2.path].filter(i => !!i).join('/')
        routerList.push(menu2)
      }
    }
  }
}
function getMenu1ByRouterName (name) {
  for (let i = 0; i < menuList.length; i++) {
    const menu1 = menuList[i]
    if (name === menu1.name) {
      return menu1
    }
    if (menu1.children && menu1.children.some(menu2 => menu2.name === name)) {
      return menu1
    }
  }
}
export {
  headerMenus,
  routerList,
  getMenu1ByRouterName
}
