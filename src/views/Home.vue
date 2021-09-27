<template>
  <div class="mr-home main-layout">
    <switch-card :count="3">
      <div slot="card1">
        card1
      </div>
      <div slot="card2">
        card2
      </div>
      <div slot="card3">
        card3
      </div>
    </switch-card>
  </div>
</template>
<script>
import switchCard from '@/components/switch-card/index.vue'
export default {
  components: {switchCard},
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
  },
  created () {
    console.log('created')
  },
  
}
</script>
<style lang="less" scoped>
@import url('../style/color.less');

@title1-width: 20rem;
.mr-home {
  
}
</style>
