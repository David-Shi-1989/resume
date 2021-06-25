<template>
  <div id="main">
    <myHeader></myHeader>
    <router-view />
  </div>
</template>

<script>
import myHeader from './cpn/header'
export default {
  components: {myHeader}
}
</script>

<style lang="less" scoped>
@import url('../style/style.less');
@import url('../style/utils.less');
#main {
  
}
</style>
