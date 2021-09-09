<template>
  <div class="back-btn" title="返回" @click="onClick">
    <i class="fa fa-chevron-left"></i>
  </div>
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
  height: @size;
  width: @size;
  background-color: rgba(0,0,0,.15);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .2s;
  i {
    font-size: 16px;
    color: rgba(0,0,0,.2);
  }
  &:hover {
    background-color: rgba(0,0,0,.3);
    i {
      color: rgba(0,0,0,.6);
    }
  }
}
</style>
