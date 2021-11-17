<template>
  <div class="main-layout">
    <div class="list-container">
      <div class="post-bar">
        <div>
          <div><span>{{list.length}}</span>篇文章</div>
          <div><span>{{tagCount}}</span>个标签</div>
          <a-input v-model="filter.search" placeholder="搜索内容"
            @input="onSearchChangeDebounce" @press-enter="initData(false)" @clear="onSearchClear"
            search-button style="width: 200px" allow-clear>
            <template #prefix>
              <icon-search />
            </template>
          </a-input>
        </div>
        <a-button v-if="isSearching" type="text" size="small" @click="onStopSearch">关闭搜索</a-button>
      </div>
      <ul class="post-list">
        <li v-for="(post,idx) in list" :key="idx">
          <div class="d-flex a-start">
            <h2 @click="toItemPage(post.id)">{{post.title}}</h2>
            <img :src="topArticle" v-if="post.is_top" :style="{width:'25px',marginLeft: '10px'}">
          </div>
          <p class="content" @click="toItemPage(post.id)">{{post.summary}}</p>
          <div class="info-row">
            <p>{{post.create_datetime}}</p>
            <template v-if="post.tags">
              <tagListCpn style="margin-left:30px;" :list="post.tags" :hasMarginBottom="true"></tagListCpn>
            </template>
            <div :style="{justifyItems:'flex-end',marginLeft:'auto'}">
              <a-button type="text" size="mini" :style="{color:'var(--color-heart-red)'}">
                <template #icon>
                  <icon-heart-fill />
                </template>
                <template #default>{{post.like_count}}</template>
              </a-button>
              <a-button type="text" size="mini" :style="{color:'var(--color-text-2)'}">
                <template #icon>
                  <icon-message />
                </template>
                <template #default>{{post.comment_count}}</template>
              </a-button>
              <a-button type="text" size="mini" :style="{color:'var(--color-text-2)'}">
                <template #icon>
                  <icon-eye />
                </template>
                <template #default>{{post.visit_count}}</template>
              </a-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="tag-container">
      <p>标签:</p>
      <tagListCpn ref="tagRight" :list="tagListWithCount" :wrap="true" style="margin-top: 10px;"
        :width="100" size="large" :hasIcon="false" :selectable="true" @onTagClick="onTagClick"></tagListCpn>
    </div>
  </div>
</template>

<script>
import {getArticle, getTag} from 'op/api/op'
import tagListCpn from './tag-item.vue'
import {mapMutations} from 'vuex'
import {debounce} from 'lodash'
import topArticle from 'op/component/svg/article-top.svg'
export default {
  data () {
    return {
      tagList: [],
      list: [],
      activeTagList: [],
      filter: {
        search: ''
      },
      topArticle
    }
  },
  components: {tagListCpn},
  created () {
    this.initData()
  },
  methods: {
    ...mapMutations(['loading']),
    initData (isFetchTag = true) {
      const promiseArr = [
        getArticle(
          {
            tagIdList: this.activeTagList.map(t => t.id),
            search: this.filter.search
          }
        )
      ]
      if (isFetchTag) {
        promiseArr.push(getTag())
      }
      this.loading(true)
      Promise.all(promiseArr).then(res => {
        this.list = res[0]
        if (isFetchTag) {
          this.tagList = res[1]
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    toItemPage (id) {
      if (id) {
        this.$router.push({name: 'blogPostItem', params: {id}})
      }
    },
    onTagClick (tag) {
      if (this.activeTagList.some(t => t.id === tag.id)) {
        this.activeTagList = this.activeTagList.filter(t => t.id !== tag.id)
      } else {
        this.activeTagList.push(tag)
      }
      this.initData(false)
    },
    onStopSearch () {
      this.filter.search = ''
      this.activeTagList = []
      this.$refs.tagRight.stopSelect()
      this.initData(false)
    },
    onSearchChangeDebounce: debounce(function () {
      console.log('onSearchChangeDebounce', this.filter.search)
      this.initData(false)
    }, 700),
    onSearchClear () {
      this.filter.search = ''
      this.initData(false)
    }
  },
  computed: {
    tagListWithCount () {
      return this.tagList.map(tag => ({
        title: tag.title + ` (${tag.refer_count})`,
        id: tag.id
      }))
    },
    isSearching () {
      return this.activeTagList.length > 0 || (this.filter.search || '').trim().length > 0
    },
    tagCount () {
      if (this.isSearching && this.activeTagList.length > 0) {
        return this.activeTagList.length
      } else {
        return this.tagList.length
      }
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
      padding: 10px 20px;
      display: flex;
      background-color: #fff;
      justify-content: space-between;
      & > div {
        display: flex;
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
    }
    ul.post-list > li {
      list-style: none;
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
    width: 350px;
    height: 100%;
    position: sticky;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 3px var(--color-divider);
    padding:20px;
  }
}

</style>
