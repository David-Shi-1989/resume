<template>
  <div id="main">
    <myHeader></myHeader>
    <div id="main_container">
      <router-view />
    </div>
    <backIcon v-if="backBtnRouterName"></backIcon>
  </div>
</template>

<script>
import myHeader from './cpn/header'
import backIcon from '@/views/cpn/back-icon'
import {mapGetters} from 'vuex'
export default {
  components: {myHeader, backIcon},
  computed: {
    ...mapGetters(['backBtnRouterName'])
  }
}
</script>

<style lang="less" scoped>
@import url('../style/style.less');
@import url('../style/utils.less');
</style>
