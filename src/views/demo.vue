<template>
  <div class="mr-demo-wrap">
    <ul>
      <li v-for="(item,idx) in list" :key="idx">
        <div class="mr-d-img" :style="{backgroundImage: `url(${item.img})`}"></div>
        <p class="mr-d-t">{{item.title}}</p>
        <div class="mr-d-score"><starScore v-model="item.score" align="right"></starScore></div>
        <p class="mr-d-d">{{item.description}}</p>
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
      list: [
        {
          title: '快速排序算法动画演示',
          img: '../static/image/demo1.jpg',
          score: 3.5,
          description: '这是对此篇的描述。这是对此篇的描述。这是对此篇的描述。这是对此篇的描述。这是对此篇的描述。这是对此篇的描述。'
        },
        {
          title: '自动灯光秀排练系统',
          img: '../static/image/demo2.jpg',
          score: 4,
          description: '这是对此篇的描述。'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../style/color.less');
@title-height: 1.5rem;
.mr-demo-wrap {
  & > ul {
    list-style: none;
    display: flex;
    & > li {
      display: grid;
      width: 15rem;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 8rem @title-height 3.5rem;
      grid-template-areas:
        "img img"
        "title score"
        "des des";
      border: .05rem solid @color-border;
      transition: all .4s;
      &:hover {
        border-color: #f40;
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
      & > div.mr-d-img {
        grid-area: img;
        background-size: cover;
      }
      & > p.mr-d-t {
        grid-area: title;
        padding-left: .2rem;
        height: @title-height;
        line-height: @title-height;
        font-weight: bolder;
      }
      & > div.mr-d-score {
        grid-area: score;
        padding-right: .2rem;
        height: @title-height;
        line-height: @title-height;
      }
      & > p.mr-d-d {
        grid-area: des;
        padding: 0 .2rem;
        color: @color-sub-color;
        overflow: hidden;
        flex-wrap: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
