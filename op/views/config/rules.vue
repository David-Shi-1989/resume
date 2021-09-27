<template>
  <div class="editor-wrap">
    <Input v-model="model" type="textarea" placeholder="请输入答题规则说明" :maxlength="10000" :rows="15" :autosize="false"/>
    <div class="btn-wrap">
      <Button type="primary" @click="onSaveClick" size="large">保存</Button>
    </div>
  </div>
</template>

<script>
import {getRule, setRule} from 'op/api/op.js'
export default {
  data () {
    return {
      model: ''
    }
  },
  created () {
    const me = this
    getRule().then(text => {
      me.model = text
    })
  },
  methods: {
    onSaveClick () {
      setRule(this.model).then(isSuccess => {
        if (isSuccess) {
          this.$Message.success('修改成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'op/style/utils.scss';
.editor-wrap {
  .btn-wrap {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
