<template>
  <div class="page-table-wrap">
    <div class="btn-wrap">
      <Button type="primary" icon="md-refresh" size="small" @click="initTableData">刷新</Button>
      <Button type="primary" icon="md-add" size="small" :to="{name:'Article_Create'}">新建</Button>
      <Button type="error" icon="md-trash" size="small" @click="onDeleteBtn">删除</Button>
    </div>
    <Table ref="table" border :columns="columns" :data="data" :loading="tableLoading" :height="tableHeight - 50"></Table>
    <div class="page-table-paging">
      <Page :total="paging.total" :current="paging.current" :page-size="paging.page" size="small" show-elevator show-sizer show-total
        @on-change="onPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import {getArticle, getTag} from 'op/api/op'
export default {
  name: 'Article_List',
  data () {
    return {
      tableLoading: false,
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
          width: 200,
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
            const removeBtn = h('Button', {
              props: {
                size: 'small',
                type: 'error'
              }
            }, '删除')
            return h('div', [editBtn, removeBtn])
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
      getArticle({page: this.paging.current, size: this.paging.page}).then(result => {
        this.data = result.list
        this.loading(false)
      })
    },
    initTableData () {},
    onCreateBtn () {},
    onDeleteBtn () {},
    onPageChange () {},
    onPageSizeChange () {},
    onEditBtn (id) {
      this.$router.push({name: 'Article_Edit', params: {id}})
    }
  },
  computed: {
    ...mapGetters(['tableHeight'])
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
</style>
