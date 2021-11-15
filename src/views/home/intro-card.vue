<template>
  <div class="intro-card-wrap">
    <div class="intro-card main-layout card-shadow">
      <div class="avatar ant-rise-up" :style="{backgroundImage: `url('${avatar}')`}"></div>
      <div class="info-cols">
        <div class="name-col">
          <h4 class="name text">Lyman Shi</h4>
          <p class="role text">Front End Engineer</p>
        </div>
        <div class="contact-col">
          <div>
            <p class="title text">email</p>
            <p class="val text">hssww1989@gmail.com</p>
          </div>
          <div>
            <p class="title text">Birthday</p>
            <p class="val text">29 August,1989</p>
          </div>
          <div>
            <p class="title text">Phone</p>
            <p class="val text">+(86)15821850559</p>
          </div>
          <div>
            <p class="title text">Location</p>
            <p class="val text">Hefei,CN</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/main-photo.svg'
export default {
  data () {
    return {
      avatar
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./home.less');
@padding-h: 150px;
@card-height: 150px;
@avatar-size: 140px;
@avatar-border-size: 8px;
.intro-card-wrap {
  position: relative;
  transition: box-shadow .3s ease-in-out;
  height: 260px;
  background-image: url('../../assets/image_header.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  transition: all 1s;
  &:hover {
    background-size: 120%;
  }
}
.intro-card {
  background-color: #fff;
  border-radius: 20px;
  transform: translateY(100%);
  padding: 20px 50px;
  height: @card-height;
  display: flex;
  .avatar {
    flex: 0 0 @avatar-size;
    height: @avatar-size;
    background-size: calc(100% + @avatar-border-size), calc(100% + @avatar-border-size);
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 40px;
    border: @avatar-border-size solid #fff;
    box-shadow: 0 0 8px #CCC;
  }
  .info-cols {
    flex: 1 1 100%;
    display: flex;
    padding: 0 30px;
    & > div {
      flex: 1 1 50%;
      &:not(:first-child) {
        padding-left: 80px;
        border-left: 1px solid #EBF0F2;
      }
      &.contact-col {
        display: flex;
        flex-wrap: wrap;
        & > div {
          width: 50%;
          height: 55px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}
.ant-rise-up {
  animation: ant-kf-rise-up .9s alternate forwards;
}
@keyframes ant-kf-rise-up {
  0% {
    transform: translateY(@avatar-border-size * -2);
    opacity: .1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-40%);
    opacity: 1;
  }
}
</style>
