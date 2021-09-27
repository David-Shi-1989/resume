<template>
  <div class="page-table-wrap">
    <div class="btn-wrap">
      <Button type="primary" icon="md-refresh" size="small" @click="initTableData">刷新</Button>
      <!-- <Button type="primary" icon="md-add" size="small" @click="onCreateBtn">新建</Button>
      <Button type="error" icon="md-trash" size="small" @click="onDeleteBtn">删除</Button>
      <Form :label-width="40" inline label-position="left">
        <FormItem label="题型">
          <Select v-model="filter.type" size="small" style="width: 120px;">
            <Option v-for="item in filterTypeList" :value="item.id" :key="item.name" :label="item.name">
              <span :style="{color:item.isBolder?'var(--color-success)':'var(--color-content)'}">{{ item.name }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="分类">
          <Select v-model="filter.category" size="small" multiple style="width: 240px;">
            <Option v-for="item in filterCategoryList" :value="item.id" :key="item.name" :label="item.name">
              <span :style="{color:item.isBolder?'var(--color-success)':'var(--color-content)'}">{{ item.name }}</span>
            </Option>
          </Select>
        </FormItem>
      </Form> -->
    </div>
    <Table ref="table" border :columns="columns" :data="data" :loading="tableLoading" :height="tableHeight"></Table>
    <div class="page-table-paging">
      <Page :total="paging.total" :current="paging.current" :page-size="paging.page" size="small" show-elevator show-sizer show-total
        @on-change="onPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>
<script>
import {matchList} from 'op/api/op.js'
import {mapGetters} from 'vuex'
import {GameTypeCN} from '@/constant'
import AvatarList from 'op/components/avatarList.vue'
export default {
  name: 'MatchList',
  data () {
    return {
      tableLoading: false,
      filter: {
        type: 'all',
        category: []
      },
      columns: [
        {
          title: '#',
          width: 60,
          render: (h, params) => {
            const text = this.getIndex(params.index)
            return h('span', text)
          }
        },
        {
          title: '比赛类型',
          width: 180,
          render: (h, params) => {
            const text = GameTypeCN[params.row.type] || '未知'
            return h('span', text)
          }
        },
        {
          title: '时间',
          key: 'endTime',
          width: 180,
          render (h, params) {
            const endDate = new Date(params.row.endTime)
            const text = endDate.format()
            return h('span', text)
          }
        },
        {
          title: '参与人员',
          render: (h, params) => {
            const scoreList = params.row.scoreList.split(',').map(i => parseInt(i))
            const list = [
              {
                name: params.row.user1Name,
                avatar: params.row.user1Avatar,
                department: params.row.user1Dep,
                score: scoreList[0] || 0
              },
              {
                name: params.row.user2Name,
                avatar: params.row.user2Avatar,
                department: params.row.user2Dep,
                score: scoreList[1] || 0
              },
              {
                name: params.row.user3Name,
                avatar: params.row.user3Avatar,
                department: params.row.user3Dep,
                score: scoreList[2] || 0
              },
              {
                name: params.row.user4Name,
                avatar: params.row.user4Avatar,
                department: params.row.user4Dep,
                score: scoreList[3] || 0
              }
            ].filter(i => !!i.name).sort((i1, i2) => i1.score >= i2.score ? -1 : 1)
            return h(AvatarList, {
              props: {
                list
              }
            })
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
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.initTableData()
    },
    initTableData () {
      this.tableLoading = true
      const me = this
      matchList({page: this.paging.page, current: this.paging.current}).then(res => {
        me.paging.total = res.total
        me.data = res.list
        me.tableLoading = false
      })
    },
    onPageChange (page) {
      if (this.paging.current !== page) {
        this.paging.current = page
        this.initTableData()
      }
    },
    onPageSizeChange (pageSize) {
      if (this.paging.page !== pageSize) {
        this.paging.page = pageSize
        this.initTableData()
      }
    },
    getIndex (idx) {
      return (this.paging.current - 1) * this.paging.page + idx + 1
    }
  },
  computed: {
    ...mapGetters(['tableHeight'])
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/color.scss';
.options-table {
  /deep/ .ivu-table-tbody {
    tr.ivu-table-row.high-row td {
      background-color: fade-out($color-success, 0.85);
    }
  }
}
</style>
