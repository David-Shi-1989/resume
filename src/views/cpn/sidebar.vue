<template>
  <div class="mr-sidebar">
    <div>
      <div class="mr-avatar"></div>
      <p class="mr-name">{{$t('myName')}}</p>
      <p class="mr-position">{{$t('myPosition')}}</p>
      <ul class="mr-contact-ul">
        <li>
          <Icon type="ios-mail" />
          <span>sa612250@mail.ustc.edu.cn</span>
        </li>
        <li>
          <i class="fa fa-map-marker"></i>
          <span>{{$t('myPlace')}}</span>
        </li>
        <li>
          <i class="fa fa-phone"></i>
          <span>+86-15821850559</span>
        </li>
        <li>
          <i class="fa fa-birthday-cake"></i>
          <span>1989/08/29</span>
        </li>
        <li>
          <i class="fa fa-heart"></i>
          <span>{{$t('marrige')}}</span>
        </li>
      </ul>
    </div>
    <div>
      <ul class="mr-link-list">
        <li>
          <a href="https://github.com/David-Shi-1989" target="_blank"><Icon type="logo-github" /></a>
        </li>
        <li>
          <a href="https://weibo.com/davidshi1989" target="_blank"><i class="fa fa-weibo"></i></a>
        </li>
        <li>
          <a href="/static/image/wechat-code.jpg" target="_blank"><i class="fa fa-wechat"></i></a>
        </li>
        <li>
          <a href="https://segmentfault.com/u/davidshi" target="_blank"><i class="fa fa-wordpress"></i></a>
        </li>
      </ul>
      <p class="mr-copyright">
        <i class="fa fa-copyright"></i> 2020 shiwang.wang<br/>All Rights Reserved.<br/>
        备案/许可证编号：<br/>
        <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备19022141号</a>
      </p>
    </div>
    <div class="mr-sidebar-bg"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.mr-sidebar {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  border-radius: .2rem;
  position: relative;
  display: grid;
  grid-template-rows: auto 5rem;
  overflow: hidden;
  box-sizing: border-box;
  & > div:not(.mr-sidebar-bg) {
    position: relative;
    z-index: 100;
    &:first-child {
      padding: 2rem .6rem;
    }
  }
  .mr-avatar {
    display: block;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .05rem solid #ccc;
    margin: 0 auto;
    background-image: url('../../assets/avatar.jpg');
    background-repeat: no-repeat;
    background-size: 90% auto;
    background-position-y: 140%;
    background-position-x: 70%;
    transition: all .2s;
    background-color: #fff;
    &:hover {
      background-position-y: 90%;
    }
  }
  p {
    text-align: center;
    &.mr-name {
      font-size: 1rem;
      font-weight: bolder;
      height: 2rem;
      line-height: 2rem;
      color: var(--color-text-title);
    }
    &.mr-position {
      font-size: .7rem;
      height: 1rem;
      line-height: 1rem;
      color: var(--color-text-content);
    }
  }
  ul.mr-contact-ul {
    list-style: none;
    margin: 2rem auto;
    color: var(--color-text-content);
    & > li {
      display: flex;
      @item-height: 1.5rem;
      height: @item-height;
      line-height: @item-height;
      &:not(:last-child) {
        border-bottom: .05rem solid var(--color-border);
      }
      i {
        display: block;
        text-align: center;
        width: 1.2rem;
        height: @item-height;
        line-height: @item-height;
        font-size: .75rem;
        color: var(--color-text-sub);
        margin-right: .2rem;
      }
      span {
        display: block;
        font-size: .65rem;
        color: var(--color-text-content);
      }
    }
  }
  ul.mr-link-list {
    list-style: none;
    display: flex;
    width: 8rem;
    margin: 0 auto .3rem auto;
    & > li {
      width: 2rem;
      text-align: center;
      opacity: .6;
      transition: opacity .2s;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  .mr-copyright {
    font-size: .5rem;
    text-align: center;
    padding: 0 .5rem;
    height: .7rem;
    line-height: .7rem;
    color: var(--color-text-sub);
  }
  & > div.mr-sidebar-bg {
    position: absolute;
    z-index: 90;
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;
  }
}
</style>
