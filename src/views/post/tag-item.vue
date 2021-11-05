<template>
  <ul :class="wrapClass">
    <li v-for="(tag,idx) in list" :key="idx" :title="tag.title"
      :style="style" :class="tagClass(tag)"
      @click="onItemClick(tag)">{{tag.title}}</li>
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
    },
    width: {
      type: Number,
      default: 0
    },
    selectable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectList: []
    }
  },
  computed: {
    wrapClass () {
      const list = ['post-tag-list', 'size-' + this.size, 'wrap-' + (this.wrap ? 'y' : 'n')]
      if (this.selectable && this.selectList.length > 0) {
        list.push('is-select-ing')
      }
      return list
    },
    style () {
      const style = {}
      if (this.width > 0) {
        style.width = this.width + 'px'
      }
      return style
    }
  },
  methods: {
    onItemClick (tag) {
      if (this.selectable) {
        if (this.selectList.includes(tag.id)) {
          this.selectList = this.selectList.filter(id => id !== tag.id)
        } else {
          this.selectList.push(tag.id)
        }
      }
      this.$emit('onTagClick', tag)
    },
    tagClass (tag) {
      let classList = []
      if (this.selectable && this.selectList.includes(tag.id)) {
        classList.push('select-active')
      }
      return classList
    },
    stopSelect () {
      this.selectList = []
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/color.less');
.post-tag-list {
  display: flex;
  & > li {
    @bg: rgb(242,243,245);
    color: rgb(29,33,41);
    background-color: @bg;
    border: 1px solid darken(@bg, 5%);
    border-radius: 2px;
    cursor: pointer;
    padding: 0 8px;
    transition: all .2s;
  }
  &.size-default {
    & > li {
      font-size: 12px;
      padding: 0 8px;
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
  &.is-select-ing {
    & > li:not(.select-active) {
      opacity: .4;
    }
  }
}
</style>
