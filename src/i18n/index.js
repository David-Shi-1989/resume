import Vue from 'vue'
import VueI18N from 'vue-i18n'
import storex from '../store'
import { cn, en } from './lang'

Vue.use(VueI18N)
const lang = storex.getters.getLang
const messages = {
  zhCN: cn,
  enUS: en
}
export default new VueI18N({
  locale: lang,
  messages,
  silentTranslationWarn: true
})
