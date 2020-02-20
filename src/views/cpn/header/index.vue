<template>
  <div :class="{'mr-header':true,'mr-header-border':hasBorder}">
    <div><headerMenu></headerMenu></div>
    <div>
      <Dropdown trigger="click" @on-click="onLangChange">
        <a href="javascript:void(0)" class="mr-dp-text">
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
    border-bottom: .05rem solid @color-border;
    box-shadow: 0px 0px .1rem #ddd;
  }
  & > div {
    width: 50%;
    height: 100%;
    &:last-child {
      height: @header-height;
      line-height: @header-height;
      padding: 0 1rem;
      display: flex;
      justify-content: flex-end;
    }
  }
  .ivu-dropdown .mr-dp-text {
    color: @color-sub-color;
  }
}
</style>
