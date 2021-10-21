<template>
  <header>
    <router-link :to="{name:'Index'}" class="login-info">
      <img :src="logo" class="logo-img">
      <p>Shiwang.wang</p>
    </router-link>
    <ul class="right-list">
      <li class="userInfo">
        <span class="iconfont icon-icon"></span>
        <p>{{userName}}</p>
      </li>
      <li class="index" title="首页" @click="toIndexPage"><Icon type="md-home" /></li>
      <li class="logout" title="退出" @click="onLogoutBtn"><span class="iconfont icon-icon4"></span></li>
    </ul>
  </header>
</template>
<script>
import logo from '@/assets/lyman-logo.png'
import userAvatar from 'op/assets/image/user-icon-man.svg'
import {mapGetters, mapActions} from 'vuex'
import {logout} from 'op/api/op.js'
export default {
  data () {
    return {
      logo,
      userAvatar
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['logout']),
    onLogoutBtn () {
      this.$Modal.confirm({
        title: '请确认',
        content: '确认退出当前账号吗？',
        onOk: () => {
          this.$nextTick(() => {
            this.doLogout()
          })
        }
      })
    },
    async doLogout () {
      if (await logout(this.userId)) {
        this.logout()
        this.$router.push({name: 'Login'})
      } else {
        this.$Message.error('退出失败，请重试')
      }
    },
    toIndexPage () {
      this.$router.push({name: 'Index'})
    }
  },
  computed: {
    ...mapGetters(['userName', 'userId'])
  }
}
</script>
<style lang="less" scoped>
@import url('../style/utils.less');
@header-height-gap-h: 20px;
@right-list-height: 30px;
@logo-height: @header-height * 2 / 3;
header {
  height: @header-height;
  background-color: @header-bg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 @header-height-gap-h;
  .login-info {
    height: @logo-height;
    display: flex;
    color:#fff;
    p {
      font-size: 18px;
      margin-left: 10px;
      line-height: @logo-height;
    }
  }
  img {
    &.logo-img {
      height: @logo-height;
    }
    &.avatar-img {
      width: @right-list-height;
    }
  }
  ul.right-list {
    color: #fff;
    display: flex;
    align-items: center;
    height: @header-height;
    & > li {
      min-width: 40px;
      cursor: pointer;
      padding: 0 10px;
      border-radius: 5px;
      opacity: .8;
      &:not(:last-child) {
        margin-right: 30px;
      }
      &:hover {
        background-color: #99999940;
        opacity: 1;
      }
      span.iconfont, i.ivu-icon {
        line-height: @right-list-height;
        font-size: 18px;
      }
      &.userInfo {
        display: flex;
        flex-direction: row;
        span.iconfont {
          margin-right: 5px;
        }
        p {
          line-height: @right-list-height;
          margin-left: 5px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
