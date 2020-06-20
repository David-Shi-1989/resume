<template>
  <div class="echarts-wrap" :id="id">
    <h2>{{type}}</h2>
  </div>
</template>

<script>
export default {
  name: 'EchartsTpl',
  data () {
    return {
      id: 'echarts_123hkjsdaf'
    }
  },
  created () {
    console.log('mixin\'s created')
  },
  methods: {
    getOptions () {
      return 'base options'
    }
  }
}
</script>
<style scoped lang="less">
.echarts-wrap {
  height: 100%;
}
</style>
