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
  created () {
    this.calActiveIndex()
  },
  methods: {
    onMenuItemClick (item, index) {
      this.activeIndex = index
      this.$router.push({ path: item.url })
    },
    calActiveIndex () {
      const curPath = this.$route.path
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].url === curPath) {
          this.activeIndex = i
          return
        }
      }
    }
  },
  computed: {
    bgLeft () {
      return ((5 + 0.5) * this.activeIndex + 'rem')
    }
  },
  watch: {
    '$route.path' () {
      this.calActiveIndex()
    }
  }
}
</script>

<style lang="less" scoped>
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
    color: var(--color-text-sub);
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
      color: var(--color-text-title);
    }
    &.mr-header-menu-bg {
      position: absolute;
      top: 0;
      z-index: 8;
      border-radius: .25rem;
      transition: left .2s;
      background-color: var(--color-primary);
    }
  }
}
</style>
