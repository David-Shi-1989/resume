<template>
  <a class="work-card-wrap" href="javascript:void(0);" @click="onLinkClick">
    <div class="card-img">
      <img class="card-img" :src="img || imgPlaceholder">
    </div>
  </a>
  <p class="text title" style="margin-top:10px;">{{title}}</p>
  <p class="text desc">{{description}}</p>
</template>

<script>
import imgPlaceholder from '@/assets/demo/placeholder.jpg'
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
    link: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imgPlaceholder
    }
  },
  methods: {
    onLinkClick () {
      if (this.type === 0) {
        window.open(this.link, '_blank')
      } else {
        this.$router.push({name: this.link})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.work-card-wrap {
  text-decoration: none;
  .card-img {
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--color-border);
    position: relative;
    cursor: pointer;
    background-color: #ccc;
    img {
      width: 100%;
      transition: transform .3s cubic-bezier(.2,0,.2,1);
      display: block;
    }
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
        transform: scale3d(1.2,1.2,1);
      }
    }
  }
}
.text {
  cursor: text;
  &:hover {
    text-decoration: underline;
  }
  &.title {
    font-weight: bolder;
    font-size: 15px;
    color: var(--color-text-2);
  }
  &.desc {
    font-size: 13px;
    color: var(--color-text-3);
  }
}
</style>
