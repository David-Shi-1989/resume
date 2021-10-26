<template>
  <div class="page-table-wrap">
    <div class="btn-wrap">
      <Button type="primary" icon="md-refresh" size="small" @click="initTableData">刷新</Button>
      <Button type="primary" icon="md-add" size="small" :to="{name:'Article_Create'}">新建</Button>
      <Button type="error" icon="md-trash" size="small" @click="onDeleteBtn" :disabled="tableSelection.length<=0">删除</Button>
    </div>
    <Table ref="table" border :columns="columns" :data="data"
      :loading="tableLoading" :height="tableHeight - 50"
      @on-selection-change="onTableSelectionChange"></Table>
    <div class="page-table-paging">
      <Page :total="paging.total" :current="paging.current" :page-size="paging.page" size="small" show-elevator show-sizer show-total
        @on-change="onPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import {getArticle, delteArticle, draftArticle, publishArticle} from 'op/api/op'
export default {
  name: 'Article_List',
  props: {
    type: {
      type: String,
      default: 'publish'
    }
  },
  data () {
    return {
      tableLoading: false,
      tableSelection: [],
      columns: [
        {
          type: 'selection',
          width: 60
        },
        {
          key: 'title',
          title: '标题'
        },
        {
          title: '标签',
          render: (h, params) => {
            const tags = params.row.tags
            const tagElArr = []
            tags.forEach(tag => {
              tagElArr.push(h('Tag', tag.title))
            })
            return h('div', tagElArr)
          }
        },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('Time', {
              props: {
                time: params.row.create_datetime
              }
            })
          }
        },
        {
          title: '操作',
          width: 250,
          render: (h, params) => {
            const editBtn = h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: () => {
                  this.onEditBtn(params.row.id)
                }
              }
            }, '编辑')
            const draftBtn = h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: () => {
                  this.onMoveDraft(params.row.id)
                }
              }
            }, '存为草稿')
            const draft2PublishBtn = h('Button', {
              props: {
                size: 'small'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: () => {
                  this.onDraft2Publush(params.row.id)
                }
              }
            }, '发布')
            const removeBtn = h('Button', {
              props: {
                size: 'small',
                type: 'error'
              },
              on: {
                click: () => {
                  this.deleteItems(params.row.id)
                }
              }
            }, '删除')
            var btnList = []
            if (this.isPublishTab) {
              btnList = [editBtn, draftBtn, removeBtn]
            } else if (this.isDraftTab) {
              btnList = [editBtn, draft2PublishBtn, removeBtn]
            } else if (this.isDashTab) {
              btnList = [draftBtn, removeBtn]
            }
            return h('div', btnList)
          }
        }
      ],
      data: [],
      paging: {
        current: 1,
        page: 20,
        total: -1
      }
    }
  },
  async created () {
    this.initData()
  },
  methods: {
    ...mapMutations(['loading']),
    async initData () {
      this.loading(true)
      getArticle({page: this.paging.current, size: this.paging.page, type: this.type}).then(result => {
        this.data = result.list
        this.paging.total = result.total
        this.loading(false)
      })
    },
    initTableData () {
      this.initData()
    },
    onCreateBtn () {},
    onDeleteBtn () {
      this.deleteItems(this.tableSelection.map(row => row.id))
    },
    onTableSelectionChange (list) {
      this.tableSelection = list
    },
    onPageChange () {},
    onPageSizeChange () {},
    onEditBtn (id) {
      this.$router.push({name: 'Article_Edit', params: {id}})
    },
    onMoveDraft (id) {
      this.loading(true)
      draftArticle(id).then(res => {
        if (res.isSuccess) {
          this.$Message.success('存为草稿成功')
          this.initData()
        } else {
          this.$Message.error('存为草稿失败')
        }
        this.loading(false)
      })
    },
    onDraft2Publush (id) {
      this.loading(true)
      publishArticle(id).then(res => {
        if (res.isSuccess) {
          this.$Message.success('发布成功')
          this.initData()
        } else {
          this.$Message.error('发布失败')
        }
        this.loading(false)
      })
    },
    deleteConfirm (idList) {
      return new Promise((resolve, reject) => {
        this.$Modal.confirm({
          title: '请确认',
          content: `确认删除选中的${idList.length}篇文章吗?`,
          onOk: () => {
            resolve(true)
          },
          onCancel: () => {
            resolve(false)
          }
        })
      })
    },
    async deleteItems (id) {
      if (typeof id === 'string') {
        id = [id]
      }
      if (!(await this.deleteConfirm(id))) {
        return false
      }

      this.loading(true)
      delteArticle(id, this.isDashTab).then(res => {
        if (res.isSuccess) {
          this.$Message.success('删除成功!')
          this.initData()
        } else if (res.affectedRows === 0) {
          this.$Message.console.error('删除失败!');
        } else {
          this.$Message.console.error(`删除部分,成功${res.affectedRows}条,失败条${id.length - res.affectedRows}!`)
          this.initData()
        }
        this.loading(false)
      })
    }
  },
  computed: {
    ...mapGetters(['tableHeight']),
    isPublishTab () {
      return this.type === 'publish'
    },
    isDraftTab () {
      return this.type === 'draft'
    },
    isDashTab () {
      return this.type === 'dash'
    }
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
</style>
