<template>
  <div>
    <page-table :pageApi="getTag" :isPagination="false" :columns="columns"
      size="small" bordered :showDeleteBtn="false"
      @create-btn="onCreateBtn"></page-table>
    <a-modal :visible="modal.isShow" @ok="handleOk" @cancel="handleCancel" @close="onModalClose" unmountOnClose>
      <template #title>
        {{modalTitle}}
      </template>
      <a-form :model="modal.form">
        <a-form-item field="name" label="名称">
          <a-input v-model="modal.form.name" placeholder="please enter tag name" />
        </a-form-item>
        <a-form-item label="相关文章">
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
import {getTag} from 'op/api/op'
import {Button, Space} from '@arco-design/web-vue'
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
              status: 'danger'
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
          articleList: []
        }
      }
    }
  },
  methods: {
    onCreateBtn () {
      this.modal.isShow = true
    },
    onEditItem (id) {
      Object.assign(this.modal, {
        id,
        isShow: true
      })
      getTag({id}).then(res => {
        this.modal.form.articleList = res.list || []
      })
    },
    handleOk () {},
    handleCancel () {
      this.modal.isShow = false
    },
    onModalClose () {
      Object.assign(this.modal, {
        id: null,
        articleList: []
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
