<template>
  <a-breadcrumb :style="{ margin: '16px 0' }">
    <a-breadcrumb-item v-for="(item,idx) in breadcrumbList" :key="'bc_'+idx">{{item}}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BreadCrumb',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['breadcrumbList'])
  }
}
</script>

<style lang="less" scoped>

</style>
