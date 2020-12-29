<template>
  <div id="main">
    <sideBar></sideBar>
    <div class="mr-right">
      <myHeader :hasBorder="true"></myHeader>
      <div id="routeWrap">
        <router-view></router-view>
      </div>
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
@import url('../style/utils.less');
#main {
  position: relative;
  z-index: 20;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: @sidebar-width auto;
  .mr-right {
    padding-left: 0;
    overflow: hidden;
    #routeWrap {
      padding: 1rem;
      height: calc(100% - 1.5rem - 2rem);
      overflow-x: hidden;
      overflow-y: auto;
      .scroll-bar-style();
    }
  }
}
</style>
