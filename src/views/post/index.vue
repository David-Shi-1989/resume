<template>
  <div class="main-layout">
    <div class="list-container">
      <div class="post-bar">
        <div><span>{{list.length}}</span>篇文章</div>
        <div><span>9</span>个标签</div>
      </div>
      <ul class="post-list">
        <li v-for="(post,idx) in list" :key="idx">
          <h2 @click="toItemPage(post.id)">{{post.title}}</h2>
          <p class="content" @click="toItemPage(post.id)">{{post.content}}</p>
          <div class="info-row">
            <p>{{post.datetime}}</p>
            <template v-if="post.tags">
              <tagList style="margin-left:30px;" :list="post.tags"></tagList>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="tag-container">
      <p>标签:</p>
      <tagList :list="tagList" :wrap="true" size="large" style="margin-top: 10px;"></tagList>
    </div>
  </div>
</template>

<script>
import tagList from './tag-item.vue'
export default {
  data () {
    return {
      list: [
        {
          id: '001',
          title: 'Spring拓展点',
          content: '前言  Spring的核心思想就是容器，当容器refresh的时候内部进行了一堆的操作，并提供了一堆拓展点，Springboot更是封装了Spring，在启动前进行了约定的配置。  这篇文章总结了几乎Spring&Springboot所有的扩展接口，以及各个扩展点的使用场景。拓展点Sprin',
          datetime: '2021/09/04 14:22:04',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'spring整合dubbo源代码总结',
          content: 'Dubbo是一款高性能、轻量级的开源JavaRPC框架，它提供了三大核心能力：面向接口的远程方法调用，智能容错和负载均衡，以及服务自动注册和发现。本文主要是通过Spring中Dubbo的加载过程来介绍下Dubbo的几个比较重要的类DubboApplicationContextInitializer（',
          datetime: '2021/09/01 21:08:54',
          tags: ['Spring', 'Java', 'dubbo']
        },
        {
          id: '001',
          title: '锁',
          content: 'jvm锁由于jvm锁的介绍实在太多，贴一个比较清晰的帖子https://blog.csdn.net/csdnnews/article/details/104471154/synchronized锁synchronized关键字是一把经典的锁，也是我们平时用得最多的。在JDK1.6之前，syncron',
          datetime: '2021/08/29 13:47:29',
          tags: ['Spring', 'Java', '高并发']
        },
        {
          id: '001',
          title: 'Spring对象创建过程',
          content: '理解概念对象创建过程并不难理解，主要的难点是几个概念上的问题。首先观察该方法中用到的该类的几个参数。单例对象缓存池/**Cacheofsingletonobjects:beanname-->beaninstance*/privatefinalMap<String,Object>si',
          datetime: '2021/08/07 10:30:36',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25'
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
        {
          id: '001',
          title: 'SpringCloud之配置初始化和刷新',
          content: '在SpringCloud中，当配置变更时，我们通过访问/refresh路径，可以在不启动服务的情况下获取最新的配置，那么它是如何做到的呢，我们可以通过源码来看看SpringCloud如何做到的。Endpoint刷新我们通过链接入口找到方法的入口的EndpointRefreshEndpoint@End',
          datetime: '2021/07/29 15:21:25',
          tags: ['Spring', 'Java']
        },
      ]
    }
  },
  components: {tagList},
  methods: {
    toItemPage (id) {
      if (id) {
        this.$router.push({name: 'blogPostItem', params: {id}})
      }
    }
  },
  computed: {
    tagList () {
      return ['Java(3)', 'JavaScript(12)', 'VueJs(6)', 'Backbone.js(2)', 'React.js(1)', 'less(2)']
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../style/color.less');
.main-layout {
  display: flex;
  .list-container {
    flex: 1 1 100%;
    margin-right: 40px;
    .post-bar {
      margin-bottom: 10px 20px;
      padding: 10px;
      display: flex;
      background-color: #fff;
      & > div {
        font-size: 14px;
        span {
          font-size: 18px;
          font-weight: 700;
          margin-right: 5px;
        }
        &:not(:last-child) {
          margin-right: 30px;
        }
      }
    }
    ul.post-list > li {
      background-color: #fff;
      padding: 10px 20px;
      transition: all .2s;
      margin-top: 10px;
      &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
      }
      &:hover {
        box-shadow: 0 0 6px #cdcdcd;
        h2 {
          color: var(--color-hover) !important;
        }
      }
      h2 {
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      p.content {
        color: var(--color-sub-color);
        font-size: 13px;
        line-height: 18px;
        word-break: break-all;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .info-row {
        @row-height: 22px;
        margin-top: 10px;
        display: flex;
        font-size: 12px;
        line-height: @row-height;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
    }
  }
  
  .tag-container {
    width: 300px;
    height: 100%;
    position: sticky;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 3px var(--color-divider);
    padding: 10px;
  }
}

</style>
