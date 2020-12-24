<template>
  <div class="mr-career-wrap">
    <div>
      <div class="dash-card">
        <p><CountTo :end="3"></CountTo><span class="mr-unit">家</span></p>
        <p>就职企业</p>
        <div class="mr-logo-list">
          <img src="/static/career/kodak.png" >
          <img src="/static/career/h3c.png" >
          <img src="/static/career/arcu.jpg" >
        </div>
      </div>
      <div class="dash-card">
        <p><CountTo :end="workingYears"></CountTo><span class="mr-unit">年</span></p>
        <p>工作经验</p>
      </div>
    </div>
    <div class="dash-card">
      <ul class="mr-c-ul">
        <li>
          <div>2013.7 - 2017.6</div>
          <div>
            <i class="mr-dot"></i>
          </div>
          <div>
            <p>
              <span>柯达（中国）投资有限公司 PDC 产品研发中心</span>
              <span>软件开发工程师</span>
              <span>
                <i class="fa fa-map-marker"></i>
                <span>上海 浦东</span>
              </span>
            </p>
            <ul>
              <li>
                <p>工作内容</p>
                <ol>
                  <li>负责印能捷软件的前端开发任务。</li>
                  <li>产品的MacOS App的维护和开发。</li>
                  <li>拼板软件的开发，主要使用C++和C#。</li>
                </ol>
              </li>
              <li>
                <p>工作业绩</p>
                <ol>
                  <li>高质量完成各项开发及维护工作，年度考评获得A。</li>
                </ol>
              </li>
              <li>
                <p>说明</p>
                <ol class="mr-no-order">
                  <li>其中2013年至2015年为实习生。</li>
                </ol>
              </li>
            </ul>
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
            <ul>
              <li>
                <p>工作内容</p>
                <ol>
                  <li>云安全项目前端Leader，负责部门内3款产品的前端项目管理工作。</li>
                  <li>前端项目架构设计与搭建，流程优化，制定统一的UI规范和交互。</li>
                  <li>日常团队管理（组内人数规模10人），包括日常代码评审，技术培训等。</li>
                </ol>
              </li>
              <li>
                <p>工作业绩</p>
                <ol>
                  <li>云安全项目，从零开始，主要负责项目前端架构的设计和实现，并带领团队顺利完成项目任务，在公司展会上圆满展出。获得同年度的年度A+考评。</li>
                  <li>团队的管理。3年来团队稳定发展，每个人的技术水平快速提升，离职率远低于公司内其他团队。</li>
                </ol>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CountTo from '@/components/count-to/index.js'
export default {
  components: { CountTo },
  data () {
    return {
      workingYears: 5
    }
  },
  created () {
    this.calWorkingYear()
  },
  methods: {
    calWorkingYear () {
      this.workingYears = Math.ceil(((new Date()) - (new Date('2015/1/1'))) / (1000 * 60 * 60 * 24 * 365))
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../style/color.less');
.mr-career-wrap {
  height: 100%;
  & > div {
    &:first-child {
      height: 30%;
      display: flex;
      & > div.dash-card {
        width: 25rem;
        margin-right: 1rem;
        position: relative;
        & > p {
          &:first-child {
            font-size: 1.5rem;
            font-weight: bolder;
            color: @color-primary;
          }
        }
        .count-to-wrapper {
          display: inline-block;
          margin-right: .4rem;
        }
        .mr-unit {
          font-size: .7rem;
        }
      }
    }
    &:last-child {
      height: calc(70% - 1rem);
      margin-top: 1rem;
    }
  }
  /** step line */
  .mr-c-ul {
    height: 100%;
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
              // width: .9rem;
              // height: .9rem;
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
          flex-shrink: 0;
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
          font-size: .65rem;
          margin-left: 1rem;
          & > ul {
            list-style: none;
            & > li {
              display: flex;
              margin-bottom: .3rem;
              p {
                width: 3rem;
                flex-shrink: 0;
                text-align: right;
                &::after {
                  content: ":";
                }
              }
              ol {
                width: 100%;
                padding-left: 1rem;
                &.mr-no-order {
                  list-style: none;
                }
              }
            }
          }
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
              margin-right: .4rem;
            }
          }
          & > p:not(:first-child) {
            margin-bottom: .5rem;
          }
        }
      }
    }
  }
  .mr-logo-list {
    position: absolute;
    bottom: .5rem;
    & > img {
      cursor: pointer;
      height: 1.5rem;
      margin-right: 1rem;
      transition: height .2s ease-in-out;
      &:hover {
        height: 3rem;
      }
    }
  }
}

</style>
