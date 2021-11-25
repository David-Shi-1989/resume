<template>
  <div>
    <page-table ref="table" :pageApi="getWorks" :isPagination="false" :columns="column"
      size="small" @create-btn="onCreateBtn"></page-table>
  </div>
</template>

<script>
import { createVNode } from 'vue'
import pageTable from 'op/component/page-table'
import {getWorks, deleteWork} from 'op/api/op'
import {Space, Button, Message} from '@arco-design/web-vue'
import {IconImage, IconPenFill, IconDelete} from '@arco-design/web-vue/es/icon'
import {KEY_WORK} from 'op/constant'
import { mapMutations } from 'vuex'
export default {
  components: {pageTable},
  data () {
    return {
      getWorks,
      column: [
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '类型',
          width: 150,
          render: ({record}) => {
            const {type} = record
            let text = type === 0 ? 'URL' : 'RouterName'
            return createVNode('span', {}, {
              default: () => text
            })
          }
        },
        {
          title: '链接',
          dataIndex: 'link'
        },
        {
          title: '类别',
          width: 200,
          dataIndex: 'category'
        },
        {
          title: '图片',
          width: 200,
          render: ({record}) => {
            const {img} = record
            const hasImg = !!img
            let icon = hasImg ? createVNode(IconImage, {}, {}) : null
            return icon
          }
        },
        {
          title: '创建时间',
          dataIndex: 'create_date'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '操作',
          render: ({record}) => {
            const editBtn = createVNode(Button, {
              size: 'mini',
              type: 'text',
              title: '编辑',
              onClick: () => {
                this.onEditItem(record)
              }
            }, {
              icon: () => createVNode(IconPenFill, {
                style: {color: '#AAA'},
              })
            })
            const deleteBtn = createVNode(Button, {
              size: 'mini',
              type: 'text',
              title: '删除',
              onClick: () => {
                this.onDelete(record)
              }
            }, {
              icon: () => createVNode(IconDelete, {
                style: {color: 'rgb(var(--danger-6))'},
              })
            })
            return createVNode(Space, {}, {
              default: () => [editBtn, deleteBtn]
            })
          }
        }
      ],
    }
  },
  created () {
  },
  methods: {
    ...mapMutations(['loading']),
    onCreateBtn () {
      this.$router.push({name: 'Work_Create'})
    },
    onEditItem (record) {
      localStorage.setItem(KEY_WORK, JSON.stringify(record))
      this.$router.push({name: 'Work_Edit', params: {id: record.id}})
    },
    confirmDelete (name) {
      return new Promise((resolve, reject) => {
        this.$modal.confirm({
          title: '请确认',
          content: `确认删除【${name}】吗?`,
          modalClass: 'confirm-modal',
          onOk: () => {
            resolve(true)
          },
          onCancel: () => {
            resolve(false)
          }
        })
      })
    },
    async onDelete (record) {
      if (await this.confirmDelete(record.title)) {
        this.loading(true)
        deleteWork(record.id).then(res => {
          if (res.isSuccess) {
            Message.success('删除成功')
            this.$refs.table.initData()
          } else {
            Message.error('删除失败')
          }
        }).finally(() => {
          this.loading(false)
        })
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>

</style>
