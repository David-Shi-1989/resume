<template>
  <div id="main">
    <my-header></my-header>
    <div id="main_container" :class="containerClass">
      <router-view />
    </div>
    <backIcon v-if="backBtnRouterName"></backIcon>
    <loading></loading>
  </div>
</template>

<script>
import myHeader from '../components/header.vue'
import { mapGetters } from 'vuex'
import backIcon from '@/components/back-icon'
import loading from '@/components/loading'
import {visit} from 'op/api/op'
import jsCookie from 'js-cookie'
import {Cookie_Visit} from '@/script/constant'

export default {
  name: 'Index',
  components: { myHeader, backIcon, loading },
  computed: {
    ...mapGetters(['backBtnRouterName']),
    containerClass () {
      return {
        'no-padding': this.$route.meta.noPadding === true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.logVisit()
    }, 3000)
  },
  methods: {
    logVisit () {
      if (!jsCookie.get(Cookie_Visit)) {
        visit(this.userId).then(isSuccess => {
          if (isSuccess) {
            let expireDate = new Date()
            expireDate.setHours(expireDate.getHours() + 12)
            jsCookie.set(Cookie_Visit, Date.now().toString(), { expires: expireDate, path: '/'})
          }
        })
      }
    }
  }
}
</script>
