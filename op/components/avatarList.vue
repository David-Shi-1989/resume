<template>
  <ul class="avatar-list">
    <li v-for="item in list" :key="item.name">
      <Tooltip :content="getTooltip(item)">
        <Avatar :src="item.avatar"/>
      </Tooltip>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    getTooltip ({name, department, score}) {
      return `${name}(${department})\n${score}分`
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-list {
  display: flex;
  & > li:not(:last-child) {
    margin-right: 5px;
  }
  .ivu-avatar-image {
    border: 1px solid #BBB;
  }
}
</style>
