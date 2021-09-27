<template>
  <div id="sidebar">
    <Menu theme="dark" mode="vertical" width="100%">
      <Submenu v-for="(menu1, idx1) in sidebarMenu" :key="'menu1_'+idx1" :name="'menu1_'+idx1">
        <template slot="title">
          <span v-if="menu1.icon" :class="menu1.icon"></span>
          <Icon v-else type="ios-paper" />
          {{menu1.title}}
        </template>
        <MenuItem v-for="menu2 in menu1.children" :key="menu2.routerName" :name="menu2.name" :to="{name:menu2.routerName}">{{menu2.title}}</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    ...mapGetters(['sidebarMenu'])
  }
}
</script>
<style lang="less" scoped>
@import url('../style/utils.less');
@sidebar-bg: #515a6e;
#sidebar {
  flex:0 0 @sidebar-width;
  height: 100%;
  background-color: @sidebar-bg;
  ul.ivu-menu > li.ivu-menu-item {
    padding-left: 45px !important;
  }
}
</style>
