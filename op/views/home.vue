<template>
  <div>
    <a-card hoverable :style="{ width: '100%', marginBottom: '20px' }">
      <ul class="statistic-list">
        <li>
          <a-statistic title="Articles" :start="count.start" :value="count.article" precision="0" :value-from="0" animation>
            <template #title>
              <icon-file :style="iconStyle"/>
            </template>
          </a-statistic>
        </li>
        <li>
          <a-statistic title="Tags" :start="count.start" :value="count.tag" precision="0" :value-from="0" animation>
            <template #title>
              <icon-tags :style="iconStyle"/>
            </template>
          </a-statistic>
        </li>
        <li>
          <a-statistic title="Works" :start="count.start" :value="count.work" precision="0" :value-from="0" animation>
            <template #title>
              <icon-apps :style="iconStyle"/>
            </template>
          </a-statistic>
        </li>
        <li>
          <a-statistic title="Comments" :start="count.start" :value="count.comment" precision="0" :value-from="0" animation>
            <template #title>
              <icon-message :style="iconStyle"/>
            </template>
          </a-statistic>
        </li>
        <li>
          <a-statistic title="Users" :start="count.start" :value="count.user" precision="0" :value-from="0" animation>
            <template #title>
              <icon-user :style="iconStyle"/>
            </template>
          </a-statistic>
        </li>
      </ul>
    </a-card>
    <a-row :gutter="20" style="height:320px;" class="row2">
      <a-col :span="8">
        <a-card hoverable class="chart-card">
          <div class="card-head">
            <span class="dash-card-title">访客统计</span>
            <icon-eye :style="{marginLeft:'5px'}"></icon-eye>
            <!-- <icon-align-left :style="{transform: 'rotate(270deg)',marginLeft:'5px'}"/> -->
          </div>
          <chart :option="chartOption.visitor"></chart>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card hoverable class="chart-card">
          <div class="card-head">
            <span class="dash-card-title">文章统计</span>
            <icon-file :style="{marginLeft:'5px'}"/>
          </div>
          <ArticleStatistic></ArticleStatistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card hoverable class="chart-card">
          <div class="card-head">
            <span class="dash-card-title">留言统计</span>
            <icon-message :style="{marginLeft:'5px'}"/>
          </div>
          <MessageStatistic></MessageStatistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {dashboard} from 'op/api/op'
import { mapMutations } from 'vuex'
import chart from 'op/component/charts'
import ArticleStatistic from './dashboard/article-statistic'
import MessageStatistic from './dashboard/message'

export default {
  components: {chart, ArticleStatistic, MessageStatistic},
  data () {
    return {
      count: {
        start: false,
        article: 0,
        tag: 0,
        work: 0,
        comment: 0,
        user: 0
      },
      chartOption: {
        visitor: {}
      }
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.initVisitorChart()
  },
  methods: {
    ...mapMutations(['loading']),
    initData () {
      this.loading(true)
      dashboard().then(res => {
        this.count.article = res.article_num
        this.count.tag = res.tag_num
        this.count.work = res.work_num
        this.count.comment = res.comment_num
        this.count.user = res.user_num
        this.count.start = true
      }).finally(() => {
        this.loading(false)
      })
    },
    initVisitorChart () {
      const list = [
        {label: '11/23', value: 19},
        {label: '11/24', value: 14},
        {label: '11/25', value: 29},
        {label: '11/26', value: 39},
        {label: '11/27', value: 25},
        {label: '11/28', value: 17},
        {label: '11/29', value: 18}
      ]
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: list.map(i => i.label),
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
      setTimeout(() => {
        this.chartOption.visitor = option
      }, 6000)
    }
  },
  computed: {
    iconStyle () {
      return {
        fontSize: '20px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.statistic-list {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
div.row {
  display: flex;
  @gap: 20px;
  & > div {
    flex: 1 1 100%;
    &:not(:last-child) {
      margin-right: @gap;
    }
  }
}
.row2 {
  & > div {
    height: 100%;
  }
}
.arco-card.chart-card {
  height: 100%;
  :deep(.arco-card-body)  {
    height: 100%;
    @head-height: 30px;
    .card-head {
      height: @head-height;
      line-height: @head-height;
      margin-bottom: 15px;
      border-bottom: 1px solid var(--color-border);
      & + div {
        height: calc(100% - @head-height);
      }
    }
  }
}
</style>
