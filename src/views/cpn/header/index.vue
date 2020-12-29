<template>
  <div :class="{'mr-header':true,'mr-header-border':hasBorder}">
    <div><headerMenu></headerMenu></div>
    <div>
      <!--语言-->
      <Dropdown trigger="click" @on-click="onLangChange">
        <a href="javascript:void(0)" class="mr-dp-text" v-color="MIXIN_ColorObj.textContent">
          {{getLangStr}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem :selected="$store.getters.getLang=='zhCN'" name="zhCN">{{$t('lang_cn')}}</DropdownItem>
          <DropdownItem :selected="$store.getters.getLang=='enUS'" name="enUS">{{$t('lang_en')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <!--主题-->
      <Dropdown trigger="click" @on-click="onThemeChange">
        <a href="javascript:void(0)" class="mr-dp-text" v-color="MIXIN_ColorObj.textContent">
          {{getThemeName}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem v-for="theme in $store.getters.getThemeList" :key="theme.name"
            :selected="$store.getters.getTheme==theme.name" :name="theme.name">
            <span>{{theme.name}}</span>
            <i class="mr-dot" :style="{background: theme.color,marginLeft:'.5rem'}"></i>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import headerMenu from './header-menu'
export default {
  props: {
    hasBorder: {
      type: Boolean,
      default: false
    }
  },
  components: {
    headerMenu
  },
  methods: {
    onLangChange (key) {
      this.$store.commit('setLang', key)
    },
    onThemeChange (key) {
      this.$store.commit('setTheme', key)
    }
  },
  computed: {
    getLangStr () {
      const curLang = this.$store.getters.getLang
      if (curLang === 'enUS') {
        return this.$i18n.t('langEn')
      } else if (curLang === 'zhCN') {
        return this.$i18n.t('langCn')
      } else {
        return 'Null'
      }
    },
    getThemeName () {
      const curTheme = String(this.$store.getters.getTheme).toLowerCase()
      if (curTheme === 'light') {
        return this.$i18n.t('themeLight')
      } else if (curTheme === 'dark') {
        return this.$i18n.t('themeDark')
      } else {
        return 'NULL'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/color.less');
@header-height: 1.5rem;
.mr-header {
  padding: 1rem 1.5rem;
  display: flex;
  &.mr-header-border {
    box-shadow: 0px 0px .1rem #ddd;
  }
  & > div {
    width: 50%;
    height: 100%;
    // 右侧
    &:last-child {
      height: @header-height;
      line-height: @header-height;
      padding: 0 1rem;
      display: flex;
      justify-content: flex-end;
      & > div {
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
  }
  .ivu-dropdown .mr-dp-text {
    color: var(--color-text-sub);
  }
}
</style>
