<template>
  <div class="logo-wrap">
    <a-space size="large">
      <flip :bgImg="vuejs" :direction="direction"></flip>
      <flip :bgImg="angularjs" :direction="direction"></flip>
      <flip :bgImg="reactjs" :direction="direction"></flip>
      <flip :bgImg="nodejs" :direction="direction"></flip>
    </a-space>
  </div>
  <div>
    <a-radio-group v-model="direction">
      <a-radio value="v">Vertical</a-radio>
      <a-radio value="h">Horizontal</a-radio>
    </a-radio-group>
  </div>
</template>

<script>
import flip from './base-logo'
import vuejs from '@/assets/demo/vue-js-logo.png'
import angularjs from '@/assets/demo/angular-js-logo.png'
import reactjs from '@/assets/demo/react-js-logo.png'
import nodejs from '@/assets/demo/node-js-logo.png'

export default {
  components: {flip},
  data () {
    return {
      direction: 'h',
      isFlip: false,
      vuejs,
      angularjs,
      reactjs,
      nodejs
    }
  }
}
</script>

<style lang="less" scoped>
.logo-wrap {
  background-color: #212121;
  padding: 20px;
  margin-bottom: 50px;
}
</style>
