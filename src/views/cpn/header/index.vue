<template>
  <div class="mr-header">
    <div class="section section-1">
      <div class="logo-menu">
        <div class="logo">LOGO</div>
        <ul class="menu">
          <li v-for="menu in menus" :key="menu" :class="menu==activeMenu?'active':''" @click="onMenuClick(menu)">
            <a href="javascript:void(0);">{{menu}}</a>
          </li>
        </ul>
      </div>
      <div class="introduction">

      </div>
    </div>
    <div class="section section-2">
      <div class="pattern-dots-md gray-light my-pic"><img src="../../../assets/header-man.png"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const menus = ['home', 'Case Study', 'Blog Post', 'Contact Me']
    return {
      menus,
      activeMenu: menus[0]
    }
  },
  props: {
  },
  components: {
  },
  methods: {
    onMenuClick (item) {
      this.activeMenu = item
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/color.less');
@header-height: 50px;
.mr-header {
  display: flex;
  height: @header-height;
  .section {
    height: 100%;
  }
  .section-1 {
    flex: 1 1 50%;
  }
  .section-2 {
    flex: 1 1 50%;
  }
  .logo-menu {
    display: flex;
    height: 100%;
    .logo {
      flex: 0 0 200px;
      height: 100%;
      background-color: #2c2c2c;
    }
    .menu {
      flex: 1 1 100%;
      list-style: none;
      display: flex;
      padding: 0 20px;
      box-sizing: border-box;
      cursor: pointer;
      & > li {
        text-transform: uppercase;
        line-height: @header-height;
        position: relative;
        padding: 0 10px;
        text-align: center;
        opacity: .5;
        transition: all .5s;
        a {
          text-decoration: none;
          position: relative;
          z-index: 10;
          color: #2d2d2d;
        }
        &.active {
          opacity: 1;
          &::before {
            content: "";
            width: 25px;
            height: @header-height / 2;
            position: absolute;
            top: @header-height / 4;
            left: 0;
            z-index: 9;
            background-color: #88b9bd;
          }
        }
      }
    }
  }
  .my-pic {
    width: 500px;
    img {
      width: 100%;
      transform: translate(-20px, 20px);
    }
  }
}
</style>
