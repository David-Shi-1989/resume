<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="(item,idx) in breadcrumbList" :key="idx">{{item}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['breadcrumbList'])
  }
}
</script>
<style lang="less" scoped>
@import url('../style/utils.less');
div.ivu-breadcrumb {
  height: @breadcrumb-height;
  line-height: @breadcrumb-height;
}
</style>
