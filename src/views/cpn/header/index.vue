<template>
  <div class="mr-header">
    <div class="logo-menu">
      <div class="logo"></div>
      <ul class="menu">
        <li v-for="menu in menus" :key="menu" :class="[menu==activeMenu?'active':'', 'menu-item']" @click="onMenuClick(menu)">
          <a href="javascript:void(0);">{{menu}}</a>
        </li>
        <li class="move-bg" :style="{left:moveBgLeft + 'px'}"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import LatestWorks from '../latest-works'
export default {
  data () {
    const menus = ['home', 'Case Study', 'Blog Post', 'Contact Me']
    return {
      menus,
      activeMenu: menus[0],
      moveBgLeft: 0
    }
  },
  props: {
  },
  components: {LatestWorks},
  methods: {
    onMenuClick (item) {
      this.activeMenu = item
      this.moveHeaderBg()
    },
    moveHeaderBg () {
      let idx = 0, left = 0
      const currentMenu = this.activeMenu
      this.menus.some((menu, index) => {
        if (menu == currentMenu) {
          idx = index
          return true
        }
        return false
      })
      let menuItems = document.querySelectorAll('li.menu-item')// [0].clientWidth
      for (let i = 0;i < idx && i < menuItems.length; i++) {
        left += menuItems[i].clientWidth
      }
      this.moveBgLeft = left
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/color.less');
@header-height: 46px;
@menu-height: 20px;
@move-menu-bg-height: 25px;
.mix-transition (@property: all, @duration: .5s) {
  transition: @property @duration;
  transition-timing-function: cubic-bezier(0.68,-0.55,0.27,1.55);
}
.mr-header {
  height: @header-height;
  position: sticky;
  top: 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: (@header-height - @menu-height) / 2 + @move-menu-bg-height;
    background-color: #fff;
  }
  .logo-menu {
    display: flex;
    height: 100%;
    position: sticky;
    top: 0;
    .logo {
      flex: 0 0 200px;
      height: 100%;
      background-color: #2c2c2c;
      background-image: url('../../../assets/lyman-logo.png');
      background-size: 80% auto;
      background-position: center;
      background-repeat: no-repeat;
    }
    .menu {
      flex: 1 1 100%;
      list-style: none;
      display: flex;
      margin: 0 20px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      & > li {
        text-transform: uppercase;
        line-height: @header-height;
        padding: 0 10px;
        text-align: center;
        opacity: .5;
        .mix-transition(@property: opacity);
        a {
          display: block;
          height: @menu-height;
          text-decoration: none;
          position: relative;
          z-index: 10;
          color: #2d2d2d;
        }
        &.active {
          opacity: 1;
        }
        &.move-bg {
          position: absolute;
          z-index: 9;
          width: 0;
          height: 0;
          top: (@header-height - @menu-height) / 2;
          left: 0;
          border-left: 10px solid #88b9bd;
          border-right: 10px solid transparent;
          border-bottom: 25px solid #88b9bd;
          .mix-transition(@property: left);
        }
      }
    }
  }
}
</style>
