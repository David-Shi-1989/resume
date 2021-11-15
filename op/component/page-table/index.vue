<template>
  <div class="page-table-wrap">
    <div class="pt-header">
      <!-- button wrap -->
      <a-space>
        <a-button type="primary" size="mini" @click="onRefreshBtn">
          <template #icon>
            <icon-refresh />
          </template>
          <template #default>刷新</template>
        </a-button>
        <a-button size="mini" @click="onCreateBtn" v-if="showCreateBtn">
          <template #icon>
            <icon-plus />
          </template>
          <template #default>新建</template>
        </a-button>
        <a-button type="primary" status="danger" size="mini" v-if="showDeleteBtn">
          <template #icon>
            <icon-delete />
          </template>
          <template #default>删除</template>
        </a-button>
      </a-space>
      <!-- search wrap -->
      <a-space>
        <a-input-search :style="{width:'250px'}" placeholder="Please enter something" size="small"/>
      </a-space>
    </div>
    <a-divider />
    <a-table :row-key="primaryKey" :row-selection="rowSelection"
      :columns="columns" :data="data" :pagination="tablePagination"
      @page-size-change="onPageSizeChange" @page-change="pageCurrentChange"></a-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    pageApi: {
      type: Function,
      required: true
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    columns: {
      type: Array,
      required: true
    },
    showRowSelection: {
      type: Boolean,
      default: true
    },
    showCreateBtn: {
      type: Boolean,
      default: true
    },
    showDeleteBtn: {
      type: Boolean,
      default: true
    },
    searchObj: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      rowSelection: {type: 'checkbox'},
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showTotal: true,
        showPageSize: true
      },
      paginationNoPage: {
        total: 0,
        simple: true,
        showTotal: true,
        showPageSize: false,
        showJumper: false
      }
    }
  },
  created () {
    this.initData()
  },
  computed: {
    tablePagination () {
      return this.isPagination ? this.pagination : this.paginationNoPage
    },
    tableRowSelection () {
      return this.showRowSelection ? this.rowSelection : {}
    }
  },
  methods: {
    ...mapMutations(['loading']),
    getPageParam () {
      const obj = Object.assign({}, this.searchObj, {
        page: this.pagination.current,
        size: this.pagination.pageSize
      })
      return obj
    },
    initData () {
      this.loading(true)
      this.pageApi(this.getPageParam()).then(res => {
        if (this.isPagination) {
          this.pagination.total = res.total
          this.data = res.list
        } else {
          this.paginationNoPage.total = res.length
          this.data = res
        }
        if (this.showRowSelection) {
          this.data.forEach(row => {
            row.key = row[this.primaryKey]
          })
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    onPageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.initData()
    },
    pageCurrentChange (current) {
      this.pagination.current = current
      this.initData()
    },
    // event
    onRefreshBtn () {
      this.initData()
    },
    onCreateBtn () {
      this.$emit('create-btn')
    }
  }
}
</script>

<style lang="less" scoped>
.page-table-wrap {
  .pt-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
