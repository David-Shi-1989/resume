<template>
  <div class="mr-home">
    <ul class="mr-home-t-ul">
      <li>
        <b>个人自述</b>
        <p>罗德里戈帮助皇马在伊斯塔布尔做出回应，并在回到伯纳乌主场后用一个完美的帽子戏法点燃了球场，这也让他成为了欧冠历史上第二年轻的帽子戏法先生，仅次于劳尔。</p>
        <p>在那以后罗德里戈就没有太多的机会，但罗德里戈很冷静，他知道自己的皇马生涯是一场马拉松，而不是短跑，他对自己在皇马的首个赛季感到满意，目前已经参与到了其中的18场比赛中。</p>
      </li>
      <li class="mr-education">
        <b>教育背景</b>
        <ul class="mr-ul-display">
          <li>
            <div>
              <span class="mr-ul-t1">东北大学</span>
              <span class="mr-ul-t-bg">本科</span>
            </div>
            <div>
              <span class="mr-ul-t3"><i class="fa fa-graduation-cap"></i>测控技术与仪器</span>
              <span class="mr-ul-t3"><i class="fa fa-calendar"></i>2008.9 - 2012.7</span>
            </div>
          </li>
          <li>
            <div>
              <span class="mr-ul-t1">中国科学技术大学</span>
              <span class="mr-ul-t-bg">研究生</span>
            </div>
            <div>
              <span class="mr-ul-t3"><i class="fa fa-graduation-cap"></i>软件工程</span>
              <span class="mr-ul-t3"><i class="fa fa-calendar"></i>2012.9 - 2015.1</span>
            </div>
          </li>
        </ul>
      </li>
      <li class="mr-career">
        <b>工作经历</b>
        <ul class="mr-ul-display">
          <li>
            <div>
              <span class="mr-ul-t1">柯达（中国）产品研发中心</span>
              <span class="mr-ul-t-bg">实习生</span>
            </div>
            <div>
              <span class="mr-ul-t3"><i class="fa fa fa-map-marker"></i>上海-浦东</span>
              <span class="mr-ul-t3"><i class="fa fa-calendar"></i>2013.6 - 2015.1</span>
            </div>
          </li>
          <li>
            <div>
              <span class="mr-ul-t1">柯达（中国）产品研发中心</span>
              <span class="mr-ul-t-bg">软件开发工程师</span>
            </div>
            <div>
              <span class="mr-ul-t3"><i class="fa fa fa-map-marker"></i>上海-浦东</span>
              <span class="mr-ul-t3"><i class="fa fa-calendar"></i>2015.1 - 2016.6</span>
            </div>
          </li>
          <li>
            <div>
              <span class="mr-ul-t1">新华三信息安全技术有限公司</span>
              <span class="mr-ul-t-bg">前端开发工程师</span>
            </div>
            <div>
              <span class="mr-ul-t3"><i class="fa fa fa-map-marker"></i>安徽-合肥</span>
              <span class="mr-ul-t3"><i class="fa fa-calendar"></i>2016.6 - 至今</span>
            </div>
          </li>
        </ul>
        <router-link to="/career">查看详细工作经历</router-link>
      </li>
      <li>
        <b>技能清单</b>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>
<style lang="less" scoped>
@import url('../style/color.less');
.mr-home {
  ul.mr-home-t-ul {
    list-style: none;
    & > li {
      &:not(:first-child) {
        margin-top: 1rem;
      }
      b {
        display: block;
        font-size: 1.2rem;
        font-weight: bolder;
        margin: .5rem 0;
      }
      & > p {
        font-size: .7rem;
      }
      a {
        font-size: .5rem;
      }
      &.mr-education {
      }
    }
  }
  ul.mr-ul-display {
    list-style: none;
    & > li {
      & > div {
        &:first-child {
          margin-bottom: .2rem;
          & > span:first-child {
            display: inline-block;
            width: 15rem;
          }
        }
        &:last-child {
          & > span {
            display: inline-block;
            width: 7rem;
          }
        }
      }
      padding: .5rem .2rem;
      &:not(:first-child) {
        // margin-top: .8rem;
        border-top: .05rem solid @color-border;
      }
      &:hover {
        background-color: @color-background;
      }
    }
    .mr-ul-t1 {
      font-size: .75rem;
    }
    .mr-ul-t-bg {
      font-size: .55rem;
      font-weight: bolder;
      background-color: #d7ffe0;
      border-radius: .35rem;
      display: inline-block;
      padding: .1rem .3rem;
    }
    .mr-ul-t3 {
      font-size: .5rem;
      color: @color-disabled;
      i {
        margin-right: .2rem;
      }
    }
  }
  ul.mr-home-list-ul {
    list-style: none;
    & > li {
      padding: .6rem 0;
      border-bottom: .05rem solid @color-border;
      & > div {
        display: flex;
        &:first-child {
          font-size: .8rem;
        }
        &:last-child {
          font-size: .5rem;
          color: @color-disabled;
          i {
            font-size: .5rem;
            margin-right: .3rem;
          }
        }
        & > p {
          @last-p-width: 6rem;
          &:first-child {
            width: calc(100% - @last-p-width);
          }
          &:last-child {
            width: @last-p-width;
            text-align: center;
          }
        }
        .mr-bg {
          background-color: #d7ffe0;
          border-radius: .35rem;
          display: inline-block;
          padding: .1rem .5rem;
          text-align: center;
        }
      }
    }
  }
}
</style>
