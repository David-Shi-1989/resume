<template>
  <div class="mr-home">
    <ul class="mr-home-t-ul">
      <li>
        <b>个人自述</b>
        <p><span class="mr-bolder">5</span>年前端开发经验</p>
        <p><span class="mr-bolder">3</span>年团队管理经验</p>
        <p>热爱前端技术，有完整项目开发经验，目前从事云安全管理平台项目开发工作。</p>
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
        <b>{{$t('careerPage')}}</b>
        <ul class="mr-ul-display">
          <li v-for="item in careerList" :key="item.timeRange">
            <div>
              <span class="mr-ul-t1">{{item.company}}</span>
              <span class="mr-ul-t-bg">{{item.role}}</span>
            </div>
            <div>
              <span class="mr-ul-t3"><i class="fa fa fa-map-marker"></i>{{item.region}}</span>
              <span class="mr-ul-t3"><i class="fa fa-calendar"></i>{{item.timeRange}}</span>
            </div>
          </li>
        </ul>
        <router-link to="/career">查看详细工作经历</router-link>
      </li>
      <li>
        <b>技能清单</b>
        <ul class="mr-ul-skill">
          <li v-for="(item,idx) in skillList" :key="idx">
            <div>
              <span>{{item.title}}</span>
              <starScore v-model="item.score"></starScore>
            </div>
            <div>
              <ul>
                <li v-for="(item2,idx2) in item.description" :key="idx+'_'+idx2">{{item2}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import starScore from '../components/skill-line'
export default {
  components: { starScore },
  data () {
    return {
      careerList: [
        {
          company: '柯达（中国）产品研发中心',
          role: '实习生',
          region: '上海-浦东',
          timeRange: '2013.6 - 2015.1'
        },
        {
          company: '柯达（中国）产品研发中心',
          role: '软件开发工程师',
          region: '上海-浦东',
          timeRange: '2015.1 - 2016.6'
        },
        {
          company: '屯溪农村商业银行',
          role: '电子银行部职员',
          region: '安徽-屯溪',
          timeRange: '2016.7 - 2017.6'
        },
        {
          company: '新华三信息安全技术有限公司',
          role: '前端开发工程师',
          region: '安徽-合肥',
          timeRange: '2017.6 - 2021.1'
        }
      ],
      skillList: [
        {
          title: 'JavaScript/CSS/HTML',
          score: 4.2,
          description: [
            '熟悉各种js的API以及ES6语法。',
            '精通JavaScript、Ajax等Web开发技术。',
            '熟悉CSS排版，有一定页面重构经验，能独立根据设计图制作页面，处理浏览器兼容性。',
            '熟悉HTTP协议，对网站性能优化有所研究，在实际项目中有经验。'
          ]
        },
        {
          title: 'NodeJS',
          score: 4.0,
          description: [
            '熟练掌握 Nodejs 的核心模块和线程的使用。',
            '熟练掌握 Nodejs 的异步编程方法，熟悉 Promise、Generator、Await/Async。',
            '熟悉 redis、mongodb 等数据库的基本使用。',
            '熟悉Express框架的使用，有中间件开发经验。',
            '有对接CasServer的经验。'
          ]
        },
        {
          title: 'VueJS',
          score: 4.5,
          description: [
            '熟练掌握VueJS框架的使用及原理和内部机制。',
            '3年VueJS项目开发经验。'
          ]
        },
        {
          title: 'Photoshop',
          score: 3.2,
          description: [
            '熟练使用PS的基础操作，能自主完成图标和图片的处理。'
          ]
        },
        {
          title: 'Axure',
          score: 3.9,
          description: [
            '熟练使用Axure进行原型设计。'
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../style/color.less');
@title1-width: 20rem;
.mr-home {
  padding-bottom: .5rem;
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
        color: var(--color-text-title);
      }
      & > p {
        font-size: .7rem;
      }
      a {
        font-size: .5rem;
      }
      .mr-bolder {
        font-size: 1.5rem;
        font-weight: bolder;
        margin-right: .2rem;
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
            width: @title1-width;
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
        border-top: .05rem solid var(--color-border);
      }
      &:hover {
        background-color: var(--color-background);
      }
    }
    .mr-ul-t1 {
      font-size: .75rem;
    }
    .mr-ul-t-bg {
      font-size: .55rem;
      font-weight: bolder;
      background-color: var(--color-light-bg);
      border-radius: .35rem;
      display: inline-block;
      padding: .1rem .3rem;
      color: var(--color-text-title);
    }
    .mr-ul-t3 {
      font-size: .5rem;
      color: var(--color-text-sub);
      i {
        margin-right: .2rem;
      }
    }
  }
  ul.mr-home-list-ul {
    list-style: none;
    & > li {
      padding: .6rem 0;
      border-bottom: .05rem solid var(--color-border);
      & > div {
        display: flex;
        &:first-child {
          font-size: .8rem;
        }
        &:last-child {
          font-size: .5rem;
          color: var(--color-disabled);
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
          background-color: var(--color-light-bg);
          border-radius: .35rem;
          display: inline-block;
          padding: .1rem .5rem;
          text-align: center;
        }
      }
    }
  }
  ul.mr-ul-skill {
    list-style: none;
    & > li {
      padding: 0 .2rem;
      &:not(:last-child) {
        margin-bottom: .4rem;
      }
      & > div {
        display: flex;
        & > span {
          display: block;
          width: @title1-width;
          font-weight: bolder;
        }
        &:last-child {
          font-size: .5rem;
          color: var(--color-text-sub);
          margin-left: .7rem;
        }
      }
      &:hover {
        background-color: var(--color-background);
      }
    }
  }
}
</style>
