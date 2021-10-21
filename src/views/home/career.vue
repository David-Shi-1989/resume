<template>
  <div>
    <h2>就职经历</h2>
    <Carousel :count="4">
      <div v-for="(item,idx) in careerList " :slot="'card'+(idx+1)" :key="idx" class="career-card">
        <img :src="item.logo">
        <div class="company-name">
          <h4>{{item.companyNameCn}}</h4>
          <p>{{item.companyNameEn}}</p>
        </div>
        <ul>
          <li>
            <p class="text title">City</p>
            <p class="text val">{{item.city}}</p>
          </li>
          <li>
            <p class="text title">Duration</p>
            <p class="text val">{{item.duration}}</p>
          </li>
          <li>
            <p class="text title">Position</p>
            <p class="text val">{{item.position}}</p>
          </li>
          <li>
            <p class="text title">Department</p>
            <p class="text val">{{item.department}}</p>
          </li>
        </ul>
      </div>
    </Carousel>
  </div>
</template>

<script>
import Carousel from '@/components/switch-card'
import zoomLogo from '@/assets/zoom-logo-ori.png'
import h3cLogo from '@/assets/h3c-logo-ori.png'
import kodakLogo from '@/assets/kodak-logo-ori.png'
import arcuLogo from '@/assets/arcu-logo-ori.png'
export default {
  components: {Carousel},
  data () {
    return {
      zoomLogo,
      h3cLogo,
      kodakLogo,
      arcuLogo,
      careerList: [
        {
          logo: zoomLogo,
          companyNameEn: 'Zoom Video Communications, Inc',
          companyNameCn: '软视软件（合肥）有限公司',
          city: 'Hefei',
          duration: '2021/2/1 - Now',
          position: 'Senior Front End Engineer',
          department: 'Billing'
        },
        {
          logo: h3cLogo,
          companyNameEn: 'New H3C Technologies Co., Ltd',
          companyNameCn: '新华三信息安全技术有限公司',
          city: 'Hefei',
          duration: '2017/6/15 - 2021/1/31',
          position: 'Senior Front End Engineer',
          department: 'Cloud Security'
        },
        {
          logo: arcuLogo,
          companyNameEn: 'ARCU',
          companyNameCn: '安徽农村商业银行',
          city: 'Hefei',
          duration: '2016/8/15 - 207/6/1',
          position: 'Senior Front End Engineer',
          department: 'IT'
        },
        {
          logo: kodakLogo,
          companyNameEn: 'Kodak',
          companyNameCn: '柯达（中国）投资有限公司',
          city: 'Shanghai',
          duration: '2013/7/11 - 2016/8/1',
          position: 'Software Engineer',
          department: 'Production Develop Center'
        }
      ]
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./home.less');
h3 {
  margin-bottom: 10px;
}
.career-card {
  display: flex;
  align-items: center;
  img {
    margin-right: 30px;
  }
  .company-name {
    flex: 0 0 250px;
  }
  h4 {
    font-size: 16px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1 1 100%;
    & > li {
      flex: 1 1 50%;
      height: 55px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
