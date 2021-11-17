<template>
  <a-button title="返回" @click="onClick" shape="circle" class="back-btn">
    <template #icon>
      <icon-left />
    </template>
  </a-button>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['backBtnRouterName'])
  },
  methods: {
    onClick () {
      if (this.backBtnRouterName) {
        this.$router.push({name: this.backBtnRouterName})
      }
    }
  }
}
</script>

<style lang="less" scoped>
@size: 30px;
.back-btn {
  position: fixed;
  top: 50%;
  left: 20px;
}
</style>
