<template>
  <div>
    <h2>教育经历</h2>
    <ul>
      <li>
        <h3>中国科学技术大学</h3>
        <p>软件工程</p>
        <img :src="ustcLogo" class="logo">
      </li>
    </ul>
  </div>
</template>

<script>
import ustcLogo from '@/assets/ustc-logo.png'
export default {
  components: {},
  data () {
    return {
      ustcLogo
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./home.less');
.logo {
  width: 120px;
}
</style>
