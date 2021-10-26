<template>
  <div>
    <Tabs v-model="tabName" :animated="false">
      <TabPane label="已发布" name="publish">
        <listCpn ref="publish"></listCpn>
      </TabPane>
      <TabPane label="草稿箱" name="draft">
        <listCpn type="draft" ref="draft"></listCpn>
      </TabPane>
      <TabPane label="已删除" name="dash">
        <listCpn type="dash" ref="dash"></listCpn>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import listCpn from './list'
export default {
  components: {listCpn},
  data () {
    return {
      tabName: 'publish'
    }
  },
  watch: {
    tabName (newTab) {
      if (this.$refs[newTab] && this.$refs[newTab].initTableData) {
        this.$refs[newTab].initTableData()
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
