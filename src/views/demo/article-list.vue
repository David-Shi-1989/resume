<template>
  <div class="mr-demo-wrap">
    <ul>
      <li v-for="(item,idx) in demoList" :key="idx" @click="onDemoItemClick(item)">
        <div class="mr-d-img" :style="{backgroundImage: `url(${item.img})`}">
          <!-- <p v-if="!item.img">懒得上传图片，直接点开查看吧^^</p> -->
        </div>
        <p class="mr-d-t">{{item.title}}</p>
        <div class="mr-d-score"><starScore v-model="item.score" align="right"></starScore></div>
        <p class="mr-d-d">{{item.description}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import starScore from '../../components/skill-line'
export default {
  components: { starScore },
  data () {
    return {
      list: [
        {
          title: 'Canvas loading',
          img: './static/image/demo/canvas-loading-1.png',
          score: 3,
          description: '使用canvas画出的loading，带动画效果。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/canvas-loading-1/index.html'
        },
        {
          title: '纯css实现loading',
          img: './static/image/demo/css-google-loader.png',
          score: 3.5,
          description: '使用css画的Google彩色旋转loader。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/modern-google-loader/index.html'
        },
        {
          title: 'Canvas Clock',
          img: './static/image/demo/canvas-clock.png',
          score: 4,
          description: '使用原生canvas画的精美时钟。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/course/canvas/clock.html'
        },
        {
          title: '数据双向绑定',
          img: './static/image/demo/vue-watch-dep.png',
          score: 4.5,
          description: '以商城手机价格波动为情形，模拟vue的数据双向绑定和侦听原理，阐释watch和dep。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/vue/%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/02%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A/index.html'
        },
        {
          title: 'flex布局详解',
          img: './static/image/demo/css-flex.png',
          score: 3,
          description: '详细展示flex的布局属性及用法，带demo。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/course/display-flex/index.html'
        },
        {
          title: '图片堆叠效果',
          img: './static/image/demo/css-img-stack.png',
          score: 3,
          description: '用css实现图片堆叠效果。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/photoStack/index.html'
        },
        {
          title: '弹性布局',
          score: 3,
          description: '用3种方法实现横向的弹性布局，第二个div自适应长度。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/flex-box/index.html'
        },
        {
          title: '个人书签首页',
          score: 4.2,
          description: '基于bootstrap实现个人书签，可收藏网页书签并进行分类，支持导入导出。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/web/Portal/index.html'
        },
        {
          title: 'echarts环形饼图',
          img: './static/image/demo/echarts-pie.png',
          score: 3.8,
          description: '基于echarts实现环形饼图，支持悬浮展示。',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/echarts/index.html'
        },
        {
          title: '滚动日志',
          score: 4.5,
          description: 'VueJS编写的日志滚动组件。',
          routerName: 'Demo_Animate'
        }
      ]
    }
  },
  methods: {
    onDemoItemClick (item) {
      if (item.url) {
        window.open(item.url, '_blank')
      } else if (item.routerName) {
        this.$router.push({ name: item.routerName })
      }
    }
  },
  computed: {
    demoList () {
      let list = this.list
      list.forEach(item => {
        if (!item.img) {
          item.img = './static/image/demo/placeholder.jpg'
        }
      })
      return list
    }
  }
}
</script >
<style lang="less" scoped>
@import url('../../style/color.less');
@title-height: 1.5rem;
.mr-demo-wrap {
  & > ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    & > li {
      display: grid;
      cursor: pointer;
      flex-shrink: 0;
      width: 15rem;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 8rem @title-height 3.5rem;
      grid-template-areas:
        "img img"
        "title score"
        "des des";
      border: .05rem solid var(--color-border);
      transition: all .4s;
      margin-bottom: 1rem;
      @padding: .4rem;
      &:hover {
        border-color: #f40;
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
      & > div.mr-d-img {
        grid-area: img;
        background-size: cover;
        border-bottom: 1px solid var(--color-border);
        & > p {
          margin: 2rem 0.5rem;
        }
      }
      & > p.mr-d-t {
        grid-area: title;
        padding-left: @padding;
        height: @title-height;
        line-height: @title-height;
        font-weight: bolder;
      }
      & > div.mr-d-score {
        grid-area: score;
        padding-right: @padding;
        height: @title-height;
        line-height: @title-height;
      }
      & > p.mr-d-d {
        grid-area: des;
        padding: 0 @padding;
        color: var(--color-text-sub);
        overflow: hidden;
        flex-wrap: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
