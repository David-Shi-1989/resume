<template>
  <div class="mr-demo-wrap">
    <ul>
      <li v-for="(item,idx) in demoList" :key="idx" @click="onDemoItemClick(item)">
        <p class="mr-d-t fs-lg">{{item.title}}</p>
        <p class="mr-d-c">{{item.content}}</p>
        <div class="mr-d-bottom">
          <p class="mr-d-d"><i class="fa fa-calendar"></i>{{item.datetime}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          title: '文章标题1',
          datetime: '2020/01/20 14:22:10',
          content: '发现语雀文档很好用之后，简书博客已经荒废了 =。=欢迎访问我的语雀 blog =。= 前端blog必须掌握的 css 知识点',
          isTop: true,
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/canvas-loading-1/index.html'
        },
        {
          title: '超长的文章标题2-超长的文章标题2-超长的文章标题2-超长的文章标题2-超长的文章标题2-超长的文章标题2-超长的文章标题2-超长的文章标题2',
          datetime: '2020/01/20 14:22:10',
          content: '发现语雀文档很好用之后，简书博客已经荒废了 =。=欢迎访问我的语雀 blog =。= 前端blog必须掌握的 css 知识点',
          url: 'https://david-shi-1989.github.io/MyCodeSnippet/src/component/modern-google-loader/index.html'
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
    & > li {
      cursor: pointer;
      transition: all .4s;
      border-bottom: .05rem solid var(--color-border);
      padding-bottom: .4rem;
      @padding: .4rem;
      &:hover {
        p.mr-d-t {
          text-decoration: underline;
        }
      }
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      & > p.mr-d-t {
        height: @title-height;
        line-height: @title-height;
        font-weight: bolder;
        color: var(--color-text-content);
      }
      & > p.mr-d-c {
        color: var(--color-text-sub);
        &::after {
          content: "...";
        }
      }
      & > div.mr-d-bottom {
        margin-top: .5rem;
        i {
          font-size: .5rem;
          margin-right: .3rem;
        }
        p.mr-d-d {
          color: var(--color-disabled);
        }
      }
    }
  }
}
</style>
