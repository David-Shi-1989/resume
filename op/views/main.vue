<template>
  <div id="main">
    <oHeader></oHeader>
    <div class="main-content">
      <Sidebar></Sidebar>
      <div id="content">
        <oBreadcrumb></oBreadcrumb>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import oHeader from 'op/components/header.vue'
import Sidebar from 'op/components/sidebar.vue'
import oBreadcrumb from 'op/components/breadcrumb.vue'
export default {
  components: {oHeader, Sidebar, oBreadcrumb},
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
@header-height: 52px;
#main {
  height: 100%;
}
.main-content {
  display: flex;
  height: calc(100% - @header-height);
  #content {
    flex: 1 1 100%;
  }
}
</style>
