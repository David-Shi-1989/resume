<template>
  <div class="main-layout">
    <div class="left-col">
      <div class="top-row">
        <h1 class="title">{{title}}</h1>
        <div class="info-row">
          <p class="datetime">{{datetime}}</p>
          <tagList :list="tagList"></tagList>
        </div>
      </div>
      <div class="post-text">{{text}}</div>
    </div>
    <div class="right-col">
      <div class="gray-box">
        <h2>目录</h2>
        <ul class="category-list c1">
          <li v-for="(item,idx) in category" :key="idx">
            <p>{{item.title}}</p>
            <template v-if="item.children">
              <ul class="category-list c2">
                <li v-for="(item2,idx2) in item.children" :key="idx+idx2" :class="{active: item2.active}"><p>{{item2.title}}</p></li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import tagList from './tag-item.vue'
export default {
  props: {
    id: String
  },
  components: {tagList},
  data () {
    return {
      title: 'Spring拓展点',
      datetime: '2021/09/04 14:22:04',
      tagList: ['Spring', 'Java'],
      text: `经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。,
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。经历了一系列复杂的spring应用后，你的项目可能已经用上注解，也用上了xxx.properties，你对这神奇的用法感到欣喜，但你不知道他是怎么被实现的，现在就让我们来揭开这些神秘的面纱。
      在Spring生成bean的过程这篇文章中，我们了解了spring在生成bean前会先生成bean的定义，然后注册到BeanFactory中，再之后才能生成bean。那么对于从xml配置好的BeanDefinition，如果想要增加删除修改该怎么办呢？这个接口扩展了标准的BeanFactoryPostProcessor 接口，允许在普通的BeanFactoryPostProcessor接口实现类执行之前注册更多的BeanDefinition。特别地是，BeanDefinitionRegistryPostProcessor可以注册BeanFactoryPostProcessor的BeanDefinition。\npostProcessBeanDefinitionRegistry方法可以修改在BeanDefinitionRegistry接口实现类中注册的任意BeanDefinition，也可以增加和删除BeanDefinition。原因是这个方法执行前所有常规的BeanDefinition已经被加载到BeanDefinitionRegistry接口实现类中，但还没有bean被实例化。`,
      category: [
        {title: 'TypeScript简介'},
        {
          title: '环境搭建',
          children: [
            {title: '后台环境搭建'},
            {title: '前台环境搭建', active: true},
          ]
        },
        {
          title: '开发介绍',
          children: [
            {title: '开发1'},
            {title: '开发2'}
          ]
        }
      ]
    }
  },
}
</script>

<style lang="less" scoped>
.main-layout {
  display: flex;
  .left-col {
    flex: 1 1 100%;
    margin-right: 40px;
    .top-row {
      padding-bottom: 10px;
      border-bottom: 2px dashed var(--color-border);
    }
  }
  .right-col {
    width: 250px;
    .gray-box {
      position: sticky;
      top: 0;
    }
  }
}
h1.title {
  margin-bottom: 10px;
}
.info-row {
  display: flex;
  .datetime {
    margin-right: 20px;
  }
}
.post-text {
  margin-top: 10px;
  font-size: 16px;
  line-height: 28px;
  text-indent: 2rem;
  word-break: break-all;
}
.category-list {
  &.c1 {
    margin-top: 15px;
    & > li {
      font-size: 16px;
      line-height: 26px;
      cursor: pointer;
      &:not(:first-child) {
        margin-top: 6px;
      }
    }
  }
  &.c2 {
    font-size: 14px;
    color: var(--color-sub-color);
    padding-left: 15px;
  }
  p {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0,0,0,.1);
    }
  }
  & > li {
    &.active {
      p {
        background-color: var(--color-primary);
        color: #fff;
      }
    }
  }
}
</style>
