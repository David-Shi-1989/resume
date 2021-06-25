<template>
  <div class="explore-me">
    <i class="fa fa-angle-down"></i>
    <span>EXPLORE ME</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import url('../../style/utils.less');
@import url('../../style/animation.less');
.explore-me {
  @icon-size: 20px;
  margin-top: 20px;
  position: relative;
  display: inline-flex;
  .text-cannot-select();
  i {
    display: inline-block;
    width: @icon-size;
    height: @icon-size;
    border-radius: 50%;
    border: 1px solid #8d8d8d;
    color: #8d8d8d;
    text-align: center;
    line-height: @icon-size;
    font-size: 16px;
    margin-right: 15px;
    cursor: pointer;
    transition: all .5s;
    transition-timing-function: cubic-bezier(0.68,-0.55,0.27,1.55);
  }
  span {
    cursor: pointer;
    display: block;
  }
  &::after {
    content: "";
    position: absolute;
    width: 150px;
    height: 1px;
    background-color: @color-border;
    right: -170px;
    top: 10px;
  }
  &:hover {
    i {
      transform: rotate(-90deg);
    }
    span {
      .ant-bounce-right();
    }
  }
}
</style>