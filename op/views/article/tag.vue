<template>
  <div>
    <page-table :pageApi="getTag" :isPagination="false" :columns="columns" size="small" bordered :showDeleteBtn="false"></page-table>
  </div>
</template>

<script>
import {createVNode} from 'vue'
import pageTable from 'op/component/page-table'
import {getTag} from 'op/api/op'
import {Button, Space} from '@arco-design/web-vue'
export default {
  components: {pageTable},
  data () {
    return {
      getTag,
      columns: [
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '文章数量',
          dataIndex: 'refer_count'
        },
        {
          title: '操作',
          width: 200,
          render: ({record}) => {
            const editBtn = createVNode(Button, {
              size: 'mini',
              onClick: () => {
                this.onEditItem(record.id)
              }
            }, {
              default: () => '编辑'
            })
            const deleteBtn = createVNode(Button, {
              size: 'mini',
              status: 'danger'
            }, {
              default: () => '删除'
            })
            return createVNode(Space, {}, {
              default: () => [editBtn, deleteBtn]
            })
          }
        }
      ]
    }
  },
  methods: {
    onEditItem (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
