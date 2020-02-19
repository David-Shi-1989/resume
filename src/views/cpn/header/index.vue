<template>
  <div class="mr-header">
    <div><headerMenu></headerMenu></div>
    <div>
      <Dropdown trigger="click" @on-click="onLangChange">
        <a href="javascript:void(0)">
          {{$t('language')}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem :selected="$store.getters.getLang=='zhCN'" name="zhCN">{{$t('lang_cn')}}</DropdownItem>
          <DropdownItem :selected="$store.getters.getLang=='enUS'" name="enUS">{{$t('lang_en')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import headerMenu from './header-menu'
export default {
  components: {
    headerMenu
  },
  methods: {
    onLangChange (key) {
      this.$store.commit('setLang', key)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../style/color.less');
@header-height: 1.5rem;
.mr-header {
  padding: 1rem 0;
  display: flex;
  & > div {
    width: 50%;
    height: 100%;
    &:last-child {
      height: @header-height;
      line-height: @header-height;
      background-color:antiquewhite;
      padding: 0 1rem;
    }
  }
}
</style>
