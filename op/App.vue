<template>
  <div id="app">
    <router-view/>
    <loading v-if="showLoading"></loading>
  </div>
</template>
<script>
import loading from 'op/components/loading.vue'
import {mapGetters} from 'vuex'
export default {
  components: {loading},
  data () {
    return {}
  },
  created () {
  },
  computed: {
    ...mapGetters(['showLoading'])
  }
}
</script>
<style>

</style>
