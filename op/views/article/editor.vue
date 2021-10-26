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
      <Button type="primary" size="large" @click="onPublishBtn">{{publishBtnName}}</Button>
      <Button size="large" @click="onPublishBtn(true)">存为草稿</Button>
      <Button type="error" size="large" @click="onBackBtn">取消返回</Button>
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
          md: res.md,
          title: res.title,
          tag: res.tags.map(t => t.id),
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
    getArticleData (isDraft = false) {
      const formData = {
        title: this.article.title,
        tagList: this.article.tag,
        isTop: this.article.isTop,
        isDraft,
        html: this.$refs.mdEditor.compiledMarkdown,
        md: this.$refs.mdEditor.vmdInput,
        summary: document.querySelector('.vmd-body').innerText.replace(/[\n#`]/g, ' ').slice(0, 50)
      }
      if (this.id) {
        formData.id = this.id
      }
      return formData
    },
    onPublishBtn (isDraft = false) {
      if (this.disAllowEdit) {
        return false
      }
      this.loading(true)
      createArticle(this.getArticleData(isDraft)).then(res => {
        if (res.isSuccess) {
          const successMsg = `文章${this.isEdit ? '保存' : '新建'}成功`
          this.$Message.success(successMsg)
          this.disAllowEdit = true
          setTimeout(() => {
            this.$router.push({name: 'Article_List'})
          }, 1500)
        } else {
          const errorMsg = `文章${this.isEdit ? '保存' : '新建'}失败`
          this.$Message.error(res.errorMsg || errorMsg)
        }
        this.loading(false)
      })
    },
    onBackBtn () {
      this.$router.push({name: 'Article_List'})
    }
  },
  computed: {
    isEdit () {
      return !!this.id
    },
    publishBtnName () {
      return this.isEdit ? '保存' : '发布'
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
