<template>
  <div class="latest-work-wrapper">
    <div class="main">
      <h4 class="title">LATEST WORKS</h4>
      <h5>My Career</h5>
      <div class="list-wrap">
        <ul class="company-logo-list">
          <li class="kodak"><div></div></li>
          <li class="h3c"><div></div></li>
          <li class="zoom"><div></div></li>
        </ul>
        <ul class="company-info-list">
          <li>9 years</li>
          <li class="kodak">2 years</li>
          <li class="h3c">3 years</li>
          <li class="zoom">1 years</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
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
      flex-direction: column;
      flex: 0 0 200px;
      & > li {
        width: 100px;
        height: 30px;
        display: inline-block;
        margin-right: 20px;
        transition: all .3s;
        cursor: pointer;
        position: relative;
        background: #fff;
        // background: linear-gradient(45deg, rgb(254, 182, 146), rgb(234, 84, 85));
        &:not(:last-child) {
          margin-bottom: 40px;
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
          // &:hover {
          //   background-color: #2f8efd;
          // }
        }
      }
    }
    .company-info-list {
      flex: 1 1 100%;
    }
  }
}
</style>
