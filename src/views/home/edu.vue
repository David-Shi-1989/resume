<template>
  <div class="edu-wrap">
    <h2>教育经历</h2>
    <ul>
      <li>
        <div>
          <h4>中国科学技术大学</h4>
          <p class="school-en">University Of Science and Technology of China</p>
        </div>
        <div>
          <p>2012 - 2015</p>
          <p>软件工程</p>
        </div>
      </li>
      <li>
        <div>
          <h4>东北大学</h4>
          <p class="school-en">University Of Science and Technology of China</p>
        </div>
        <div>
          <p>2008 - 2012</p>
          <p>测控技术与仪器</p>
        </div>
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
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 2px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      & > div {
        &:last-child {
          width: 150px;
          text-align: center;
          color: #5E6E80;
        }
        p.school-en {
          color: var(--color-text-sub);
        }
      }
      &:hover {
        background-color: var(--color-bg);
      }
    }
  }
}
</style>
