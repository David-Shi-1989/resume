<template>
  <a-table :columns="columns" :data="data" size="small" :pagination="false" :loading="loading"></a-table>
</template>

<script>
import { createVNode } from '@vue/runtime-core'
import gold from '@/assets/svg/gold.svg'
import silver from '@/assets/svg/silver.svg'
import bronze from '@/assets/svg/bronze.svg'
import {dashArticleStatistic} from 'op/api/op'
export default {
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      columns: [
        {
          title: '#',
          type: 'index',
          width: 50,
          align: 'center',
          render: ({record}) => {
            const index = record.index
            if (index > 3) {
              return createVNode('span', {}, {
                default: () => index
              })
            } else {
              let img = null
              if (index === 1) img = gold
              else if (index === 2) img = silver
              else img = bronze
              return createVNode('img', {
                src: img
              }, {})
            }
          }
        },
        {
          title: 'Title',
          dataIndex: 'title'
        },
        {
          title: 'Value',
          dataIndex: 'value',
          width: 100
        }
      ],
      data: []
    }
  },
  methods: {
    initData () {
      this.loading = true
      dashArticleStatistic(this.activeTab).then(list => {
        this.data = list
      }).finally(() => {
        this.loading = false
      })
    }
  },
  watch: {
    activeTab: {
      immediate: true,
      handler () {
        this.initData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
