<template>
  <div id="loading">
    <Spin size="large"></Spin>
    <span>加载中</span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped>
#loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
