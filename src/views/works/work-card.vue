<template>
  <a class="work-card-wrap" target="_blank" :href="url">
    <div class="card-img">
      <img :src="img">
    </div>
    <p class="title">{{title}}</p>
    <p class="desc">{{description}}</p>
  </a>
</template>

<script>
import imgPlaceholder from '../../../static/image/demo/placeholder.jpg'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: imgPlaceholder
    },
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
.work-card-wrap {
  .card-img {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border: 1px solid var(--color-border);
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      transition: transform .3s cubic-bezier(.2,0,.2,1);
    }
  }
  .title {
    font-weight: bolder;
    font-size: 15px;
    color: var(--color-title);
    cursor: text;
  }
  .desc {
    font-size: 13px;
    color: var(--color-sub-color);
    cursor: text;
  }
  &:hover {
    .card-img {
      &::after {
        content: "点击查看";
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #fff;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
      }
      img {
        transform: scale3d(1.1,1.1,1);
      }
    }
  }
}
</style>
