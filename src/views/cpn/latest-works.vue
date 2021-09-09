<template>
  <div class="latest-work-wrapper">
    <div class="main">
      <h4 class="title">My Career</h4>
      <h5>3 Companies</h5>
      <div class="list-wrap">
        <ul class="company-logo-list">
          <li v-for="c in companyList" :key="c" :class="[c, activeCompany==c?'active':'']" @click="activeCompany=c"><div></div></li>
        </ul>
        <!-- <div class="company-info-list-wrap">
          <div class="header">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="body">
            <div><span>2013年-2016年</span></div>
            <div><span>软件工程师</span></div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const companyList = ['kodak', 'h3c', 'zoom']
    return {
      companyList,
      activeCompany: companyList[0]
    }
  },
}
</script>

<style lang="less" scoped>
@import url('../../style/color.less');
.latest-work-wrapper {
  width: var(--main-width);
  margin: 0 auto;
}
.title {
  letter-spacing: 3px;
  // color:#7cc2ba;
}
.main {
  width: calc(100vw);
  padding: 80px 200px;
  background-color: #88bbbc;
  color: #fff;
  position: absolute;
  left: 0;
  font-size: 16px;
  .list-wrap {
    display: flex;
    padding-top: 50px;
    .company-logo-list {
      list-style: none;
      display: flex;
      // flex-direction: column;
      & > li {
        width: 100px;
        height: 30px;
        display: inline-block;
        margin-right: 40px;
        transition: all .3s;
        cursor: pointer;
        position: relative;
        background: #fff;
        &:not(:last-child) {
          margin-bottom: 40px;
        }
        &:hover, &.active2 {
          animation: backpos 4s linear 0s infinite;
          &.kodak {
            background: linear-gradient(45deg, rgb(254, 182, 146), rgb(234, 84, 85) 50%, rgb(254, 182, 146) 80%);
          }
          &.h3c {
            background: linear-gradient(60deg, rgb(243, 118, 118), rgb(251, 0, 0) 50%, rgb(243, 118, 118) 80%);
          }
          &.zoom {
            background: linear-gradient(45deg, rgb(128, 179, 236), rgb(36, 138, 253) 50%, rgb(128, 179, 236) 80%);
          }
        }
        & > div {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: cover;
        }
        &.kodak {
          & > div {
            background-image: url('../../assets/kodak-logo.png');
          }
        }
        &.h3c {
          & > div {
            background-image: url('../../assets/h3c-logo.png');
          }
        }
        &.zoom {
          & > div {
            background-image: url('../../assets/zoom-logo.png');
          }
        }
      }
    }
    .company-info-list-wrap {
      flex: 1 1 100%;
      border-radius: @radius;
      box-shadow: 0px 0px 5px #aaa;
      overflow: hidden;
      @header-height: 25px;
      @radius: 3px;
      .header {
        background-color: #d8d7d8;
        height: @header-height;
        border-top-right-radius: @radius;
        border-top-left-radius: @radius;
        padding: 0 15px;
        border-bottom: 1px solid darken(#d8d7d8, 8%);
        & > span {
          @dot-size: 13px;
          display: inline-block;
          width: @dot-size;
          height: @dot-size;
          margin-top: (@header-height - @dot-size)/2;
          border-radius: 50%;
          margin-right: 10px;
          border:1px solid;
          &:first-child {
            background-color: #ff424f;
            border-color: darken(#ff424f, 5%);
          }
          &:nth-child(2) {
            background-color: #ffbc00;
            border-color: darken(#ffbc00, 5%);
          }
          &:nth-child(3) {
            background-color: #00d422;
            border-color: darken(#00d422, 5%);
          }
        }
      }
      .body {
        background-color: #fff;
        height: calc(100% - @header-height);
        border-bottom-left-radius: @radius;
        border-bottom-right-radius: @radius;
        color: #1d0015;
        padding: 5px 10px;
        font-size: 12px;
        font-family: '微软雅黑';
        @line-height: 16px;
        & > div {
          height: @line-height;
          line-height: @line-height;
          &:last-child {
            span {
              display: inline-block;
              position: relative;
              &::after{
                content: "";
                display: inline-block;
                position: absolute;
                width: 7px;
                height: @line-height - 2px;
                top: 1px;
                line-height: @line-height;
                margin-left: 5px;
                background-color: #929292;
              }
            }
          }
        }
      }
    }
  }
}
@keyframes backpos {
  0% {
    background-position-x: -100px;
  }
  100% {
    background-position-x: 200px;
  }
}
</style>
