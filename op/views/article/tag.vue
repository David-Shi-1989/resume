<template>
  <div>
    <page-table ref="tagTable" :pageApi="getTag" :isPagination="false" :columns="columns"
      size="small" bordered :showDeleteBtn="false"
      @create-btn="onCreateBtn">
      <template #button>
        <a-button type="primary" size="mini" @click="onSyncBtn">
          <template #icon>
            <icon-loop />
          </template>
          <template #default>同步</template>
        </a-button>
      </template>
      </page-table>
    <a-modal :visible="modal.isShow" :mask-closable="false"
      @ok="handleOk" @cancel="handleCancel" @close="onModalClose" unmountOnClose>
      <template #title>
        {{modalTitle}}
      </template>
      <a-form :model="modal.form" ref="tagForm">
        <a-form-item field="name" label="名称" :rules="modal.rules.name" :validate-trigger="['change', 'input']">
          <a-input v-model="modal.form.name" placeholder="please enter tag name" :max-length="10" allow-clear show-word-limit/>
        </a-form-item>
        <a-form-item label="创建时间" v-if="modalIsEdit">
          <label>{{modal.form.createDatetime}}</label>
        </a-form-item>
        <a-form-item label="相关文章" v-if="modalIsEdit">
          <ul class="article-list" v-if="modal.form.articleList.length > 0">
            <li v-for="a in modal.form.articleList" :key="a.id"><a-tag color="arcoblue">{{a.title}}</a-tag></li>
          </ul>
          <a-tag v-else>无</a-tag>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {createVNode} from 'vue'
import pageTable from 'op/component/page-table'
import {getTag, editTag, createTag, deleteTag, syncTag} from 'op/api/op'
import {Button, Space, Message} from '@arco-design/web-vue'
import { mapMutations } from 'vuex'
export default {
  components: {pageTable},
  data () {
    return {
      getTag,
      columns: [
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '文章数量',
          dataIndex: 'refer_count'
        },
        {
          title: '创建时间',
          render ({record}) {
            const datetimeText = (new Date(record.create_datetime)).format()
            return createVNode('span', {}, datetimeText)
          }
        },
        {
          title: '操作',
          width: 200,
          render: ({record}) => {
            const editBtn = createVNode(Button, {
              size: 'mini',
              onClick: () => {
                this.onEditItem(record.id)
              }
            }, {
              default: () => '编辑'
            })
            const deleteBtn = createVNode(Button, {
              size: 'mini',
              status: 'danger',
              onClick: () => {
                this.onDeleteItem(record)
              }
            }, {
              default: () => '删除'
            })
            return createVNode(Space, {}, {
              default: () => [editBtn, deleteBtn]
            })
          }
        }
      ],
      modal: {
        isShow: false,
        id: null,
        form: {
          name: '',
          articleList: [],
          createDatetime: ''
        },
        rules: {
          name: [
            {required: true, message: 'name is required'},
            {minLength: 2, maxLength: 10, message: 'length 2-10'}
          ]
        }
      }
    }
  },
  methods: {
    ...mapMutations(['loading']),
    initTableData () {
      this.$refs.tagTable.initData()
    },
    onCreateBtn () {
      this.modal.isShow = true
    },
    onEditItem (id) {
      this.loading(true)
      getTag({id}).then(res => {
        Object.assign(this.modal, {
          id,
          isShow: true,
          form: {
            name: res.title,
            articleList: res.list || [],
            createDatetime: (new Date(res.create_datetime)).format()
          }
        })
      }).finally(() => {
        this.loading(false)
      })
    },
    onDeleteItem ({id, title, refer_count}) {
      let confirmStr = `确认删除当前标签【${title}】吗?`
      if (refer_count > 0) {
        confirmStr += `该标签关联${refer_count}篇文章,删除后将解除关联.`
      }
      this.$modal.confirm({
        title: '请确认',
        content: confirmStr,
        modalClass: 'confirm-modal',
        onOk: () => {
          this.loading(true)
          deleteTag(id).then(res => {
            if (res.isSuccess) {
              Message.success('删除成功')
              this.initTableData()
            } else {
              Message.error(res.errorMsg || '删除失败')
            }
          }).finally(() => {
            this.loading(false)
          })
        }
      })
    },
    onSyncBtn () {
      syncTag().then(res => {
        if (res.isSuccess) {
          Message.success('同步成功')
          this.initTableData()
        } else {
          Message.error(res.errorMsg || '同步失败')
        }
      })
    },
    validateForm () {
      let formRef = this.$refs.tagForm
      return new Promise(function (resolve, reject) {
        formRef.validate().then(errors => {
          resolve(!errors)
        })
      })
    },
    async handleOk () {
      const isValid = await this.validateForm()
      if (!isValid) return
      
      const apiFunc = this.modalIsEdit ? editTag : createTag
      this.loading(true)
      apiFunc(this.modal.form.name, this.modal.id).then(res => {
        if (res.isSuccess) {
          Message.success('操作成功')
          this.modal.isShow = false
          this.initTableData()
        } else {
          Message.error(res.errorMsg || '操作失败')
        }
      }).finally(() => {
        this.loading(false)
      })
    },
    handleCancel () {
      this.modal.isShow = false
    },
    onModalClose () {
      Object.assign(this.modal, {
        id: null,
        form: {
          name: '',
          articleList: [],
          createDatetime: ''
        }
      })
    }
  },
  computed: {
    modalIsEdit () {
      return !!this.modal.id
    },
    modalTitle () {
      return this.modalIsEdit ? '编辑标签' : '新建标签'
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  list-style: none;
  & > li:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
