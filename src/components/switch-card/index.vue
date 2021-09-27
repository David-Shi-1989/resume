<template>
  <div class="switch-card-wrap" :id="id">
    <ul class="card-list" :style="cardListStyle">
      <li v-for="idx in count" :key="'card_' + idx" :data-id="idx">
        <slot :name="'card'+idx"></slot>
      </li>
    </ul>
    <ul class="dot-list">
      <li v-for="idx in count" :key="'dot_'+idx" :class="{active: activeIdx==idx}" @click="activeIdx=idx"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      id: 'card_switch_wrap_' + ('').random(12),
      activeIdx: 1,
      drag: {
        beginX: 0,
        currentX: 0,
        isDoing: false
      }
    }
  },
  methods: {
    onCardClick (evt) {
      Object.assign(this.drag, {
        isDoing: true,
        beginX: evt.offsetX,
        currentX: evt.offsetX
      })
    },
    onCardDrag (evt) {
      if (this.drag.isDoing) {
        this.drag.currentX = evt.offsetX
        console.log(this.drag.currentX - this.drag.beginX)
      }
    },
    onCardMouseUp () {
      if (this.drag.isDoing) {
        const dis = this.drag.currentX - this.drag.beginX
        if (Math.abs(dis) > (this.getCardWidth() / 3)) {
          const newIdx = this.activeIdx + (dis < 0 ? 1 : -1)
          if (newIdx >= 1 && newIdx <= this.count) {
            this.activeIdx = newIdx
          }
        }
      }
      this.onCardDragEnd()
    },
    onCardMouseLeave () {
      this.onCardDragEnd()
    },
    onCardDragEnd () {
      this.drag.isDoing = false
    },
    getCardWidth () {
      return document.querySelector(`#${this.id} .card-list > li`).clientWidth
    }
  },
  computed: {
    cardListStyle () {
      let xTransform = this.activeIdx - 1
      if (xTransform > 0) {
        xTransform = `-${xTransform}00%`
      }
      return {
        transform: `translate3d(${xTransform}, 0px, 0px)`
      }
    }
  },
  mounted () {
    const dragObj = this.drag, listEl = document.querySelector(`#${this.id} .card-list`)
    listEl.onmousedown = function (evt) {
      Object.assign(dragObj, {
        isDoing: true,
        beginX: evt.offsetX,
        currentX: evt.offsetX
      })
      window.onmousemove = function (moveEvt) {
        if (dragObj.isDoing) {
          dragObj.currentX = moveEvt.offsetX
          listEl.style.marginLeft = (dragObj.currentX - dragObj.beginX) + 'px'
        }
      }
    }
  }
}
</script>

<style lang="less">
@bg-color: rgb(235, 240, 242);
@active-color: rgb(48, 76, 253);
.switch-card-wrap {
  width: 100%;
  overflow: hidden;
  .card-list {
    display: flex;
    flex-wrap: nowrap;
    transition: transform .2s;
    & > li {
      flex: 0 0 95%;
      margin: 0 2.5%;
      cursor: pointer;
      padding: 20px 30px;
      border-radius: 8px;
      background-color: @bg-color;
    }
  }
  .dot-list {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 20px;
    margin-top: 15px;
    & > li {
      width: 14px;
      height: 14px;
      background-color: @bg-color;
      border-radius: 1rem;
      cursor: pointer;
      transition: width 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s;
      &:not(:last-child) {
        margin-right: 8px;
      }
      &:hover {
        border: 1px solid var(--color-border);
      }
      &.active {
        width: 24px;
        background-color: @active-color;
      }
    }
  }
}
</style>