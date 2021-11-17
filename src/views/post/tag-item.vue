<template>
  <ul :class="wrapClass">
    <li v-for="(tag,idx) in list" :key="idx" :title="tag.title"
      :style="style" :class="tagClass(tag)"
      @click="onItemClick(tag)">
        <a-tag :size="size" :color="tagColor(tag)">
          <template #icon v-if="hasIcon">
            <icon-tag />
          </template>
          {{tag.title}}
        </a-tag>
    </li>
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
      default: 'small',
      validator: size => ['default', 'large', 'small', 'mini'].includes(size)
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
    },
    hasMarginBottom: {
      type: Boolean,
      default: false
    },
    hasIcon: {
      type: Boolean,
      default: true
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
    },
    tagColor (tag) {
      if (this.selectable && this.selectList.length > 0) {
        return this.selectList.includes(tag.id) ? 'arcoblue' : 'gray'
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/color.less');
.post-tag-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  & > li {
    cursor: pointer;
    margin-bottom: 5px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
<style scoped>
.post-tag-list > li >>> span.arco-tag {
  width: 100%;
}
</style>
