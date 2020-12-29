<template>
  <div class="mr-project-wrap">
    <ul>
      <li v-for="(item,idx) in data" :key="`item${idx}`">
        <div class="mr-p-title">
          <p>{{item.title}}</p>
          <p>{{item.company}}</p>
          <p>{{item.datetime}}</p>
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
          <p v-if="descItem.text">{{descItem.text}}</p>
          <ul v-if="descItem.list">
            <li v-for="(descListItem,descListIdx) in descItem.list" :key="`item${idx}_desc_${descIdx}_item${descListIdx}`">{{descListItem}}</li>
          </ul>
        </div>
      </li>
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
          company: '新华三信息安全技术有限公司',
          datetime: '2017年12月 - 2021年1月',
          info: [
            { label: '项目规模', value: '100k' },
            { label: '项目时间', value: '2017.12 - 2018.06' }
          ],
          skill: ['VueJS', 'less', 'NodeJS', 'Express', 'Docker'],
          description: [
            {
              title: '项目简介',
              text: '该产品主要功能为私有云安全服务管理平台，对外提供安全Sass服务（防火墙、抗D等十余类安全服务），并且实现服务的池化管理。对内，则需要对接各安全服务设备。账号主要分为管理员/租户/审计员三种角色，支持换肤和国际化。系统与CasServer单点登录系统对接，实现账号的互通。'
            },
            {
              title: '项目技术',
              list: [
                'SPA单页应用实现前后端分离，增加NodeJs中间层，处理非核心业务。页面使用Vuejs+Vuex+VueRouter前端框架。',
                'Node中间层Express框架对接CasServer单点登录系统，可实现多个系统间的登录问题。',
                '后期引入TypeScript，支持面向对象编程。',
                '开发环境的搭建，基于webpack-dev-middleware和webpack-hot-middleware。',
                '前端项目容器化，通过nginx解决跨域问题。',
                '基于iview定制项目组件'
              ]
            },
            {
              title: '我的职责',
              list: [
                '前期前端框架的设计，技术栈的选择。框架设计完通过评估评审后，框架的搭建和实现。',
                '日志，单点登录，国际化等模块的设计实现。后续流程的优化（如国际化统计脚本的编写，优化了重复统计；再如webpack插件记录打包的信息）。',
                '各页面的开发任务，包括可视化大屏的设计和开发。支持不同分辨率下的页面自适应。',
                '组织前端页面的合入前的页面评审和代码评审工作。',
                '项目后期优化，调优',
                '总结项目的UIguidance，并在组内实现统一。'
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
        },
        {
          title: '安管一体机管理平台',
          company: '新华三信息安全技术有限公司',
          datetime: '2019年12月 - 2020年5月',
          skill: ['VueJS', 'less'],
          description: [
            {
              title: '项目简介',
              text: '未解决客户轻松过等保2.0打造的一体机项目，集5种安全服务于一机。前端管理页面统一入口，展示各服务的报表大屏页面和基础配置页面。'
            },
            {
              title: '项目技术',
              list: [
                '框架与安全云管理平台一致。',
                'Echarts展示安全服务的报表。'
              ]
            },
            {
              title: '我的职责',
              list: [
                '前端负责人，页面原型设计与需求分析。',
                '报表可视化大屏页面的设计与编码。'
              ]
            }
          ]
        },
        {
          title: '云运维管理平台',
          company: '新华三信息安全技术有限公司',
          datetime: '2018年7月 - 2020年2月',
          skill: ['VueJS', 'less', 'Nodejs', 'Express', 'websocket'],
          description: [
            {
              title: '项目简介',
              text: '为解决运维难响应慢的问题，本产品提供云上远程运维防火墙等硬件设备的方案，前端管理页面为同一入口。'
            },
            {
              title: '项目技术',
              list: [
                '框架与安全云管理平台一致。',
                'WebSocket与设备保持长连接，实现反向连接的功能，即原创打开设备的控制台。'
              ]
            },
            {
              title: '我的职责',
              list: [
                '前端负责人，页面原型设计与需求分析。',
                '反向连接和反向命令行功能的设计和实现。'
              ]
            }
          ]
        },
        {
          title: '防火墙管理页面',
          company: '新华三信息安全技术有限公司',
          datetime: '2017年7月 - 2017年12月',
          skill: ['ExtJs'],
          description: [
            {
              title: '项目简介',
              text: '新华三防火墙等硬件设备的管理页面'
            },
            {
              title: '项目技术',
              list: [
                'ExtJs'
              ]
            },
            {
              title: '我的职责',
              list: [
                '新需求的开发和编码。',
                '问题单的修改。'
              ]
            }
          ]
        },
        {
          title: 'Insite软件',
          company: '柯达Kodak',
          datetime: '2014年 - 2016年',
          skill: ['Backbone.js', 'TypeScript', 'SignalR', '.Net'],
          description: [
            {
              title: '项目简介',
              text: '柯达印刷流程软件Insite，主要用于印刷行业中pdf文稿的审核批注等流程的控制。'
            },
            {
              title: '项目技术',
              list: [
                '前端采用Backbone.js框架，后台使用.Net框架。'
              ]
            },
            {
              title: '我的职责',
              list: [
                '根据设计稿完成前端HTML5页面的编码。',
                'Bug的修改以及新功能的设计和编码，解决浏览器兼容性问题。'
              ]
            }
          ]
        },
        {
          title: 'Preps印刷排版软件',
          company: '柯达Kodak',
          datetime: '2013年 - 2015年',
          skill: ['C++', 'C#'],
          description: [
            {
              title: '项目简介',
              text: '柯达印刷流程软件Preps，主要用于印刷行业中印前拼板流程。'
            },
            {
              title: '项目技术',
              list: [
                '底层C++开发，展示层WPF开发。',
                'MacOS基于Object-C开发。'
              ]
            },
            {
              title: '我的职责',
              list: [
                '新需求的开发和编码。',
                '问题单的修改。'
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
      border-bottom: .05rem solid var(--color-border);
      &:hover {
        background-color: var(--color-background);
      }
    }
    .mr-p-title {
      border-left: .2rem solid var(--color-primary);
      padding-left: .5rem;
      margin-bottom: .5rem;
      display: flex;
      justify-content: space-between;
      & > p {
        &:first-child {
          font-size: .9rem;
          font-weight: bolder;
        }
        &:nth-child(2) {
          font-size: 0.8rem;
        }
      }
    }
    .mr-p-info {
      display: flex;
      margin: .2rem 0;
      & > p {
        font-size: .6rem;
        background-color: var(--color-light-bg);
        padding: .05rem .2rem;
        border: .05rem solid var(--color-border);
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
