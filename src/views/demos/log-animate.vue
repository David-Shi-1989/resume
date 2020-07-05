<template>
  <div>
    <p>基于Vue+Gsap.js的日志轮播组件</p>
    <logCpn ref="logRef" :isShowLoading="isShowLoading"></logCpn>
    <div class="sw-btn-wrap">
      <Button type="primary" @click="onInsertLogBtn(insertLogNum)">插入日志</Button>
      <InputNumber :min="1" :max="25" v-model="insertLogNum"></InputNumber>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/utils'
import logCpn from '@/components/demo-cpn/log-animate.vue'
export default {
  components: { logCpn },
  data () {
    return {
      isShowLoading: false,
      insertLogNum: 1,
      index: 1
    }
  },
  created () {
    this.initData()
  },
  mounted () {
  },
  methods: {
    initData () {
      this.isShowLoading = true
      setTimeout(() => {
        this.onInsertLogBtn(5)
        this.isShowLoading = false
      }, 1800)
    },
    getOneFakeData (arr) {
      const ts = Date.now()
      const id = ''.random(12)
      const username = ''.random(6)
      const index = (this.index++)
      return {
        index,
        id,
        text: username + '登录',
        ts,
        datetime: formatDateTime(ts)
      }
    },
    onInsertLogBtn (num) {
      const count = num || this.insertLogNum
      let tArr = []
      for (let i = 0; i < count; i++) {
        let curItem = this.getOneFakeData(tArr)
        tArr.unshift(curItem)
      }
      this.$refs.logRef.addNewItems(tArr)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/color.less');
@item-height: 30px;
@item-col1: 80px;
@item-col2: 120px;
@item-col3: 150px;
@item-width: @item-col1+@item-col2+@item-col3;
.sw-demo-wrap {
  margin: 150px auto;
  width: @item-width;
  display: flex;
  position: relative;
  padding: 0;
  overflow: hidden;
  .sw-loading {
    width: @item-width;
    height: @item-height * 5;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    i {
      @icon-size: 30px;
      color: #f4f4f4;
      font-size: 20px;
      width: @icon-size;
      height: @icon-size;
      line-height: @icon-size;
      text-align: center;
      margin-top: (@item-height * 5 - @icon-size)/2;
      margin-left: (@item-width - @icon-size)/2;
    }
  }
  ul {
    padding: 0;
    list-style: none;
    height: @item-height * 5;
    width: @item-width;
    & > li {
      display: flex;
      height: @item-height;
      line-height: @item-height;
      padding: 0 15px;
      cursor: pointer;
      & > span {
        display: block;
        &:first-child {
          color: @color-warning;
          width: @item-col1;
        }
        &:nth-child(2) {
          color: @color-content;
          width: @item-col2;
        }
        &:nth-child(3) {
          color: @color-sub-color;
          width: @item-col3;
        }
      }
      &:hover {
        background-color: @color-primary;
        & > span {
          color: #f2f2f2;
        }
      }
    }
  }
}
.sw-btn-wrap {
  margin-left: 20px;
  button {
    margin-right: 20px;
  }
}
</style>
