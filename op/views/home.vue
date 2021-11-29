<template>
  <div>
    <a-card hoverable :style="{ width: '100%', marginBottom: '20px' }">
      <ul class="statistic-list">
        <li>
          <a-statistic title="Articles" :start="count.start" :value="count.article" precision="0" :value-from="0" animation />
        </li>
        <li>
          <a-statistic title="Tags" :start="count.start" :value="count.tag" precision="0" :value-from="0" animation />
        </li>
        <li>
          <a-statistic title="Works" :start="count.start" :value="count.work" precision="0" :value-from="0" animation />
        </li>
        <li>
          <a-statistic title="Comments" :start="count.start" :value="count.comment" precision="0" :value-from="0" animation />
        </li>
      </ul>
    </a-card>
    <div class="row row-2">
      <a-card hoverable>
        <div>
          <span class="dash-card-title">访客统计</span>
          <icon-align-left :style="{transform: 'rotate(270deg)',marginLeft:'5px'}"/>
        </div>
      </a-card>
      <a-card hoverable>
        <div>
          <span class="dash-card-title">文章统计</span>
          <icon-book :style="{marginLeft:'5px'}"/>
        </div>
      </a-card>
      <a-card hoverable>
        <div>
          <span class="dash-card-title">作品统计</span>
          <icon-apps :style="{marginLeft:'5px'}"/>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import {dashboard} from 'op/api/op'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      count: {
        start: false,
        article: 0,
        tag: 0,
        work: 0,
        comment: 0
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
        this.count.start = true
      }).finally(() => {
        this.loading(false)
      })
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
  & > div {
    flex: 1 1 100%;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
