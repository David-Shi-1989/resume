<template>
  <ul :class="wrapClass">
    <li v-for="(tag,idx) in list" :key="idx">{{tag.title}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'default',
      validator: size => ['default', 'large'].includes(size)
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    wrapClass () {
      return ['post-tag-list', 'size-' + this.size, 'wrap-' + (this.wrap ? 'y' : 'n')]
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/color.less');
.post-tag-list {
  display: flex;
  & > li {
    @bg: @color-menu-bg;
    border: 1px solid @bg;
    color: @bg;
    border-radius: 6px;
    cursor: pointer;
    transition: all .2s;
    &:hover {
      background-color: lighten(@bg, 5%);
      color: #fff;
    }
    
  }
  &.size-default {
    & > li {
      font-size: 12px;
      padding: 0 6px;
      &:not(:last-child) {
        margin-right: 6px;
      }
    }
  }
  &.size-large {
    & > li {
      font-size: 14px;
      padding: 2px 10px;
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
  &.wrap-y {
    flex-wrap: wrap;
    & > li {
      margin-bottom: 10px;
    }
  }
  &.wrap-n {
    flex-wrap: nowrap;
  }
}
</style>
