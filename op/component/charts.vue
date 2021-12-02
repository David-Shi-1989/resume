<template>
  <div class="chart-loading" v-if="isLoading">
    <a-spin tip="Chart is loading..." />
  </div>
  <div v-show="!isLoading" class="chart-wrap" ref="chartContainer"></div>
</template>

<script>
import * as echarts from 'echarts'
import {isEmptyObj} from '@/script'
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj)

export default {
  props: {
    option: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.chartContainer)
      if (this.chart) {
        unwarp(this.chart).setOption(this.option, true)
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
