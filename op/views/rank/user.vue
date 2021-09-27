<template>
  <div class="page-table-wrap user-rank">
    <div class="btn-wrap">
      <Button type="primary" icon="md-refresh" size="small" @click="initTableData">刷新</Button>
      <Button type="primary" icon="md-cloud-download" size="small" @click="onExport">导出表格</Button>
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
      <Page :total="paging.total" :current="paging.current" :page-size="paging.page" size="small"
        :page-size-opts="[20,50,100,500]"
        show-elevator show-sizer show-total
        @on-change="onPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>
<script>
import {userList} from 'op/api/op.js'
import {mapGetters} from 'vuex'
export default {
  name: 'UserRankList',
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
          key: 'index',
          width: 90
        },
        {
          title: '人员',
          key: 'name',
          width: 200
        },
        {
          title: '头像',
          render: (h, params) => {
            const {avatar} = params.row
            const avatarImg = h('Avatar', {
              props: {
                src: avatar
              }
            })
            return avatarImg
          }
        },
        {
          title: '部门',
          key: 'department',
          width: 250
        },
        {title: '每日答题', key: 'Single_Daily', width: 120},
        {title: '专项答题', key: 'Single_Category', width: 120},
        {title: '双人对战', key: 'match2Count', width: 120},
        {title: '四人赛', key: 'match4Count', width: 120},
        {title: '积分', key: 'score', width: 100}
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
      this.tableLoading = true
      const me = this
      userList({page: this.paging.page, current: this.paging.current}).then(res => {
        me.paging.total = res.total
        me.data = res.list
        me.tableLoading = false
        document.querySelector('.user-rank .ivu-table-body.ivu-table-overflowY').scrollTop = 0
      })
    },
    initTableData () {
      this.initData()
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
    onExport () {
      this.$refs.table.exportCsv({
        filename: '个人排名-' + (new Date()).format('yyyy-MM-dd hh:mm:ss')
      })
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
