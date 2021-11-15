<template>
  <div id="main">
    <my-header></my-header>
    <div id="main_container" :class="containerClass">
      <router-view />
    </div>
    <backIcon v-if="backBtnRouterName"></backIcon>
    <loading></loading>
  </div>
</template>

<script>
import myHeader from '../components/header.vue'
import { mapGetters } from 'vuex'
import backIcon from '@/components/back-icon'
import loading from '@/components/loading'

export default {
  name: 'Index',
  components: { myHeader, backIcon, loading },
  computed: {
    ...mapGetters(['backBtnRouterName']),
    containerClass () {
      return {
        'no-padding': this.$route.meta.noPadding === true
      }
    }
  }
}
</script>
