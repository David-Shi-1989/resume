<template>
  <div class="mr-home">
    <IntroducationCard></IntroducationCard>
    <div class="main-card main-layout">
      <!-- <div class="left-col card-shadow"></div> -->
      <div class="right-col card-shadow">
        <career-card></career-card>
        <hr/>
        <EduCard></EduCard>
        <hr />
        <SkillCard></SkillCard>
      </div>
    </div>
  </div>
</template>
<script>
import IntroducationCard from '@/views/home/intro-card'
import CareerCard from '@/views/home/career'
import EduCard from '@/views/home/edu'
import SkillCard from '@/views/home/skill'
export default {
  name: 'Home',
  components: { IntroducationCard, EduCard, SkillCard, CareerCard },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../style/color.less');
@left-col-width: 350px;
@row-gap: 30px;
@title1-width: 20rem;
.main-card {
  margin-top: 80px !important;
  display: flex;
  & > div {
    background-color: #fff;
    border-radius: 20px;
    padding: 25px;
    &.left-col {
      flex: 0 0 @left-col-width;
      margin-right: @row-gap;
    }
    &.right-col {
      width: 100%;
      // width: calc(100% - @left-col-width - @row-gap);
    }
  }
}
hr {
  margin: 30px auto;
  border:none;
  height: 1px;
  border-top: 1px solid #efefef;
}
</style>
