<template>
  <div class="switch-card-wrap">
    <carousel v-model="activeIdx" :per-page="1" :paginationEnabled="false" @page-change="onPageChange">
      <slide v-for="idx in count" :key="'card_' + idx" :data-id="idx" class="card-item">
        <slot :name="'card'+idx"></slot>
      </slide>
    </carousel>
    <ul class="dot-list">
      <li v-for="idx in count" :key="'dot_'+idx" :class="{active: activeIdx + 1==idx}" @click="activeIdx=idx-1"></li>
    </ul>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel'
export default {
  components: {Carousel, Slide},
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      activeIdx: 0
    }
  },
  methods: {
    onPageChange (page) {
      this.activeIdx = page
    }
  }
}
</script>

<style lang="less" scoped>
@bg-color: rgb(235, 240, 242);
@active-color: rgb(48, 76, 253);
.switch-card-wrap {
  width: 100%;
  overflow: hidden;
  /deep/ .VueCarousel {
    .card-item {
      padding: 0 10px;
      & > div {
        padding: 20px;
        border-radius: 5px;
        background-color: @bg-color;
      }
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
      transform-origin: 50% 50%;
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