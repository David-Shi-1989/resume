<template>
  <div id="main">
    <sideBar></sideBar>
    <div class="mr-right">
      <myHeader></myHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideBar from './cpn/sidebar'
import myHeader from './cpn/header'
export default {
  components: {
    sideBar, myHeader
  }
}
</script>

<style lang="less" scoped>
@import url('../style/style.less');
#main {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: @sidebar-width auto;
  .mr-right {
    padding: 0 1.5rem;
  }
}
</style>
