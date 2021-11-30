<template>
  <div class="size-full p-relative">
    <swiper class="swiper-wrap" :container="options.container" :init="dataIsReady" :direction="options.direction"
      :autoplay="true" :delay="5000" :mousewheel="true"
      :pagination="options.pagination" slidesPerView="auto"
      :spaceBetween="20">
      <swiper-slide v-for="mes in list" :key="mes.id">
        <div>
          <a-comment :author="mes.name" :datetime="mes.datetime" align="right">
            <template #avatar>
              <a-avatar :size="24" shape="square" :style="{ backgroundColor: '#3370ff' }">
                <img alt="avatar" :src="mes.avatar"/>
              </a-avatar>
            </template>
            <template #content>
              <div class="message-content">{{mes.content}}</div>
            </template>
          </a-comment>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {dashMessageStatistic} from 'op/api/op'
import SwiperCore, { Pagination, Autoplay, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
SwiperCore.use([Pagination, Autoplay, Mousewheel])

export default {
  components: {Swiper, SwiperSlide},
  data () {
    return {
      options: {
        container: '.size-full.p-relative',
        direction: 'vertical', // horizontal, vertical
        pagination: {
          clickable: true
        }
      },
      list: [],
      dataIsReady: false
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      dashMessageStatistic().then(res => {
        this.list = res
        this.$nextTick(() => {
          this.dataIsReady = true
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-wrap {
  height: 100%;
  padding-bottom: 20px;
  :deep(.swiper-wrapper) {
    & > .swiper-slide {
      padding: 5px 30px 5px 10px;
      height: auto;
      .message-content {
        background-color: #f2f2f7;
        padding: 6px 12px;
        border-radius: 5px;
      }
    }
  }
}
</style>
