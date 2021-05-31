<template>
  <div id="app" :class="wrapClass">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    wrapClass () {
      let theme = this.$store.getters.getTheme
      return ['theme-' + String(theme).toLowerCase()]
    }
  }
}
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
#app_bg_layer {
  position: absolute;
  width: 102%;
  height: 102%;
  top: -1%;
  left: -1%;
  z-index: 10;
}
</style>
