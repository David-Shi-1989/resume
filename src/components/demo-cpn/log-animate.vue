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
  </div>
</template>

<script>
export default {
  props: {
    isShowLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      maxSize: 5,
      itemHeight: 30,
      isProcessing: false,
      list: [],
      taskList: []
    }
  },
  methods: {
    addNewItems (arr) {
      this.taskList.push(arr)
    },
    addItemToList (item) {
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
      const duration = newCount * 600
      if (top) {
        timeLine.to(ulRef, { duration: duration / 1000, y: top })
      }
      let me = this
      setTimeout(() => {
        me.list.splice(me.maxSize)
        me.resetTop()
        me.isProcessing = false
        if (this.taskList.length > 0) {
          me.onNewTaskCome()
        }
      }, duration + 20)
    },
    resetTop () {
      var timeLine = new this.$gsap.timeline()
      const ulRef = this.$refs.logUl
      timeLine.to(ulRef, { duration: 0, y: 0 })
      this.list.forEach(item => {
        item.top = 0
      })
    },
    onNewTaskCome () {
      if (this.isProcessing) return
      if (this.taskList.length > 0) {
        this.isProcessing = true
        let firstTask = this.taskList.shift()
        for (let i = firstTask.length - 1; i >= 0; i--) {
          this.addItemToList(firstTask[i])
        }
        this.$nextTick(() => {
          this.animateAfterInsert()
        })
      }
    }
  },
  watch: {
    taskList () {
      this.onNewTaskCome()
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
