<template>
  <div class="page-table-wrap">
    <div class="btn-wrap">
      <Button type="primary" icon="md-add" size="small" @click="onCreateBtn">新建</Button>
    </div>
    <Table border :columns="columns" :data="data" :height="tableHeight"></Table>
    <div class="page-table-paging">{{data.length}}个数据</div>
    <Modal v-model="modal.isShow" :title="modalTitle" :mask-closable="false"
      @on-visible-change="onModalVisibleChange">
      <Form ref="form" :model="modal.form" :label-width="60" :rules="modal.rules">
        <FormItem label="名称" prop="name" :error="modal.form.nameError" required>
          <i-Input v-model="modal.form.name" placeholder="请输入" :maxlength="32"></i-Input>
        </FormItem>
        <FormItem label="描述" prop="description">
          <i-Input v-model="modal.form.description" placeholder="请输入" type="textarea" :maxlength="100"></i-Input>
        </FormItem>
      </Form>
      <div slot="footer" class="page-table-footer">
        <Button type="default" @click="onModalCancel">取消</Button>
        <Button type="primary" @click="onModalOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {categoryPage, categoryCreate, categoryDelete, categoryEdit} from 'op/api/op.js'
import {mapGetters} from 'vuex'
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必填项'))
      } else {
        if (/[\s\t\n]/.test(value)) {
          callback(new Error('不能包含空格'))
        } else {
          callback()
        }
      }
    }
    return {
      columns: [
        {title: '分类名称', key: 'name'},
        {title: '创建时间', key: 'create_date'},
        {title: '描述', key: 'description'},
        {
          title: '操作',
          width: 160,
          render: (h, params) => {
            const editBtn = h('Button', {
              props: {
                type: 'default',
                size: 'small'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: () => {
                  this.onEdit(params.row)
                }
              }
            }, '修改')
            const deleteBtn = h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.onDelete(params.row)
                }
              }
            }, '删除')
            return h('div', [editBtn, deleteBtn])
          }
        }
      ],
      data: [],
      modal: {
        isShow: false,
        isCreate: true,
        form: {
          id: null,
          name: '',
          nameError: '',
          description: ''
        },
        rules: {
          name: [
            {validator: validateName, trigger: 'change'}
          ]
        }
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      this.data = await categoryPage()
    },
    onCreateBtn () {
      Object.assign(this.modal, {
        isShow: true,
        isCreate: true,
        form: {
          id: null
        }
      })
    },
    // table
    onEdit (row) {
      Object.assign(this.modal, {
        isShow: true,
        isCreate: false,
        form: {
          id: row.id,
          name: row.name,
          description: row.description
        }
      })
    },
    onDelete (row) {
      this.$Modal.confirm({
        title: '请确认',
        content: `确认删除【${row.name}】吗？`,
        onOk: () => {
          this.$nextTick(() => {
            this.doDelete(row.id)
          })
        }
      })
    },
    doDelete (id) {
      categoryDelete(id).then(isSuccess => {
        if (isSuccess) {
          this.$Message.success('删除成功')
          this.initData()
        } else {
          this.$Message.error('删除失败，请刷新后重试')
        }
      })
    },
    // modal
    async onModalOk () {
      if (await this.isModalFormValid()) {
        const isCreate = this.modal.isCreate
        const postData = {name: this.modal.form.name, description: this.modal.form.description || ''}
        if (!isCreate) {
          postData.id = this.modal.form.id
        }
        const func = isCreate ? categoryCreate : categoryEdit
        func(postData).then(data => {
          if (data.isSuccess) {
            this.$Message.success(isCreate ? '新建成功' : '修改成功')
            this.initData()
            this.modal.isShow = false
          } else {
            if (data.errorField && data.errorMessage) {
              this.$set(this.modal.form, data.errorField + 'Error', '')
              this.$set(this.modal.form, data.errorField + 'Error', data.errorMessage)
            }
          }
        })
      }
    },
    onModalCancel () {},
    onModalVisibleChange (isShow) {
      if (!isShow) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      }
    },
    isModalFormValid () {
      const formRef = this.$refs.form
      return new Promise((resolve) => {
        formRef.validate(isValid => {
          resolve(isValid)
        })
      })
    }
  },
  computed: {
    ...mapGetters(['tableHeight']),
    modalTitle () {
      return this.modal.isCreate ? '新建类别' : '编辑类别'
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
