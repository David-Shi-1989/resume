<template>
  <div class="main-layout article-wrap">
    <div class="d-flex">
      <div class="left-col">
        <div class="top-row">
          <div class="d-flex a-center">
            <h1 class="title">{{title}}</h1>
            <img :src="topArticle" v-if="isTop" :style="{width:'30px',marginLeft: '10px'}">
          </div>
          <div class="info-row">
            <p class="datetime">{{datetime}}</p>
            <tagList :list="tagList"></tagList>
          </div>
        </div>
        <MdEditor v-model="md" :previewOnly="true" :showCodeRowNumber="true"></MdEditor>
      </div>
      <div class="right-col">
        <div class="gray-box">
          <h2 style="margin-bottom: 20px;">目录</h2>
          <a-anchor scroll-container="#md-editor-v3">
            <a-anchor-link v-for="(item,idx) in category" :key="idx" :href="'#'+item.id">
              {{item.title}}
              <template #sublist v-if="item.children&&item.children.length>0">
                <a-anchor-link v-for="(item2, idx2) in item.children"
                  :key="idx+'_'+idx2" :href="'#'+item2.id">
                  {{item2.title}}
                  <template #sublist v-if="item2.children&&item2.children.length>0">
                    <a-anchor-link v-for="(item3, idx3) in item2.children"
                      :key="idx+'_'+idx2+'_'+idx3" :href="'#'+item3.id">
                      {{item3.title}}
                    </a-anchor-link>
                  </template>
                </a-anchor-link>
              </template>
            </a-anchor-link>
          </a-anchor>
        </div>
        <div class="gray-box">
          <!-- like -->
          <ul class="article-statistic">
            <li>
              <icon-heart-fill v-if="curIsLike" :style="{fontSize:'20px',color:'var(--color-heart-red)'}" :stroke-width="2" @click="onLikeClick"/>
              <icon-heart v-else :style="{fontSize:'20px'}" :stroke-width="2" @click="onLikeClick"/>
              <p>{{count.like}}</p>
            </li>
            <li>
              <a href="#article-comment">
                <icon-message :style="{fontSize:'20px'}" :stroke-width="2"/>
                <p>{{count.comment}}</p>
              </a>
            </li>
            <li>
              <icon-eye :style="{fontSize:'20px'}" :stroke-width="2"/>
              <p>{{count.visit}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <a-card hoverable :style="{marginTop:'20px'}">
      <comment id="article-comment" :resourceId="id" @comment-change="onCommentChange"/>
    </a-card>
  </div>
</template>

<script>
const HEAD_HEIGHT = 45
var clickCategoryId = null
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {getArticleById, articleLike} from 'op/api/op'
import tagList from './tag-item.vue'
import {isArray, get, debounce} from 'lodash'
import {mapMutations} from 'vuex'
import topArticle from 'op/component/svg/article-top.svg'
import comment from '@/components/comments'
import { Message } from '@arco-design/web-vue'

export default {
  props: {
    id: String
  },
  components: {tagList, MdEditor, comment},
  data () {
    return {
      title: '',
      datetime: '',
      tagList: [],
      md: '',
      category: [],
      isTop: false,
      topArticle,
      curIsLike: false,
      count: {
        like: 0, visit: 0, comment: 0
      },
      likeLocalStorageKey: '_sww_article_like'
    }
  },
  created () {
    this.initData()
    this.curIsLike = this.isLocalHasLike()
  },
  methods: {
    ...mapMutations(['loading']),
    initData () {
      this.loading(true)
      getArticleById(this.id).then(obj => {
        this.title = obj.title
        this.datetime = obj.create_datetime
        this.tagList = obj.tags
        this.md = obj.md
        this.isTop = obj.is_top
        this.count.like = obj.like_count
        this.count.visit = obj.visit_count
        this.count.comment = obj.comment_count
        this.renderCategory()
      }).finally(() => {
        this.loading(false)
      })
    },
    renderHtml (html) {
      function getCategoryItemId (curItem) {
        const parent = curItem.parent
        const parentId = get(parent, 'id', 'root')
        const curItemIdx = isArray(parent) ? parent.length : get(parent, 'children', []).length
        return [parentId, curItemIdx].join('-')
      }
      if (!html) {
        return
      }
      // add id for h1,h2,h3
      var reg = /<(h\d(\s*id=['"].+['"])?)>(.*)<\//g
      const categoryArr = []
      let curCategoryPointer = null
      const titleList = html.match(reg)
      if (!titleList) {
        return
      }
      for (let i = 0; i < titleList.length && titleList; i++) {
        let curTag = titleList[i]
        let titleIdx = parseInt(curTag.match(/^<h(\d)/)[1])
        let title = curTag.replace(/(^<h\d+[^>]*>)|(<\/$)/g, '').replace(/<(\/)?code>/g, '')
        var newCategoryItem = {title, index: titleIdx, children: [], parent: null, id: '', active: false}
        if (curCategoryPointer) {
          if (curCategoryPointer.index === titleIdx) {
            newCategoryItem.parent = curCategoryPointer.parent
            curCategoryPointer.parent.children.push(newCategoryItem)
          } else if (curCategoryPointer.index < titleIdx) {
            newCategoryItem.parent = curCategoryPointer
            curCategoryPointer.children.push(newCategoryItem)
          } else {
            while (curCategoryPointer.index !== titleIdx && curCategoryPointer.parent) {
              curCategoryPointer = curCategoryPointer.parent
            }
            newCategoryItem.parent = curCategoryPointer.parent
            curCategoryPointer.parent.push(newCategoryItem)
          }
        } else {
          newCategoryItem.parent = categoryArr
          newCategoryItem.parent.push(newCategoryItem)
        }
        curCategoryPointer = newCategoryItem
        newCategoryItem.id = getCategoryItemId(newCategoryItem)
        var appendIdStr = curTag
        if ((new RegExp(`<h${titleIdx} id=".+">`)).test(curTag)) {
          appendIdStr = appendIdStr.replace((new RegExp(`^<h${titleIdx} id=".+">`)), `<h${titleIdx} id="${newCategoryItem.id}">`)
        } else {
          appendIdStr = appendIdStr.replace((new RegExp(`^<h${titleIdx}\s*>`)), `<h${titleIdx} id="${newCategoryItem.id}">`)
        }
        html = html.replace(curTag, appendIdStr)
      }
      this.category = categoryArr
      return html
    },
    renderCategory () {
      const lines = this.md
        .split('\n')
        .filter(line => (line || '').trim().length > 0 && /^#+\s+/.test(line))
        .map(line => {
          let id = line.replace(/^#+\s*/, '')
          if (/^`.+`$/.test(id)) {
            id = id.replace(/^`/, '<code>').replace(/`$/, '</code>')
          }
          const title = line.replace(/^#+\s*/, '').replace(/[`]/g, '')
          const level = line.match(/^#+/)[0].length
          return {title, level, id}
        })
      const categoryObj = Object.freeze({
        title: 'root',
        level: 0,
        children: [],
        parent: null
      })
      let curPointer = categoryObj
      for (let i = 0; i < lines.length; i++) {
        const curLine = lines[i]
        let {level} = curLine
        let dis = Math.abs(curPointer.level - level)
        let curTmp = Object.assign({}, curLine, {
          id: curLine.id,
          children: [],
          active: false,
          parent: null
        })
        if (dis === 0) {
          curTmp.parent = curPointer.parent
          curPointer.parent.children.push(curTmp)
        } else if (curPointer.level > level) {
          // current: ###
          // next: ##
          let parentNode = null
          while (dis >= 0) {
            parentNode = curPointer.parent
            dis--
          }
          curTmp.parent = parentNode.parent
          parentNode.parent.children.push(curTmp)
        } else {
          while (dis !== 1) {
            let newEmptyNode = {
              title: '',
              level: curPointer.level + 1,
              parent: curPointer
            }
            curPointer.children.push(newEmptyNode)
            curPointer = newEmptyNode
            dis = Math.abs(curPointer.level - level)
          }
          curPointer.children.push(curTmp)
          curTmp.parent = curPointer
        }
        curPointer = curTmp
      }
      this.category = categoryObj.children
    },
    onCategoryClick (id) {
      clickCategoryId = id
      this.scrollTo(id)
    },
    scrollTo (id) {
      let curTitle = document.getElementById(id)
      console.assert(!!curTitle, 'can not find el ', id)
      const curTop = curTitle.offsetTop
      document.getElementById('main_container').scrollTop = this.calContainerTop(curTop)
    },
    calContainerTop (top) {
      return top - HEAD_HEIGHT
    },
    onContainerScroll: debounce(function (evt) {
      if (clickCategoryId) {
        this.activeCategoryById(clickCategoryId)
        clickCategoryId = null
      } else {
        const curTop = evt.target.scrollTop
        this.activeCategoryItemWhileScroll(curTop)
      }
    }, 100),
    activeCategoryById (id) {
      function walkCategoryArr (arr) {
        if (isArray(arr)) {
          arr.forEach(c => {
            if (c.id) {
              c.active = c.id === id
            }
            if (isArray(c.children)) {
              walkCategoryArr(c.children)
            }
          })
        }
      }
      walkCategoryArr(this.category)
    },
    activeCategoryItemWhileScroll (top) {
      const me = this
      let titleList = []
      walkCategoryArr(this.category)
      function walkCategoryArr (arr) {
        if (isArray(arr)) {
          arr.forEach(c => {
            if (c.id) {
              c.active = false
              let el = document.getElementById(c.id)
              if (el) {
                titleList.push({diff: me.calContainerTop(el.offsetTop) - top, obj: c})
              }
            }
            if (isArray(c.children)) {
              walkCategoryArr(c.children)
            }
          })
        }
      }
      if (titleList.length > 0) {
        titleList = titleList.sort((c1, c2) => Math.abs(c1.diff) >= Math.abs(c2.diff) ? 1 : -1)
        titleList[0].obj.active = true
      }
    },
    onLikeClick () {
      if (this.curIsLike) {
        Message.info('谢谢! Like恒久远,一颗永流传.')
      } else {
        articleLike(this.id).then(isSuccess => {
          if (isSuccess) {
            this.curIsLike = true
            this.count.like++
            this.addLocalHasLike(this.id)
          }
        })
      }
    },
    isLocalHasLike () {
      return this.getLocalHasLike().includes(this.id)
    },
    getLocalHasLike () {
      return JSON.parse(localStorage.getItem(this.likeLocalStorageKey) || '[]')
    },
    addLocalHasLike (id) {
      let localLikeArr = this.getLocalHasLike()
      localLikeArr.push(id)
      localStorage.setItem(this.likeLocalStorageKey, JSON.stringify(localLikeArr))
    },
    onCommentChange (list) {
      this.count.comment = list.length
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.category.length > 0) {
        document.getElementById('main_container').onscroll = this.onContainerScroll
      }
    }, 2000)
  },
  destroyed () {}
}
</script>

<style lang="less" scoped>
.main-layout {
  min-height: 100%;
  .left-col {
    flex: 1 1 100%;
    margin-right: 40px;
    padding: 20px 40px;
    background-color: #fff;
    .top-row {
      padding-bottom: 10px;
      border-bottom: 2px dashed var(--color-border);
    }
  }
  .right-col {
    width: 250px;
    position: sticky;
    top: 0;
    margin-bottom: auto;
    & > .gray-box {
      background-color: #fff;
      padding: 10px 20px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
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
  font-size: 18px;
  text-indent: 2rem;
  word-break: break-all;
  line-height: 34px;
  font-weight: 300;
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
  &.c3 {
    padding-left: 20px;
  }
  p {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    &:hover {
      background-color: rgba(0,0,0,.1);
    }
  }
  & > li {
    &.active {
      & > p {
        background-color: var(--color-primary);
        color: #fff;
      }
    }
  }
}
.article-statistic {
  display: flex;
  justify-content: space-around;
  list-style: none;
  & > li {
    text-align: center;
    svg {
      cursor: pointer;
    }
    p {
      font-size: 12px;
    }
    a {
      text-decoration: none;
      color: #2c3e50;
    }
  }
}
</style>
