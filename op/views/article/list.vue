<template>
  <a-tabs v-model="activeTab" @change="onTabChange">
    <a-tab-pane title="已发布" key="publish">
      <page-table ref="publishPT" :pageApi="getArticle" :columns="publishColumn" size="small" bordered :showDeleteBtn="false" :searchObj="{type: 'publish'}"
        @create-btn="onCreateBtn"></page-table>
    </a-tab-pane>
    <a-tab-pane title="草稿箱" key="draft">
      <page-table ref="draftPT" :pageApi="getArticle" :columns="draftColumn" size="small" bordered :showDeleteBtn="false" :searchObj="{type: 'draft'}"
        @create-btn="onCreateBtn"></page-table>
    </a-tab-pane>
    <a-tab-pane title="已删除" key="dash">
      <page-table ref="dashPT" :pageApi="getArticle" :columns="dashColumn" size="small" bordered :showDeleteBtn="false" :searchObj="{type: 'dash'}"
        @create-btn="onCreateBtn"></page-table>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import pageTable from 'op/component/page-table'
import { getArticle, draftArticle, publishArticle, delteArticle } from 'op/api/op'
import { createVNode } from 'vue'
import { Space, Tag, Button, Message } from '@arco-design/web-vue'
import { mapMutations } from 'vuex'
import topArticle from 'op/component/svg/article-top.svg'
export default {
  components: {pageTable},
  data () {
    return {
      activeTab: 'publish',
      getArticle,
      tabName: [],
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          render: ({record}) => {
            const {title, is_top} = record
            let elArr = [createVNode('span', {}, title)]
            if (is_top) {
              elArr.push(createVNode('img', {
                src: topArticle,
                style: {
                  width: '22px',
                  marginLeft: '8px'
                }
              }, {}))
            }
            return createVNode('div', {
              class: 'd-flex a-center'
            }, elArr)
          }
        },
        {
          title: '标签',
          render: function ({record}) {
            const tagList = record.tags
            let tagElList = tagList.map(tag => {
              return createVNode(Tag, {}, {
                default: () => tag.title
              })
            })
            return createVNode(Space, {}, {
              default: () => tagElList
            })
          }
        },
        {
          title: '评论数量',
          dataIndex: 'comment_count',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        },
        {
          title: '阅读数量',
          dataIndex: 'visit_count',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        },
        {
          title: '点赞数量',
          dataIndex: 'like_count',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        },
        {
          title: '创建时间',
          dataIndex: 'create_datetime',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        }
      ],
      actionColumn: {
        default: {
          width: 250,
          title: '操作'
        },
        publish: {
          render: ({record}) => {
            const editBtn = createVNode(Button, {
              size: 'mini',
              onClick: () => {
                this.onEditItem(record.id)
              }
            }, {
              default: () => '编辑'
            })
            const draftBtn = createVNode(Button, {
              size: 'mini',
              onClick: () => {
                this.onSaveDraft(record.id)
              }
            }, {
              default: () => '存为草稿'
            })
            const deleteBtn = createVNode(Button, {
              size: 'mini',
              status: 'danger',
              onClick: () => {
                this.onDelete(record.id, false)
              }
            }, {
              default: () => '删除'
            })
            return createVNode(Space, {}, {
              default: () => [editBtn, draftBtn, deleteBtn]
            })
          }
        },
        draft: {
          render: ({record}) => {
            const editBtn = createVNode(Button, {
              size: 'mini',
              type: 'primary',
              onClick: () => {
                this.onEditItem(record.id)
              }
            }, {
              default: () => '编辑'
            })
            const publishBtn = createVNode(Button, {
              size: 'mini',
              onClick: () => {
                this.onPublishItem(record.id)
              }
            }, {
              default: () => '发布'
            })
            
            const deleteBtn = createVNode(Button, {
              size: 'mini',
              status: 'danger',
              onClick: () => {
                this.onDelete(record.id, false)
              }
            }, {
              default: () => '删除'
            })
            return createVNode(Space, {}, {
              default: () => [editBtn, publishBtn, deleteBtn]
            })
          }
        },
        dash: {
          render: ({record}) => {
            const publishBtn = createVNode(Button, {
              size: 'mini',
              onClick: () => {
                this.onSaveDraft(record.id)
              }
            }, {
              default: () => '转为草稿'
            })
            const deleteBtn = createVNode(Button, {
              size: 'mini',
              status: 'danger',
              onClick: () => {
                this.onDelete(record.id, true)
              }
            }, {
              default: () => '彻底删除'
            })
            return createVNode(Space, {}, {
              default: () => [publishBtn, deleteBtn]
            })
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations(['loading']),
    onTabChange (tabName) {
      this.activeTab = tabName
      this.refreshCurrentTabTableData(tabName)
    },
    onEditItem (id) {
      this.$router.push({name: 'Article_Editor', params: {id}})
    },
    onCreateBtn () {
      this.$router.push({name: 'Article_Create'})
    },
    onSaveDraft (id) {
      this.loading(true)
      draftArticle(id).then(isSuccess => {
        if (isSuccess) {
          Message.success('操作成功')
          this.refreshCurrentTabTableData()
        } else {
          Message.error('操作失败')
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    onPublishItem (id) {
      this.loading(true)
      publishArticle(id).then(isSuccess => {
        if (isSuccess) {
          Message.success('操作成功')
          this.refreshCurrentTabTableData()
        } else {
          Message.error('操作失败')
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    confirmDelete () {
      return new Promise((resolve, reject) => {
        this.$modal.confirm({
          title: '请确认',
          content: '确认删除吗?',
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
    async onDelete (id, isPermenent) {
      if (await this.confirmDelete()) {
        this.loading(true)
        delteArticle([id], isPermenent).then(isSuccess => {
          if (isSuccess) {
            Message.success('删除成功')
            this.refreshCurrentTabTableData()
          } else {
            Message.error('删除失败')
          }
        }).finally(() => {
          this.loading(false)
        })
      }
    },
    refreshCurrentTabTableData (tabName = '') {
      const ptRefName = (tabName || this.activeTab) + 'PT'
      let ptRef = this.$refs[ptRefName]
      if (ptRef && ptRef.initData) {
        ptRef.initData()
      }
    }
  },
  computed: {
    publishColumn () {
      return this.columns.concat(Object.assign({}, this.actionColumn.default, this.actionColumn.publish))
    },
    draftColumn () {
      return this.columns.concat(Object.assign({}, this.actionColumn.default, this.actionColumn.draft))
    },
    dashColumn () {
      return this.columns.concat(Object.assign({}, this.actionColumn.default, this.actionColumn.dash))
    }
  }
}
</script>

<style lang="less" scoped>

</style>
