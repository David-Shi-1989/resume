import { createApp } from 'vue'
import Confirm from './main.vue'

const defaultConfig = {
  visible: true,
  title: '请确认',
  message: '',
  ok: null,
  cancel: null,
  close: null
}

export default (options) => {
  const ConfirmConstructor = createApp({
    render (h) {
      return h(Confirm, Object.assign({}, defaultConfig, options))
    }
  })
  ConfirmConstructor.mount('body')
}