<template>
  <div class="chart-loading" v-if="isLoading">
    <a-spin tip="Chart is loading..." />
  </div>
  <div v-else class="chart-wrap" :id="id"></div>
</template>

<script>
import * as echarts from 'echarts'
import {isEmptyObj} from '@/script'
export default {
  props: {
    option: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      id: 'chart_' + ('').random(12)
    }
  },
  methods: {
    initChart () {
      let chart = echarts.init(document.getElementById(this.id))
      if (chart) {
        chart.setOption(this.option)
      }
    }
  },
  computed: {
    isLoading () {
      return isEmptyObj(this.option)
    }
  },
  watch: {
    option: {
      immediate: true,
      handler (newOption) {
        if (!isEmptyObj(newOption)) {
          this.$nextTick(() => {
            this.initChart()
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.chart-wrap, .chart-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
