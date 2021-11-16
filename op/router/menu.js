import {get} from 'lodash'

const menuList = [
  {
    title: '文章',
    path: 'article',
    icon: 'icon-book',
    children: [
      {
        title: '列表',
        path: 'list',
        name: 'Article_List',
        component: () => import(/* webpackChunkName: "Article" */'../views/article/list.vue')
      },
      {
        title: '编辑',
        path: ':id',
        name: 'Article_Editor',
        props: true,
        showInMenu: false,
        component: () => import(/* webpackChunkName: "Article" */'../views/article/editor.vue')
      },
      {
        title: '新建',
        path: 'create',
        name: 'Article_Create',
        showInMenu: false,
        component: () => import(/* webpackChunkName: "Article" */'../views/article/editor.vue')
      },
      {
        title: '标签',
        path: 'tag',
        name: 'Article_Tag',
        component: () => import(/* webpackChunkName: "Article" */'../views/article/tag.vue')
      }
    ],
  },
  {
    title: '作品',
    path: 'work',
    icon: 'icon-apps',
    children: [
      {
        title: '列表',
        path: 'list',
        name: 'Work_List',
        component: () => import(/* webpackChunkName: "Works" */'../views/work/list.vue')
      },
      {
        title: '分类',
        path: 'category',
        name: 'Work_Category',
        component: () => import(/* webpackChunkName: "Works" */'../views/work/category.vue')
      },
    ]
  },
  {
    title: '主页',
    path: 'index',
    name: 'Index',
    showInMenu: false,
    meta: {
      noBg: true,
      noPadding: true
    },
    component: () => import(/* webpackChunkName: "Home" */'../views/home.vue')
  }
]

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

const sidebarList = []
renderSidebarList()

function renderSidebarList () {
  for (let idx1 = 0; idx1 < menuList.length; idx1++) {
    let menu1 = menuList[idx1]
    let menu1Item = {
      title: menu1.title,
      icon: menu1.icon,
      path: menu1.path.toLowerCase(),
      bc: [menu1.title],
      showInMenu: menu1.showInMenu !== false,
      children: []
    }
    const menu1Children = get(menu1, 'children', [])
    for (let idx2 = 0; idx2 < menu1Children.length; idx2++) {
      let menu2 = menu1.children[idx2]
      let menu2Item = {
        title: menu2.title,
        routerName: menu2.name,
        showInMenu: menu2.showInMenu !== false,
        bc: [menu1.title, menu2.title]
      }
      menu1Item.children.push(menu2Item)
    }
    sidebarList.push(menu1Item)
  }
}


export {
  routerList,
  sidebarList,
  getMenu1ByRouterName
}
