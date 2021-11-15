<template>
  <a-layout-sider hide-trigger collapsible :collapsed="sidebarCollapsed" class="sidebar-wrap">
    <div class="logo" />
    <a-menu
      :style="{ width: '100%' }"
      :selected-keys="[$route.name]"
      :default-open-keys="activeMenu1Key"
      @menuItemClick="onClickMenuItem"
    >
      <a-sub-menu v-for="(menu1) in visibleSidebarMenu" :key="menu1.path">
        <template #title>
          <span><component :is="menu1.icon"></component>{{menu1.title}}</span>
        </template>
        <a-menu-item v-for="menu2 in menu1.children" :key="menu2.routerName">{{menu2.title}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
    <div class="collapse-btn">
      <a-button @click="onCollapseChange">
        <template #icon><component :is="collpaseIcon"></component></template>
      </a-button>
    </div>
  </a-layout-sider>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cloneDeep } from 'lodash'
export default {
  name: 'Sidebar',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['sidebarCollapsed', 'sidebarMenu']),
    activeMenu1Key () {
      return [this.$route.path.split('/').filter(i => i)[0]]
    },
    visibleSidebarMenu () {
      let arr = []
      for (let idx1 = 0; idx1 < this.sidebarMenu.length; idx1++) {
        let oriMenu1 = this.sidebarMenu[idx1]
        let menu1 = cloneDeep(oriMenu1)
        if (menu1.showInMenu === false) {
          continue
        } else {
          menu1.children = []
          arr.push(menu1)
          if (oriMenu1.children) {
            for (let idx2 = 0; idx2 < oriMenu1.children.length; idx2++) {
              let menu2 = oriMenu1.children[idx2]
              if (menu2.showInMenu === false) {
                continue
              } else {
                menu1.children.push(cloneDeep(menu2))
              }
            }
          }
        }
      }
      return arr
    },
    collpaseIcon () {
      return this.sidebarCollapsed ? 'icon-caret-right' : 'icon-caret-left'
    }
  },
  methods: {
    ...mapMutations(['setSidebarCollapsed']),
    onClickMenuItem (routerName) {
      this.$router.push({name: routerName})
    },
    onCollapseChange () {
      this.setSidebarCollapsed(!this.sidebarCollapsed)
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-wrap {
  :deep(.arco-layout-sider-children) {
    display: flex;
    flex-direction: column;
  }
  .collapse-btn {
    align-self: center;
    margin-top: auto;
    margin-bottom: 10px;
  }
  :deep(.arco-menu-inner) .arco-menu-inline .arco-menu-inline-content > .arco-menu-item {
    padding-left: 23px;
  }
}
</style>
