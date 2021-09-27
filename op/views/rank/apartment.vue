<template>
  <div class="page-table-wrap">
    <div class="btn-wrap">
      <Button type="primary" icon="md-refresh" size="small" @click="initData">刷新</Button>
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
  </div>
</template>
<script>
import {apartmentList} from 'op/api/op.js'
import {mapGetters} from 'vuex'
export default {
  name: 'ApartmentRankList',
  data () {
    return {
      tableLoading: false,
      filter: {
        type: 'all',
        category: []
      },
      columns: [
        {
          type: 'index',
          width: 60
        },
        {
          title: '部门',
          key: 'department'
        },
        {title: '参与员工数量', key: 'userCount'},
        {title: '积分', key: 'totalScore'}
      ],
      data: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.tableLoading = true
      const me = this
      apartmentList().then(res => {
        me.data = res
        me.tableLoading = false
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
