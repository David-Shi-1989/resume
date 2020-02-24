<template>
  <ul :title="this.value">
    <li v-for="i in max" :key="i">
      <i :class="['fa', getStartClass(i)]"></i>
    </li>
    <li>{{this.value}}</li>
  </ul>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    }
  },
  methods: {
    getStartClass (i) {
      const curValue = i
      let className = ''
      if (this.value >= curValue) {
        className = 'fa-star'
      } else if (this.value >= (curValue - 0.5)) {
        className = 'fa-star-half-full'
      } else {
        className = 'fa-star-o'
      }
      return className
    }
  }
}
</script>

<style lang="less" scoped>
@star-color: rgb(255, 215, 0);
ul {
  list-style: none;
  display: flex;
  & > li {
    i {
    color: @star-color;
    }
    &:not(:last-child) {
      margin-right: .1rem;
    }
    &:last-child {
      margin-left: 1rem;
    }
  }
}
</style>
