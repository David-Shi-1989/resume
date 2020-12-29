<template>
  <Tabs>
    <TabPane :label="$t('article')" name="article">
      <articleList></articleList>
    </TabPane>
    <TabPane :label="$t('demo')" name="demo">
      <demoList></demoList>
    </TabPane>
  </Tabs>
</template>

<script>
import articleList from './article-list'
import demoList from './demo-list'
export default {
  components: { articleList, demoList },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
