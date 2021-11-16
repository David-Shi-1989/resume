<template>
  <div>
    <a-card hoverable :style="{ width: '100%', marginBottom: '20px' }">
      <ul class="statistic-list">
        <li>
          <a-statistic title="Articles" :value="15" precision="0" :value-from="0" animation />
        </li>
        <li>
          <a-statistic title="Tags" :value="8" precision="0" :value-from="0" animation />
        </li>
        <li>
          <a-statistic title="Works" :value="48" precision="0" :value-from="0" animation />
        </li>
        <li>
          <a-statistic title="Comments" :value="267" precision="0" :value-from="0" animation />
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
export default {
  data () {
    return {}
  },
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
