<template>
  <div>
    <div class="top-row">
      <a-form :model="form" layout="vertical">
        <a-form-item field="title">
          <a-input v-model="form.title" placeholder="Title" allow-clear />
        </a-form-item>
        <a-space :size="50" v-if="topCollapseShow">
          <!-- tag标签 -->
          <a-form-item field="tags" style="width: 450px;">
            <a-select v-model="form.tags" placeholder="Please select tag" :max-tag-count="3" multiple allow-create>
              <a-option v-for="tag in tagList" :key="tag.id" :value="tag.id">{{tag.title}}</a-option>
            </a-select>
          </a-form-item>
          <!-- 置顶 -->
          <a-form-item field="isTop">
            <label style="width: 50px;">置顶</label>
            <a-switch type="round" v-model="form.isTop"></a-switch>
          </a-form-item>
          <!-- 草稿 -->
          <a-form-item field="isDraft">
            <label style="width: 50px;">草稿</label>
            <a-switch type="round" v-model="form.isDraft"></a-switch>
          </a-form-item>
        </a-space>
      </a-form>
      <icon-caret-left :class="collpaseClass" @click="onTopCollapseClick"/>
    </div>
    <div class="md-editor">
      <MdEditor v-model="form.md" :showCodeRowNumber="true" @onUploadImg="onUploadImg"></MdEditor>
    </div>
    <a-space class="btn-row" size="large">
      <a-button type="primary" @click="onSaveBtn">保存</a-button>
      <a-button type="text" @click="onCancelBtn">取消</a-button>
    </a-space>
  </div>
</template>

<script>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import {getArticleById, getTag, createArticle, uploadImg} from 'op/api/op'
import { mapMutations } from 'vuex'
export default {
  props: {
    id: ''
  },
  components: {MdEditor},
  data () {
    return {
      form: {
        title: '',
        tags: [],
        isTop: false,
        isDraft: false,
        md: ''
      },
      tagList: [],
      topCollapseShow: true,
      disableAll: false
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapMutations(['loading']),
    initData () {
      this.loading(true)
      const apiArr = [getTag()]
      if (this.isEdit) {
        apiArr.push(getArticleById(this.id))
      }
      Promise.all(apiArr).then(res => {
        this.tagList = res[0]
        if (this.isEdit && res.length > 1) {
          let article = res[1]
          Object.assign(this.form, {
            title: article.title,
            tags: article.tags.map(t => t.id),
            isTop: article.is_top > 0,
            isDraft: article.is_draft > 0,
            md: article.md
          })
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    onTopCollapseClick () {
      this.topCollapseShow = !this.topCollapseShow
    },
    getData () {
      const data = {
        title: this.form.title,
        tagList: this.form.tags,
        md: this.form.md,
        isTop: this.form.isTop,
        isDraft: this.form.isDraft,
        summary: this.getSummary()
      }
      if (this.id) {
        data.id = this.id
      }
      return data
    },
    onSaveBtn () {
      if (this.disableAll) {
        return
      }
      this.loading(true)
      createArticle(this.getData()).then(res => {
        if (res.isSuccess) {
          this.disableAll = true
          this.$message.success('保存成功')
          setTimeout(() => {
            this.onCancelBtn()
          }, 2000)
        } else {
          this.$message.error(res.errorMsg || '保存失败')
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    onCancelBtn () {
      this.$router.push({name: 'Article_List'})
    },
    getSummary () {
      return this.form.md.replace(/[\n#`]/g, ' ').replace(/\s+/g, ' ').replace(/^\s+/, '').slice(0, 50)
    },
    onUploadImg (files, callback) {
      uploadImg(files).then(res => {
        callback(res.map(url => location.origin + url))
      })
    }
  },
  computed: {
    collpaseClass () {
      return {
        'collapse-icon': true,
        'collapse-open': this.topCollapseShow
      }
    },
    isEdit () {
      return !!this.id
    }
  }
}
</script>

<style lang="less" scoped>
.top-row {
  display: flex;
  justify-content: space-between;
  .collapse-icon {
    align-self: flex-start;
    margin: 12px 30px 0 30px;
    cursor: pointer;
    width: 16px;
    height: 16px;
    padding: 5px;
    box-sizing: content-box;
    border-radius: 50%;
    &:hover {
      background-color: var(--color-fill-3);
    }
    &.collapse-open {
      transform: rotate(-90deg);
    }
  }
}
.btn-row {
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
