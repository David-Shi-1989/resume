<template>
  <div class="intro-card-wrap">
    <div class="intro-card">
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
@padding-h: 150px;
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
  box-shadow: 0 20px 40px rgb(103 118 128 / 3%);
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  width: calc(100% - @padding-h * 2);
  left: @padding-h;
  padding: 20px 50px;
  height: 180px;
  display: flex;
  .avatar {
    @size: 160px;
    @border-size: 8px;
    flex: 0 0 @size;
    height: @size;
    background-size: calc(100% + @border-size), calc(100% + @border-size);
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 40px;
    border: @border-size solid #fff;
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
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .text {
        font-family: 'Poppins',sans-serif !important;
        &.name {
          font-size: 1.5rem;
        }
        &.role {
          color: var(--color-sub-color);
        }
        &.title {
          text-transform: Uppercase;
          color: rgba(94,110,128,0.8);
          font-size: .55rem;
        }
        &.val {
          color: #5E6E80;
          font-size: .7rem;
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
    transform: translateY(0);
    opacity: .1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-30%);
    opacity: 1;
  }
}
</style>