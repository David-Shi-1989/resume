<template>
  <div class="sign-up-wrap">
    <div></div>
    <div>
      <img :src="svg" class="right-svg">
      <a-form :model="form" layout="vertical" style="width: 350px;" @submit="handleSubmit">
        <!-- username -->
        <a-form-item field="username" label="Username">
          <a-input v-model="form.username" placeholder="Please enter your username" :rules="rules.username" :validate-trigger="['change','input']">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <!-- password -->
        <a-form-item field="password" label="Password"  :rules="rules.password" :validate-trigger="['change','input']">
          <a-input-password v-model="form.password" placeholder="Please enter your password" @press-enter="handleSubmit">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-button type="primary" html-type="submit">Sign in</a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import svg from './yunyin.svg'
import {login} from 'op/api/op'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      svg,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: 'username is required'},
          {match: /^[a-zA-Z\d]{4,32}$/, message: 'username format invalid'}
        ],
        password: [
          {match: /^[a-zA-Z\d]{4,32}$/, message: 'password format invalid'}
        ]
      },
      disable: false
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    handleSubmit ({ errors }) {
      if (this.disable) {
        return
      }
      if (!errors) {
        this.disable = true
        login(this.form.username, this.form.password).then(userId => {
          if (userId) {
            this.$message.success('登录成功')
            this.userLogin({name: this.form.username, id: userId})
            const me = this
            setTimeout(() => {
              me.$router.push({name: 'Index'})
            }, 1200)
          } else {
            this.disable = false
            this.$message.error('登录失败')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sign-up-wrap {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  & > div {
    &:first-child {
      width: 38.2%;
      background-color: #3f1cb6;
    }
    &:last-child {
      width: 61.8%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
.right-svg {
  width: 220px;
}
</style>
