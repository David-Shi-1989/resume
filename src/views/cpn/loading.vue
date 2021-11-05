<template>
  <div v-if="showLoading" class="loading-wrap">
    <Spin size="large"></Spin>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['showLoading'])
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.loading-wrap {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.15);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
