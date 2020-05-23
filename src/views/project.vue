<template>
  <div class="mr-project-wrap">
    <ul>
      <li v-for="(item,idx) in data" :key="`item${idx}`">
        <div class="mr-p-title">
          <p>{{item.title}}</p>
        </div>
        <div class="mr-p-info">
          <p v-for="(infoItem,infoIdx) in item.info" :key="`item${idx}_info_${infoIdx}`">
            <span class="after-comma">{{infoItem.label}}</span><span>{{infoItem.value}}</span>
          </p>
        </div>
        <div class="mr-p-info mr-p-info-2">
          <p v-for="(skillItem,skillIdx) in item.skill" :key="`item${idx}_skill_${skillIdx}`">
            <span>{{skillItem}}</span>
          </p>
        </div>
        <div class="mr-p-info-tt" v-for="(descItem,descIdx) in item.description" :key="`item${idx}_desc_${descIdx}`">
          <p>{{descItem.title}}</p>
          <ul>
            <li v-for="(descListItem,descListIdx) in descItem.list" :key="`item${idx}_desc_${descIdx}_item${descListIdx}`">{{descListItem}}</li>
          </ul>
        </div>
      </li>
      <!-- <li>
        <div class="mr-p-title">
          <p>安全云前端项目</p>
        </div>
        <div class="mr-p-info">
          <p><span class="after-comma">项目规模</span><span>100k</span></p>
          <p><span class="after-comma">项目时间</span><span>2018.1 - 至今</span></p>
        </div>
        <div class="mr-p-info mr-p-info-2">
          <p><span>VueJs</span></p>
          <p><span>NodeJs</span></p>
          <p><span>Express</span></p>
          <p><span>Cas</span></p>
          <p><span>webpack</span></p>
        </div>
        <div class="mr-p-info-tt">
          <p>项目简介</p>
          <ul>
            <li>这是第一条项目简介。</li>
            <li>这是第2条项目简介。</li>
            <li>这是第3条项目简介。</li>
            <li>这是第4条项目简介。</li>
            <li>这是第5条项目简介。</li>
          </ul>
        </div>
        <div class="mr-p-info-tt">
          <p>承担任务</p>
          <ul>
            <li>这是第一条项目简介。</li>
            <li>这是第2条项目简介。</li>
            <li>这是第3条项目简介。</li>
            <li>这是第4条项目简介。</li>
            <li>这是第5条项目简介。</li>
          </ul>
        </div>
      </li>
      <li>
        <div class="mr-p-title">
          <p>安全云前端项目</p>
        </div>
        <div class="mr-p-info">
          <p><span class="after-comma">项目规模</span><span>100k</span></p>
          <p><span class="after-comma">项目时间</span><span>2018.1 - 至今</span></p>
        </div>
        <div class="mr-p-info mr-p-info-2">
          <p><span>VueJs</span></p>
          <p><span>NodeJs</span></p>
          <p><span>Express</span></p>
          <p><span>Cas</span></p>
          <p><span>webpack</span></p>
        </div>
        <div class="mr-p-info-tt">
          <p>项目简介</p>
          <ul>
            <li>这是第一条项目简介。</li>
            <li>这是第2条项目简介。</li>
            <li>这是第3条项目简介。</li>
            <li>这是第4条项目简介。</li>
            <li>这是第5条项目简介。</li>
          </ul>
        </div>
        <div class="mr-p-info-tt">
          <p>承担任务</p>
          <ul>
            <li>这是第一条项目简介。</li>
            <li>这是第2条项目简介。</li>
            <li>这是第3条项目简介。</li>
            <li>这是第4条项目简介。</li>
            <li>这是第5条项目简介。</li>
          </ul>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          title: '云安全管理平台',
          info: [
            { label: '项目规模', value: '100k' },
            { label: '项目时间', value: '2017.12 - 2018.06' }
          ],
          skill: ['VueJS', 'NodeJS', 'Express'],
          description: [
            {
              title: '项目简介',
              list: [
                '项目主要功能为私有云安全管理平台，对外提供安全SASS服务（防火墙，抗D等十余类服务），并且实现服务的池化管理。对内，则需要对接各安全服务。',
                '前后端分离，增加node层，处理非核心业务，前端项目为SPA单页应用，主要使用vuejs框架。Node中间层对接CasServer单点登录系统，可实现多个系统间的登陆问题。'
              ]
            },
            {
              title: '承担任务',
              list: [
                '前期前端框架的设计，技术栈的选择。框架设计完通过评估评审后，框架的搭建和实现。',
                '日志，单点登录，国际化等模块的设计实现。后续流程的优化（如国际化统计脚本的编写，优化了重复统计；再如webpack插件记录打包的信息）。',
                '各页面的开发任务，包括可视化大屏的设计和开发。支持不同分辨率下的页面自适应。',
                '组织前端页面的合入前的页面评审和代码评审工作。',
                '后期总结项目的UI规范，并在组内实现统一。'
              ]
            },
            {
              title: '工作业绩',
              list: [
                '项目按期交付，并在公司展会上圆满展出，获得众多意向客户的兴趣。',
                '项目开局顺利，目前已有多个局点。'
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../style/color.less');
.mr-project-wrap {
  & > ul {
    list-style: none;
    & > li {
      padding: .3rem;
      margin-bottom: 1rem;
      border-bottom: .05rem solid @color-border;
    }
    .mr-p-title {
      font-size: .9rem;
      font-weight: bolder;
      border-left: .2rem solid @color-primary;
      padding-left: .5rem;
      margin-bottom: .5rem;
    }
    .mr-p-info {
      display: flex;
      margin: .2rem 0;
      & > p {
        font-size: .6rem;
        background-color: @color-background;
        padding: .05rem .2rem;
        border: .05rem solid @color-border;
        border-radius: .2rem;
        &:not(:last-child) {
          margin-right: 1rem;
        }
        span.after-comma {
          &::after {
            content: ":";
            margin: 0 .1rem;
          }
        }
      }
      &.mr-p-info-2 {
        font-size: .5rem;
        & > p:not(:last-child) {
          margin-right: .3rem;
        }
      }
    }
    .mr-p-info-tt {
      margin-bottom: .5rem;
      & > p:first-child {
        font-size: .7rem;
        font-weight: bolder;
      }
      & > ul {
        list-style: disc;
        padding-left: .8rem;
        font-size: .7rem;
      }
    }
  }
}
</style>
