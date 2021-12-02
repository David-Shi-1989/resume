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
            <div>
              <span class="dash-card-title">访客统计</span>
              <icon-eye :style="{marginLeft:'5px'}"></icon-eye>
            </div>
            <a-radio-group type="button" size="mini" v-model="visit.activeTab">
              <a-radio :value="7">近7天</a-radio>
              <a-radio :value="30">近30天</a-radio>
              <a-radio :value="12">近12月</a-radio>
            </a-radio-group>
          </div>
          <visitorChart :days="visit.activeTab"></visitorChart>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card hoverable class="chart-card">
          <div class="card-head">
            <div>
              <span class="dash-card-title">文章统计</span>
              <icon-file :style="{marginLeft:'5px'}"/>
            </div>
            <a-radio-group type="button" size="mini" v-model="article.activeTab">
              <a-radio value="visit_count">阅读量</a-radio>
              <a-radio value="like_count">点赞</a-radio>
              <a-radio value="comment_count">评论</a-radio>
            </a-radio-group>
          </div>
          <ArticleStatistic :activeTab="article.activeTab"></ArticleStatistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card hoverable class="chart-card">
          <div class="card-head">
            <div>
              <span class="dash-card-title">留言统计</span>
              <icon-message :style="{marginLeft:'5px'}"/>
            </div>
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
import ArticleStatistic from './dashboard/article-statistic'
import MessageStatistic from './dashboard/message'
import visitorChart from './dashboard/visitor'

export default {
  components: {ArticleStatistic, MessageStatistic, visitorChart},
  data () {
    return {
      count: {
        start: false,
        article: 0,
        tag: 0,
        work: 0,
        comment: 0,
        user: 0,
      },
      visit: {
        activeTab: 7
      },
      article: {
        activeTab: 'visit_count'
      }
    }
  },
  created () {
    this.initData()
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
      display: flex;
      justify-content: space-between;
      & + div {
        height: calc(100% - @head-height);
      }
    }
  }
}
</style>
