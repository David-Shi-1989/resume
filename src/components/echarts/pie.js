import Vue from 'vue'
import echartsTpl from './index'

export default Vue.extend({
  mixins: [echartsTpl],
  data () {
    return {
      type: 'Pie'
    }
  },
  created () {
    console.log('pie\'s created')
  }
})
