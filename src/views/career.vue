<template>
  <ul class="mr-c-ul">
    <li>
      <div>2013.7 - 2017.6</div>
      <div>
        <i class="mr-dot"></i>
      </div>
      <div>
        <p>
          <span>柯达（中国）投资有限公司 PDC 产品研发中心</span>
          <span>软件开发</span>
          <span>
            <i class="fa fa-map-marker"></i>
            <span>上海 浦东</span>
          </span>
        </p>
        <p>柯达正是当年红极一时垄断胶卷行业的巨头Kodak，虽然在2012年宣布破产，但在14年又经过重组和战略调整后，宣布走出破产保护。柯达作为一家老牌美企，在企业文化上有独特的体验。同时，员工遍布世界各地，每天都需要用英文和老外进行沟通和交流，也大大提高了技术视野、能力以及英文的沟通能力。</p>
        <p>在2013年作为实习生加入柯达，参与印刷软件的开发工作。先后参与了Preps,Insite,Prinergy项目的开发。</p>
        <p>2015年毕业后签正式合同，服务2年后于2017年离职。</p>
      </div>
    </li>
    <li>
      <div>2017.6 - 至今</div>
      <div>
        <i class="mr-dot"></i>
      </div>
      <div>
        <p>
          <span>新华三信息安全技术有限公司</span>
          <span>前端项目经理</span>
          <span>
            <i class="fa fa-map-marker"></i>
            <span>安徽 合肥</span>
          </span>
        </p>
        <p>新华三信息安全技术有限公司成立于2017 年3月，是新华三技术有限公司的全资子公司，国内信息安全领域的领导企业。主要为国家信息安全提供自主、可控的领先产品与解决方案、专业的信息安全服务和优质的信息安全人才培养体系，为数字经济发展构筑主动防御、智能免疫的大安全体系。</p>
        <p>作为前端项目组负责人，参与了防护墙设备管理页面，安全云项目的开发。</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url('../style/color.less');
.mr-c-ul {
  list-style: none;
  & > li {
    display: flex;
    &:hover {
      & > div {
        &:first-child {
          font-size: .85rem;
        }
        &:nth-child(2) {
          i.mr-dot {
            width: .9rem;
            height: .9rem;
          }
        }
        &:last-child {
          @hover-bg: @color-background;
          background-color: @hover-bg;
          &::before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            left: -.4rem;
            top: .5rem;
            border-top: .4rem solid transparent;
            border-right: .4rem solid @hover-bg;
            border-bottom: .4rem solid transparent;
          }
        }
      }
    }
    & > div {
      &:first-child {
        width: 8rem;
        flex-shrink: 1;
        font-size: .6rem;
        font-weight: bolder;
        text-align: center;
        padding-top: .2rem;
        transition: all .2s;
      }
      &:nth-child(2) {
        width: 3rem;
        flex-shrink: 1;
        position: relative;
        i.mr-dot {
          display: block;
          border-radius: 50%;
          width: .7rem;
          height: .7rem;
          background-color: #fff;
          border: .15rem solid @color-primary;
          margin: .5rem auto 0 auto;
          transition: all .2s;
        }
        &:after {
          content: "";
          width: .16rem;
          height: 100%;
          position: absolute;
          background-color: @color-primary;
          left: calc((100% - .2rem) / 2);
        }
      }
      &:last-child {
        width: 100%;
        padding:.5rem .5rem .5rem 1rem;
        position: relative;
        & > p:first-child {
          display: flex;
          font-size: .75rem;
          margin-bottom: .3rem;
          & > span {
            display: block;
            width: 20rem;
            font-weight: bolder;
          }
          i {
            margin-right: .2rem;
          }
        }
        & > p:not(:first-child) {
          margin-bottom: .5rem;
        }
      }
    }
  }
}
</style>
