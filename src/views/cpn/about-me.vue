<template>
  <div class="header-main">
    <div class="section section-1">
      <div class="introduction">
        <img src="../../assets/hello-i-am.png" style="">
        <h3>Service Design Director specializing in integrating Human Centered Design into Health and Human Services programs.</h3>
        <p>Over the last 7 yeas, I gained meaningful experiences in diverse design maturity organizations driving teams and clients through mixed approaches based on Design Thinking, Lean UX and Agile, while also helping reform organizational cultures in modernizing existing and delivery new products.</p>
        <p>For the past 2 years, I directed Service Design resoinsibilities under my company Your Seat.</p>
        <ExploreMe></ExploreMe>
      </div>
    </div>
    <div class="section section-2">
      <div class="pattern-dots-md gray-light my-pic"><img src="../../assets/header-pic.png"></div>
    </div>
    <ul class="section section-3">
      <li><i class="fa fa-weibo"></i></li>
      <li><i class="fa fa-weixin"></i></li>
      <li><i class="fa fa-qq"></i></li>
      <li><i class="fa fa-github"></i></li>
    </ul>
  </div>
</template>

<script>
import ExploreMe from './explore-me.vue'
export default {
  components: {ExploreMe},
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/utils.less');
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
  position: absolute;
  right: 40px;
  @size: 16px;
  li {
    cursor: pointer;
    margin-bottom: 10px;
    &:hover {
      i {
        color: #86b9bc;
        transform: scale(1.6);
      }
    }
  }
  i {
    display: inline-block;
    width: @size;
    height: @size;
    color: #565656;
    transition: all .2s;
  }
  &::after {
    content: "";
    width: 1px;
    height: 120px;
    background-color: @color-border;
    position: absolute;
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
}
</style>
