<template>
  <div id="main">
    <div class="mr-left"><sideBar></sideBar></div>
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
  width: 100%;
  height: 100%;
  display: flex;
  .mr-left {
    width: @sidebar-width;
    padding: .5rem;
    flex-shrink: 0;
  }
  .mr-right {
    width: 100%;
    flex-shrink: 1;
    padding: .5rem;
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
