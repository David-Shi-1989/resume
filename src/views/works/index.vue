<template>
  <div class="main-layout">
    <ul class="tag-list">
      <li v-for="(tag,idx) in tagList" :key="idx" @click="activeTag=tag"
        :class="{active:activeTag==tag, 'text-cannot-select': true}">{{tag}}</li>
    </ul>
    <div class="card-list">
      <transition-group name="bounce">
        <div v-for="(item) in showList" :key="item.title" class="card-item">
          <work-card :title="item.title" :description="item.description" :img="item.img" :url="item.url"></work-card>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import workCard from './work-card.vue'
export default {
  components: {
    workCard
  },
  data () {
    return {
      list: [
        {
          title: 'Canvas loading',
          img: './static/image/demo/canvas-loading-1.png',
          score: 3,
          description: '使用canvas画出的loading，带动画效果。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/canvas-loading-1/index.html',
          tag: 'JavaScript'
        },
        {
          title: '纯css实现loading',
          img: './static/image/demo/css-google-loader.png',
          score: 3.5,
          description: '使用css画的Google彩色旋转loader。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/modern-google-loader/index.html',
          tag: 'CSS'
        },
        {
          title: 'Canvas Clock',
          img: './static/image/demo/canvas-clock.png',
          score: 4,
          description: '使用原生canvas画的精美时钟。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/course/canvas/clock.html',
          tag: 'JavaScript'
        },
        {
          title: '数据双向绑定',
          img: './static/image/demo/vue-watch-dep.png',
          score: 4.5,
          description: '以商城手机价格波动为情形，模拟vue的数据双向绑定和侦听原理，阐释watch和dep。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/vue/%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/02%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A/index.html',
          tag: 'JavaScript'
        },
        {
          title: 'flex布局详解',
          img: './static/image/demo/css-flex.png',
          score: 3,
          description: '详细展示flex的布局属性及用法，带demo。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/course/display-flex/index.html',
          tag: 'CSS'
        },
        {
          title: '图片堆叠效果',
          img: './static/image/demo/css-img-stack.png',
          score: 3,
          description: '用css实现图片堆叠效果。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/photoStack/index.html',
          tag: 'CSS'
        },
        {
          title: '弹性布局',
          score: 3,
          description: '用3种方法实现横向的弹性布局，第二个div自适应长度。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/flex-box/index.html',
          tag: 'CSS'
        },
        {
          title: '个人书签首页',
          score: 4.2,
          description: '基于bootstrap实现个人书签，可收藏网页书签并进行分类，支持导入导出。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/web/Portal/index.html',
          tag: 'JavaScript'
        },
        {
          title: 'echarts环形饼图',
          img: './static/image/demo/echarts-pie.png',
          score: 3.8,
          description: '基于echarts实现环形饼图，支持悬浮展示。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/echarts/index.html',
          tag: 'JavaScript'
        },
        {
          title: '滚动日志',
          score: 4.5,
          description: 'VueJS编写的日志滚动组件。',
          routerName: 'Demo_Animate',
          tag: 'JavaScript'
        },
        {
          title: 'webpack教程',
          img: 'https://pic2.zhimg.com/v2-c5d2c67f829f3c79343413ee11d249bd_1440w.jpg?source=172ae18b',
          score: 4.8,
          description: 'Webpack入门教程，配合代码解析，适合新手深入浅出学习入门。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/gitbook/dist/webpack/',
          tag: 'JavaScript'
        }
      ],
      tagList: ['所有', 'JavaScript', 'CSS'],
      activeTag: '所有'
    }
  },
  computed: {
    showList () {
      const activeTag = this.activeTag
      return this.list.filter(item => (activeTag === '所有' || activeTag === item.tag))
    }
  }
}
</script>

<style lang="less" scoped>
.tag-list {
  @height: 24px;
  display: flex;
  & > li {
    line-height: @height;
    cursor: pointer;
    color: var(--color-content);
    opacity: .6;
    transition: opacity .3s cubic-bezier(.2,0,.2,1);
    &:not(:last-child) {
      margin-right: 10px;
      &::after {
        content: "";
        display: inline-flex;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #555;
        margin-top: -5px;
        margin-left: 10px;
        line-height: @height;
        vertical-align: middle;
      }
    }
    &.active {
      opacity: 1;
    }
  }
}
.card-list {
  & > span {
    display: flex;
    flex-wrap: wrap;
    @gutter: 25px;
    & > .card-item {
      width: calc((100% - @gutter * 3) / 4);
      margin-bottom: 15px;
      transition: all .2s;
      &:not(:nth-child(4n)) {
        margin-right: @gutter;
      }
    }
  }
}
.bounce-enter-active {
  animation: bounce-in .4s;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
