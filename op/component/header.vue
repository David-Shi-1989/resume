<template>
  <a-layout-header class="header-wrap">
    <div>
      <a-button shape="round" @click="onBackBtn" title="Back">
        <icon-left />
      </a-button>
    </div>
    <a-space size="large" class="header-btn-right">
      <icon-user :style="{fontSize: '20px'}" :stroke-width="3" />
      <icon-skin :style="{fontSize: '20px'}" :stroke-width="3" />
      <icon-poweroff :style="{fontSize: '20px'}" :stroke-width="3" @click="onSignOutBtn"/>
    </a-space>
  </a-layout-header>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { Message } from "@arco-design/web-vue"
import { logout } from 'op/api/op'
export default {
  name: 'Header',
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    ...mapMutations(['setSidebarCollapsed']),
    ...mapActions(['logout']),
    onSignOutBtn () {
      this.$modal.confirm({
        title: '请确认',
        content: '确认退出当前帐号吗?',
        modalClass: 'confirm-modal',
        onOk: () => {
          logout().then(isSuccess => {
            if (isSuccess) {
              Message.success('退出成功')
              setTimeout(() => {
                this.logout()
                this.$router.push({name: 'SignUp'})
              }, 1200)
            } else {
              Message.error('退出失败')
            }
          })
        }
      })
    },
    onBackBtn () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-btn-right {
    @icon-size: 40px;
    :deep(.arco-space-item) {
      height: @icon-size;
      width: @icon-size;
      line-height: @icon-size;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      &:hover {
        background-color: var(--color-fill-2);
      }
    }
  }
}
</style>
