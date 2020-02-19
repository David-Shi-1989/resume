<template>
  <ul class="mr-header-menu">
    <li v-for="(item,idx) in list" :key="'menu'+idx"
      :class="{active:idx===activeIndex, 'mr-menu-item': true}"
      @click="onMenuItemClick(item,idx)">
      <span>{{item.title}}</span>
    </li>
    <li class="mr-header-menu-bg" :style="{left: bgLeft}"></li>
  </ul>
</template>

<script>
import { translate } from '@/utils'
export default {
  data () {
    return {
      activeIndex: 0,
      list: [
        { title: translate('homePage'), url: '/home' },
        { title: translate('careerPage'), url: '/career' },
        { title: translate('projectPage'), url: '/project' },
        { title: translate('demoPage'), url: '/demo' }
      ]
    }
  },
  methods: {
    onMenuItemClick (item, index) {
      this.activeIndex = index
      this.$router.push({ path: item.url })
    }
  },
  computed: {
    bgLeft () {
      return ((5 + 0.5) * this.activeIndex + 'rem')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/color.less');
@import url('../../../style/utils.less');
@menu-width: 5rem;
@menu-height: 1.5rem;
@menu-item-gap: .5rem;
.mr-header-menu {
  list-style: none;
  display: flex;
  position: relative;
  & > li {
    text-align: center;
    font-size: .75rem;
    width: @menu-width;
    height: @menu-height;
    line-height: @menu-height;
    padding: 0 @menu-item-gap;
    .text-cannot-select();
    &:not(:last-child) {
      margin-right: @menu-item-gap;
      position: relative;
      z-index: 10;
      cursor: pointer;
    }
    &.active {
      color: #fff;
    }
    &.mr-menu-item:not(.active):hover {
      border-radius: .25rem;
      background-color: #eee;
    }
    &.mr-header-menu-bg {
      position: absolute;
      top: 0;
      z-index: 8;
      border-radius: .25rem;
      transition: left .2s;
      background-color: @color-primary;
    }
  }
}
</style>
