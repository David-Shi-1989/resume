<template>
  <chart :option="options"></chart>
</template>

<script>
import chart from 'op/component/charts'
import {dashVisitorStatistic} from 'op/api/op'
export default {
  props: {
    days: {
      type: Number,
      default: 7
    }
  },
  components: {chart},
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      dashVisitorStatistic(this.days).then(list => {
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              type: 'category',
              data: list.map(i => i.date),
              axisLine: {
                lineStyle: {
                  color: "#999"
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitNumber: 4,
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#DDD'
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#333"
                },
              },
              nameTextStyle: {
                color: "#999"
              },
              splitArea: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              data: list.map(i => i.value),
              lineStyle: {
                normal: {
                    width: 5,
                    color: {
                      type: 'linear',
                      colorStops: [
                        {
                          offset: 0,
                          color: '#A9F387' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#48D8BF' // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(72,216,191, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#fff',
                  borderWidth: 10,
                  /*shadowColor: 'rgba(72,216,191, 0.3)',
                  shadowBlur: 100,*/
                  borderColor: "#A9F387"
                }
              },
              smooth: true
            }
          ]
        }
        console.log(option)
        this.options = option
      })
    }
  },
  watch: {
    days () {
      this.initData()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
