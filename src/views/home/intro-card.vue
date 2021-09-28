<template>
  <div class="intro-card">
    <img :src="avatar">
  </div>
</template>

<script>
import avatar from '@/assets/main-photo.svg'
export default {
  data () {
    return {
      avatar
    }
  }
}
</script>

<style lang="less" scoped>
.intro-card {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgb(103 118 128 / 3%);
  padding: 1.875rem;
  position: relative;
  transition: box-shadow .3s ease-in-out;
}
</style>