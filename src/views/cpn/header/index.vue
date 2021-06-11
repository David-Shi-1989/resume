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
    <div class="header-main">
      <div class="section section-1">
        <div class="introduction">
          <img src="../../../assets/hello-i-am.png" style="">
          <h3>Service Design Director specializing in integrating Human Centered Design into Health and Human Services programs.</h3>
          <p>Over the last 7 yeas, I gained meaningful experiences in diverse design maturity organizations driving teams and clients through mixed approaches based on Design Thinking, Lean UX and Agile, while also helping reform organizational cultures in modernizing existing and delivery new products.</p>
          <p>For the past 2 years, I directed Service Design resoinsibilities under my company Your Seat.</p>
          <div class="explore-me">
            <i class="fa fa-angle-down"></i>
            <span>EXPLORE ME</span>
          </div>
        </div>
      </div>
      <div class="section section-2">
        <div class="pattern-dots-md gray-light my-pic"><img src="../../../assets/header-pic.png"></div>
      </div>
      <ul class="section section-3">
        <li><i class="fa fa-weibo"></i></li>
        <li><i class="fa fa-weixin"></i></li>
        <li><i class="fa fa-qq"></i></li>
        <li><i class="fa fa-github"></i></li>
      </ul>
    </div>
    <div class="divider" style="margin: 90px auto 60px auto;"></div>
    <LatestWorks></LatestWorks>
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
@import url('../../../style/animation.less');
@header-height: 50px;
@border-color:#e1e1e1;

.mix-transition (@property: all, @duration: .5s) {
  transition: @property @duration;
  transition-timing-function: cubic-bezier(0.68,-0.55,0.27,1.55);
}
.mr-header {
  height: @header-height;
  .header-main {
    display: flex;
    width: var(--main-width);
    margin: 40px auto 0 auto;
  }
  .section {
    height: 100%;
  }
  .section-1 {
    flex: 1 1 700px;
    margin-right: 50px;
  }
  .section-2 {
    flex: 1 1 500px;
  }
  .section-3 {
    flex: 0 0 41px;
    list-style: none;
    text-align: center;
    position: relative;
    @size: 16px;
    li {
      cursor: pointer;
      margin-bottom: 10px;
      &:hover {
        i {
          color: #86b9bc;
        }
      }
    }
    i {
      display: inline-block;
      width: @size;
      height: @size;
      color: #b2b2b2;
    }
    &::after {
      content: "";
      width: 1px;
      height: 120px;
      background-color: @border-color;
      position: absolute;
      bottom: -140px;
      left: 20px;
    }
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
          top: @header-height / 4;
          left: 0;
          border-left: 10px solid #88b9bd;
          border-right: 10px solid transparent;
          border-bottom: 25px solid #88b9bd;
          .mix-transition(@property: left);
        }
      }
    }
  }
  .my-pic {
    width: 500px;
    img {
      width: 100%;
      transform: translate(-30px, 30px);
    }
  }
  .introduction {
    img {
      width: 450px;
      margin-top: 100px;
    }
    h3 {
      line-height: 32px;
      font-size: 18px;
      color:#2c2c2c; 
    }
    p {
      line-height: 24px;
      font-size: 14px;
      color: #717171;
      margin-top: 15px;
    }
    .explore-me {
      @icon-size: 20px;
      margin-top: 20px;
      position: relative;
      display: inline-flex;
      i {
        display: inline-block;
        width: @icon-size;
        height: @icon-size;
        border-radius: 50%;
        border: 1px solid #8d8d8d;
        color: #8d8d8d;
        text-align: center;
        line-height: @icon-size;
        font-size: 16px;
        margin-right: 15px;
        cursor: pointer;
        transition: all .5s;
        transition-timing-function: cubic-bezier(0.68,-0.55,0.27,1.55);
      }
      span {
        cursor: pointer;
        display: block;
      }
      &::after {
        content: "";
        position: absolute;
        width: 150px;
        height: 1px;
        background-color: @border-color;
        right: -170px;
        top: 10px;
      }
      &:hover {
        i {
          transform: rotate(-90deg);
        }
        span {
          .ant-bounce-right();
        }
      }
    }
  }
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #f2f2f2;
}
</style>
