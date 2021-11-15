<template>
  <div>
    <div id="customers-testimonials" class="owl-carousel">
      <div v-for="idx in count" :key="'card_' + idx" class="item">
        <slot :name="'card'+idx"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import './owl.carousel.min.js'
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    $('#customers-testimonials').owlCarousel({
      loop: true,
      center: true,
      items: 3,
      margin: 0,
      autoplay: false,
      dots: true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1170: {
          items: 3
        }
      }
    })
  }
}
</script>

<style lang="less">
@import url('./style.less');
@import url('./owl.carousel.min.css');
</style>
