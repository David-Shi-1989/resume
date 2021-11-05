<template>
  <div class="ss-wrap">
    <ul>
      <li>
        
      </li>
      <li>
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./home.less');
.edu-wrap{
  ul {
    & > li {
      display: flex;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      & > div {
        &:last-child {
          width: 150px;
          text-align: center;
        }
        p.school-en {
          color: var(--color-text-sub);
        }
      }
    }
  }
}
</style>
