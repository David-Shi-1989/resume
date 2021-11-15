<template>
  <div class="loading-wrap">
    <a-spin :size="64" tip="loading"/>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
.loading-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.15);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
