<template>
  <a-modal v-model="visible">
    <template #title>
      {{title}}
    </template>
    <div>{{message}}</div>
    <a-space align="center">
      <a-button type="text">取消</a-button>
      <a-button type="primary">确定</a-button>
    </a-space>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: '',
    message: {
      type: String,
      required: true
    },
    ok: {
      type: Function
    },
    cancel: {
      type: Function
    },
    close: {
      type: Function
    }
  },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>

</style>
