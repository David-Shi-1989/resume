<template>
  <div class="mr-header">
    <div class="logo-menu">
      <div class="logo"></div>
      <ul class="menu">
        <li v-for="menu in menus" :key="menu.title" :class="[menu.title==activeMenu?'active':'', 'menu-item']" @click="onMenuClick(menu)">
          <a href="javascript:void(0);" @click="onMenuClick(menu)" class="text-cannot-select">{{menu.title}}</a>
        </li>
        <li class="move-bg" :style="{left:moveBgLeft + 'px'}"></li>
      </ul>
      <ul class="right-list">
        <li>
          <a-avatar v-if="userAvatar" :size="26">
            <img :src="getAvatar(userAvatar)" />
          </a-avatar>
          <a-avatar v-else :style="{ backgroundColor: 'var(--color-fill-4)' }" :size="26">
            <IconUser />
          </a-avatar>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { headerMenus, getMenu1ByRouterName } from '@/router/menu'
import { mapGetters } from 'vuex'
import { getAvatar } from '@/components/avatar'
export default {
  data () {
    const menus = headerMenus
    return {
      menus,
      activeMenu: menus[0].title,
      moveBgLeft: 0
    }
  },
  props: {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const curRouterName = this.$route.name
      const menuItem = getMenu1ByRouterName(curRouterName)
      if (menuItem) {
        this.activeMenu = menuItem.title
      }
    },
    onMenuClick (item) {
      this.activeMenu = item.title
      this.$router.push({ name: item.routerName })
    },
    moveHeaderBg () {
      let idx = 0
      let left = 0
      const currentMenu = this.activeMenu
      this.menus.some((menu, index) => {
        if (menu.title === currentMenu) {
          idx = index
          return true
        }
        return false
      })
      const menuItems = document.querySelectorAll('li.menu-item')
      for (let i = 0; i < idx && i < menuItems.length; i++) {
        left += menuItems[i].clientWidth
      }
      this.moveBgLeft = left
    },
    getAvatar (key) {
      return getAvatar(key)
    }
  },
  computed: {
    ...mapGetters(['userAvatar']),
    routerPath () {
      return this.$route.name
    }
  },
  watch: {
    routerPath () {
      this.init()
    },
    activeMenu () {
      this.moveHeaderBg()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../style/color.less');
@import url('../style/utils.less');

.mix-transition (@property: all, @duration: .5s) {
  transition: @property @duration;
  transition-timing-function: cubic-bezier(0.68,-0.55,0.27,1.55);
}
.mr-header {
  height: @header-height;
  position: sticky;
  top: 0;
  z-index: 990;
  background-color: #fff;
  border-bottom: 1px solid var(--color-border);
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
      height: @header-height;
      background-color: #2c2c2c;
      background-image: url('../assets/lyman-logo.png');
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
          border-left: 10px solid @color-menu-bg;
          border-right: 10px solid transparent;
          border-bottom: 25px solid @color-menu-bg;
          .mix-transition(@property: left);
        }
      }
    }
  }
  .right-list {
    list-style: none;
    align-self: center;
    margin-right: 20px;
  }
}
</style>
