<template>
  <a-layout class="layout-demo">
    <Sidebar></Sidebar>
    <a-layout>
      <Header></Header>
      <a-layout style="padding: 0 24px">
        <BreadCrumb></BreadCrumb>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <Loading v-if="loading"></Loading>
  </a-layout>
</template>
<script>
import { defineComponent } from "vue"
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from "@arco-design/web-vue/es/icon"
import Sidebar from '../component/sidebar.vue'
import Header from '../component/header.vue'
import BreadCrumb from '../component/bread-crumb.vue'
import Loading from 'op/component/loading'
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Index',
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
    Sidebar,
    Header,
    BreadCrumb,
    Loading
  },
  computed: {
    ...mapGetters(['loading'])
  }
});
</script>
<style lang="less" scoped>
@import url('../../src/style/utils.less');
.layout-demo {
  height: 100%;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
  :deep(.arco-layout-sider) .logo {
    height: 32px;
    margin: 12px 8px;
    background: rgba(255, 255, 255, 0.2);
  }
  :deep(.arco-layout-header) {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
  }
  :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
  }
  :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
  }
  :deep(.arco-layout-footer), :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    color: var(--color-text-2);
    font-size: 16px;
    font-stretch: condensed;
  }
}
</style>
