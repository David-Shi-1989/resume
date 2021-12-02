<template>
  <div class="skill-wrap">
    <h2>技能清单</h2>
    <ul>
      <li v-for="logo in list" :key="logo.title">
        <flipLogo :bgImg="logo.img"></flipLogo>
        <p>{{logo.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import flipLogo from '@/views/works/list/base-logo'
import vuejsLogo from '@/assets/logo/vuejs.png'
import nodejsLogo from '@/assets/logo/nodejs.png'
import sassLogo from '@/assets/logo/sass.png'
import webpackLogo from '@/assets/logo/webpack.png'
import typescriptLogo from '@/assets/logo/typescript.png'
import psLogo from '@/assets/logo/photoshop.png'
import lessLogo from '@/assets/logo/less.png'

export default {
  components: {flipLogo},
  data () {
    return {
      iconSize: 38,
      list: [
        {title: 'VueJS', img: vuejsLogo},
        {title: 'NodeJS', img: nodejsLogo},
        {title: 'SASS', img: sassLogo},
        {title: 'Webpack', img: webpackLogo},
        {title: 'TypeScript', img: typescriptLogo},
        {title: 'PhotoShop', img: psLogo},
        {title: 'LESS', img: lessLogo},
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./home.less');
.skill-wrap{
  ul {
    background-color: var(--color-bg);
    padding: 15px 30px;
    display: flex;
    list-style: none;
    & > li {
      text-align: center;
      &:not(:last-child) {
        margin-right: 40px;
      }
      svg {
        cursor: pointer;
      }
      p {
        font-size: 12px;
        color: var(--color-sub-color);
        display: none;
      }
    }
  }
}
</style>
