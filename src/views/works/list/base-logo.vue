<template>
  <div class="logo-flip">
    <div :class="{'figure-list':true, 'fliped': isFlip,'direction-v':isDirectionVertical,'direction-h':!isDirectionVertical}"
      @mouseenter="isFlip=true" @mouseleave="isFlip=false">
      <figure class="front" :style="bgStyle"></figure>
      <figure class="back" :style="bgStyle"></figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgImg: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'h'
    }
  },
  data () {
    return {
      isFlip: false
    }
  },
  computed: {
    isDirectionVertical () {
      return this.direction.toLowerCase() === 'v'
    },
    bgStyle () {
      return {
        backgroundImage: `url('${this.bgImg}')`
      }
    }
  }
}
</script>

<style lang="less" scoped>
@card-width: 100px;
@card-height: 50px;
.logo-flip {
  width: @card-width;
  height: @card-height;
  perspective: 900px;
  & > .figure-list {
    width: @card-width;
    height: @card-height;
    position: relative;
    transition: transform .5s;
    transform-style: preserve-3d;
    &.direction-h {
      &.fliped {
        transform: rotateY(180deg);
      }
      figure.back {
        transform: rotateY(180deg);
      }
    }
    &.direction-v {
      &.fliped {
        transform: rotateX(180deg);
      }
      figure.back {
        transform: rotateX(180deg);
      }
    }
    & > figure {
      width: @card-width;
      height: @card-height;
      position: absolute;
      top: 0;
      left: 0;
      backface-visibility: hidden;
      // background-image: url('../../../assets/demo/vue-js-logo.png');
      background-repeat: no-repeat;
      background-size: 100%;
      cursor: pointer;
      &.front {
        background-position: 0 0;
      }
      &.back {
        background-position: 0 @card-height * -1;
      }
    }
  }
}
</style>
