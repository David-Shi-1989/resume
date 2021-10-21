<template>
  <div class="main-layout">
    <div class="left-col">
      <div class="top-row">
        <h1 class="title">{{title}}</h1>
        <div class="info-row">
          <p class="datetime">{{datetime}}</p>
          <tagList :list="tagList"></tagList>
        </div>
      </div>
      <div class="post-text" v-html="text"></div>
    </div>
    <div class="right-col">
      <div class="gray-box">
        <h2>目录</h2>
        <ul class="category-list c1">
          <li v-for="(item,idx) in category" :key="idx">
            <p>{{item.title}}</p>
            <template v-if="item.children">
              <ul class="category-list c2">
                <li v-for="(item2,idx2) in item.children" :key="idx+idx2" :class="{active: item2.active}"><p>{{item2.title}}</p></li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticleById} from '@/api/op'
import tagList from './tag-item.vue'
export default {
  props: {
    id: String
  },
  components: {tagList},
  data () {
    return {
      title: '',
      datetime: '',
      tagList: [],
      text: '',
      category: [
        {title: 'TypeScript简介'},
        {
          title: '环境搭建',
          children: [
            {title: '后台环境搭建'},
            {title: '前台环境搭建', active: true},
          ]
        },
        {
          title: '开发介绍',
          children: [
            {title: '开发1'},
            {title: '开发2'}
          ]
        }
      ]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      getArticleById(this.id).then(obj => {
        this.title = obj.title
        this.datetime = obj.create_datetime
        this.tagList = obj.tags
        this.text = obj.content
        console.log(obj)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-layout {
  display: flex;
  .left-col {
    flex: 1 1 100%;
    margin-right: 40px;
    padding: 20px 40px;
    background-color: #fff;
    .top-row {
      padding-bottom: 10px;
      border-bottom: 2px dashed var(--color-border);
    }
  }
  .right-col {
    width: 250px;
    .gray-box {
      position: sticky;
      top: 0;
      background-color: #fff;
    }
  }
}
h1.title {
  margin-bottom: 10px;
}
.info-row {
  display: flex;
  .datetime {
    margin-right: 20px;
  }
}
.post-text {
  margin-top: 10px;
  font-size: 18px;
  text-indent: 2rem;
  word-break: break-all;
  line-height: 34px;
  font-weight: 300;
}
.category-list {
  &.c1 {
    margin-top: 15px;
    & > li {
      font-size: 16px;
      line-height: 26px;
      cursor: pointer;
      &:not(:first-child) {
        margin-top: 6px;
      }
    }
  }
  &.c2 {
    font-size: 14px;
    color: var(--color-sub-color);
    padding-left: 15px;
  }
  p {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0,0,0,.1);
    }
  }
  & > li {
    &.active {
      p {
        background-color: var(--color-primary);
        color: #fff;
      }
    }
  }
}
</style>
