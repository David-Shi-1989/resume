const menuList = [
  {
    title: 'home',
    path: 'home',
    name: 'Home',
    component: () => import('../views/home.vue'),
    meta: {
      noPadding: true
    }
  },
  // {
  //   title: 'Works',
  //   path: 'works',
  //   name: 'Works',
  //   component: () => import('../views/works/index.vue')
  // },
  {
    title: 'Blog Post',
    path: 'blog',
    name: 'blogPost',
    children: [
      {
        title: 'Blog List',
        name: 'blogPost',
        component: () => import('../views/post/index.vue'),
      },
      {
        title: 'Blog Article',
        path: ':id',
        name: 'blogPostItem',
        component: () => import('../views/post/item.vue'),
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
    component: () => import('../views/works/index.vue')
  }
  // {
  //   title: 'Contact Me',
  //   path: 'contact-me',
  //   name: 'Home'
  // }
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
