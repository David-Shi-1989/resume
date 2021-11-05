<template>
  <div class="main-layout">
    <div class="list-container">
      <div class="post-bar">
        <div>
          <div><span>{{list.length}}</span>篇文章</div>
          <div><span>{{isSearching?activeTagList.length:tagList.length}}</span>个标签</div>
          <Input v-model="filter.search" placeholder="搜索内容" @on-change="onSearchChange"
            icon="ios-search" style="width: 200px" size="small"/>
        </div>
        <Button v-if="isSearching" type="text" size="small" @click="onStopSearch">关闭搜索</Button>
      </div>
      <ul class="post-list">
        <li v-for="(post,idx) in list" :key="idx">
          <h2 @click="toItemPage(post.id)">{{post.title}}</h2>
          <p class="content" @click="toItemPage(post.id)">{{post.summary}}</p>
          <div class="info-row">
            <p>{{post.create_datetime}}</p>
            <template v-if="post.tags">
              <tagListCpn style="margin-left:30px;" :list="post.tags"></tagListCpn>
            </template>
          </div>
        </li>
      </ul>
    </div>
    <div class="tag-container">
      <p>标签:</p>
      <tagListCpn ref="tagRight" :list="tagListWithCount" :wrap="true" style="margin-top: 10px;"
        :width="72" :selectable="true" @onTagClick="onTagClick"></tagListCpn>
    </div>
  </div>
</template>

<script>
import {getArticle, getTag} from 'op/api/op'
import tagListCpn from './tag-item.vue'
import {mapMutations} from 'vuex'
import {get, debounce} from 'lodash'
export default {
  data () {
    return {
      tagList: [],
      list: [],
      activeTagList: [],
      filter: {
        search: ''
      }
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
    onSearchChange: debounce(function (evt) {
      this.initData(false)
    }, 1200)
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
    padding:20px;
  }
}

</style>
