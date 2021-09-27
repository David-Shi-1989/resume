<template>
  <div id="login" class="d-flex align-center">
    <Card style="width:350px">
      <h3 slot="title">欢迎登录答题后台系统</h3>
      <Form :model="form" ref="form" :label-width="60">
        <FormItem label="账号" prop="username" required>
          <i-Input :autofocus="focusUsername" v-model="form.username" placeholder="用户名"  :maxlength="32"></i-Input>
        </FormItem>
        <FormItem label="密码" prop="password" required>
          <i-Input :autofocus="!focusUsername" type="password" v-model="form.password" placeholder="密码" :maxlength="64" @on-enter="onLoginBtn"></i-Input>
        </FormItem>
      </Form>
      <div>
        <!-- <div class="d-flex align-end">
          <router-link to="{name:'FindPsw'}">找回密码</router-link>
        </div> -->
        <Button type="primary" style="width: 100%;margin-top:15px;" @click="onLoginBtn">登录</Button>
      </div>
    </Card>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {login} from 'op/api/op.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this.form.username = this.userName || ''
  },
  methods: {
    ...mapActions(['userLogin']),
    isFormValid () {
      const formRef = this.$refs.form
      return new Promise((resolve) => {
        formRef.validate(isValid => {
          resolve(!!isValid)
        })
      })
    },
    async onLoginBtn () {
      if (await this.isFormValid()) {
        const userId = await login(this.form.username, this.form.password)
        if (userId) {
          this.$Message.success('登录成功')
          this.userLogin({name: this.form.username, id: userId})
          const me = this
          setTimeout(() => {
            me.$router.push({name: 'Index'})
          }, 1200)
        } else {
          this.$Message.error('登录失败，请检查用户名和密码。')
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userName']),
    focusUsername () {
      return !this.form.username
    }
  }
}
</script>
<style>
#login {
  height: 100%;
  background-image: url('../assets/image/pexels-johannes-plenio-1103970.jpg');
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
