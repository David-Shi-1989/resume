<template>
  <div class="page-table-wrap">
      <Table :columns="columns" :data="tableData" border size="small" :height="500"></Table>
      <div class="page-table-paging">
        <Page :total="data.length" :current="paging.current" :page-size="paging.page" size="small" show-elevator show-sizer show-total/>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      paging: {
        current: 1,
        page: 20
      }
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    tableData () {
      return this.data.slice(
        (this.paging.current - 1) * this.paging.page,
        this.paging.page
      )
    }
  }
}
</script>
<style>

</style>
