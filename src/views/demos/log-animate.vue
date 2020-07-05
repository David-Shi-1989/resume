<template>
  <div>
    <div class="sw-demo-wrap dash-card">
      <div class="sw-loading" v-if="isShowLoading"><i class="fa fa-spinner fa-spin"></i></div>
      <ul ref="logUl">
        <li v-for="item in list" :key="item.id" :style="{transform:`translate(0, ${item.top+'px'})`}">
          <span>{{item.index}}</span>
          <span>{{item.text}}</span>
          <span>{{item.datetime}}</span>
        </li>
      </ul>
    </div>
    <div class="sw-btn-wrap">
      <Button type="primary" @click="onInsertLogBtn(insertLogNum)">插入日志</Button>
      <InputNumber :min="1" :max="25" v-model="insertLogNum"></InputNumber>
    </div>
  </div>
</template>

<script>
import { formatDateTime, getRandomNum } from '@/utils'
export default {
  data () {
    return {
      isShowLoading: true,
      maxSize: 5,
      itemHeight: 30,
      insertLogNum: 1,
      list: [],
      taskList: []
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
    getOneFakeData () {
      const username = ''.random(6)
      const ts = (this.list.length > 0 ? (this.list[0].ts + 1000 * getRandomNum(1, 30)) : Date.now())
      const id = ''.random(12)
      const index = (this.list.length > 0 ? (this.list[0].index + 1) : 1)
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
      for (let i = 0; i < count; i++) {
        let curItem = this.getOneFakeData()
        this.addItem(curItem)
      }
      this.$nextTick(() => {
        this.animateAfterInsert()
      })
    },
    addItem (item) {
      if (this.list.length < this.maxSize) {
        item.top = 0
      } else {
        const newTop = (this.list.length + 1 - this.maxSize) * this.itemHeight * -1
        item.top = newTop
        this.list.forEach(item => (item.top = newTop))
      }
      this.list.unshift(item)
    },
    animateAfterInsert () {
      var timeLine = new this.$gsap.timeline()
      const ulRef = this.$refs.logUl
      const newCount = this.list.length - this.maxSize
      const top = (newCount > 0 ? ((this.list.length - this.maxSize) * this.itemHeight) : 0)
      const duration = newCount * 300
      if (top) {
        timeLine.to(ulRef, { duration: duration / 1000, y: top })
      }
      let me = this
      setTimeout(() => {
        me.list.splice(me.maxSize)
        me.resetTop()
      }, duration + 20)
    },
    resetTop () {
      var timeLine = new this.$gsap.timeline()
      const ulRef = this.$refs.logUl
      timeLine.to(ulRef, { duration: 0, y: 0 })
      this.list.forEach(item => {
        item.top = 0
      })
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
