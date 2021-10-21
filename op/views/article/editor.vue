<template>
  <div class="editor-wrap">
    <Form :model="article">
      <FormItem prop="title" label="标题">
        <Input v-model="article.title" placeholder="标题" />
      </FormItem>
      <div class="config-row">
        <FormItem prop="tag" style="width: 350px;" label="标签">
          <Select v-model="article.tag" multiple placeholder="标签"
            filterable allow-create @on-create="onTagCreate">
            <Option v-for="item in article.tagList" :value="item.id" :key="item.id">{{ item.title }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="isTop" label="置顶">
          <i-Switch v-model="article.isTop"></i-Switch>
        </FormItem>
      </div>
      <FormItem prop="md" class="editor-form-item">
        <VueEditor ref="mdEditor" v-model="article.md"></VueEditor>
      </FormItem>
    </Form>
    <div class="btn-wrap">
      <Button type="primary" size="large" @click="onPublishBtn">发布</Button>
      <Button size="large">保存草稿</Button>
      <Button type="error" size="large">取消返回</Button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getTag, createTag, createArticle, getArticleById} from 'op/api/op'
export default {
  props: {
    id: String
  },
  data () {
    return {
      article: {
        md: '',
        title: '',
        tag: [],
        isTop: false,
        isDraft: false,
        tagList: [
          {title: 'JavaScript', id: '001'},
          {title: 'CSS', id: '002'}
        ]
      },
      disAllowEdit: false
    }
  },
  async created () {
    await this.initTagList()
    if (this.isEdit) {
      this.initArticle()
    }
  },
  methods: {
    ...mapMutations(['loading']),
    initArticle () {
      this.loading(true)
      getArticleById(this.id).then(res => {
        Object.assign(this.article, {
          md: res.content,
          title: res.title,
          tag: res.tags.split(','),
          isTop: res.is_top > 0,
          isDraft: res.is_draft > 0
        })
        this.loading(false)
      })
    },
    initTagList () {
      const me = this
      return new Promise((resolve, reject) => {
        getTag().then(result => {
          me.article.tagList = result
          resolve(true)
        })
      })
    },
    onTagCreate (tagName) {
      if (this.disAllowEdit) {
        return false
      }
      this.loading(true)
      createTag(tagName).then(res => {
        if (res.isSuccess) {
          this.$Message.success('标签新建成功')
          this.article.tagList.push({title: tagName, id: res.id})
        } else {
          this.$Message.error(res.errorMsg || '标签创建失败')
          this.$nextTick(() => {
            this.article.tag = this.article.tag.filter(tag => tag !== tagName)
          })
        }
        this.loading(false)
      })
    },
    getArticleData () {
      return {
        title: this.article.title,
        tagList: this.article.tag,
        isTop: this.article.isTop,
        isDraft: false,
        content: this.$refs.mdEditor.compiledMarkdown,
        summary: $('.vmd-body').innerText.replace(/\n/g, ' ').slice(0, 50)
      }
    },
    onPublishBtn () {
      if (this.disAllowEdit) {
        return false
      }
      this.loading(true)
      createArticle(this.getArticleData()).then(res => {
        if (res.isSuccess) {
          this.$Message.success('文章发布成功')
          this.disAllowEdit = true
          setTimeout(() => {
            this.$router.push({name: 'Article_List'})
          }, 1500)
        } else {
          this.$Message.error(res.errorMsg || '文章发布失败')
        }
        this.loading(false)
      })
    }
  },
  computed: {
    isEdit () {
      return !!this.id
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../../src/style/utils.less');
.editor-wrap {
  .config-row {
    display: flex;
    & > div.ivu-form-item {
      &:not(:first-child) {
        margin-left: 30px;
      }
    }
  }
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    & > .ivu-btn:not(:first-child) {
      margin-left: 20px;
    }
  }
  .editor-form-item /deep/ .ivu-form-item-content {
    height: 500px;
  }
  /deep/ .vmd {
    .vmd-body .vmd-editor {
      .scroll-bar-style(.5rem);
      background: #fff !important;
      border-right: 1px solid #ccc;
    }
    .vmd-preview.markdown-body {
      .scroll-bar-style(.5rem);
      ul {
        list-style: disc;
      }
      ol {
        list-style: auto;
      }
    }
  }
}
</style>
