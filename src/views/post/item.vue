<template>
  <div class="main-layout article-wrap">
    <div class="left-col">
      <div class="top-row">
        <h1 class="title">{{title}}</h1>
        <div class="info-row">
          <p class="datetime">{{datetime}}</p>
          <tagList :list="tagList"></tagList>
        </div>
      </div>
      <div class="post-text markdown-body" v-html="html"></div>
    </div>
    <div class="right-col">
      <div class="gray-box">
        <h2>目录</h2>
        <ul class="category-list c1">
          <li v-for="(item,idx) in category" :key="idx" :class="{active: item.active}">
            <p @click.prevent="onCategoryClick(item.id)" class="category-item">{{item.title}}</p>
            <template v-if="item.children&&item.children.length>0">
              <ul class="category-list c2">
                <li v-for="(item2, idx2) in item.children" :key="idx+idx2" :class="{active: item2.active}">
                  <p @click.prevent="onCategoryClick(item2.id)" class="category-item">{{item2.title}}</p>
                  <template v-if="item2.children.length>0">
                    <ul class="category-list c3">
                      <li v-for="(item3,idx3) in (item2.children || [])" :key="idx+'_'+idx2+'_'+idx3" :class="{active: item3.active}">
                        <p @click.prevent="onCategoryClick(item3.id)" class="category-item">{{item3.title}}</p>
                      </li>
                    </ul>
                  </template>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const HEAD_HEIGHT = 45
var clickCategoryId = null
import {getArticleById} from 'op/api/op'
import tagList from './tag-item.vue'
import {isArray, get, debounce} from 'lodash'
import {mapMutations} from 'vuex'
export default {
  props: {
    id: String
  },
  components: {tagList},
  data () {
    return {
      title: '',
      datetime: '',
      tagList: [],
      html: '',
      category: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapMutations(['loading']),
    initData () {
      this.loading(true)
      getArticleById(this.id).then(obj => {
        this.title = obj.title
        this.datetime = obj.create_datetime
        this.tagList = obj.tags
        this.html = this.renderHtml(obj.html)
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
      // add id for h1,h2,h3
      var reg = /<(h\d(\s*id=['"].+['"])?)>(.*)<\//g
      const categoryArr = []
      let curCategoryPointer = null
      const titleList = html.match(reg)
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

<style lang="less">
@import url('../../style/md-style.less');
</style>
<style lang="less" scoped>
.main-layout {
  display: flex;
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
    .gray-box {
      position: sticky;
      top: 0;
      background-color: #fff;
      padding: 10px 20px;
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
</style>
