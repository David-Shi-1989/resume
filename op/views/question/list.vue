<template>
  <div class="page-table-wrap">
    <div class="btn-wrap">
      <Button type="primary" icon="md-refresh" size="small" @click="initTableData">刷新</Button>
      <Button type="primary" icon="md-add" size="small" @click="onCreateBtn">新建</Button>
      <Button type="error" icon="md-trash" size="small" @click="onDeleteBtn">删除</Button>
      <Form :label-width="40" inline label-position="left">
        <FormItem label="题型">
          <Select v-model="filter.type" size="small" style="width: 120px;">
            <Option v-for="item in filterTypeList" :value="item.id" :key="item.name" :label="item.name">
              <span :style="{color:item.isBolder?'var(--color-success)':'var(--color-content)'}">{{ item.name }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="分类">
          <Select v-model="filter.category" size="small" multiple style="width: 450px;">
            <Option v-for="item in filterCategoryList" :value="item.id" :key="item.name" :label="item.name">
              <span :style="{color:item.isBolder?'var(--color-success)':'var(--color-content)'}">{{ item.name }}</span>
            </Option>
          </Select>
        </FormItem>
        <FormItem label="题目">
          <i-Input type="text" v-model="filter.content" size="small" :maxlength="64"></i-Input>
        </FormItem>
      </Form>
    </div>
    <Table ref="table" border :columns="columns" :data="data" :loading="tableLoading" :height="tableHeight - 50"></Table>
    <div class="page-table-paging">
      <Page :total="paging.total" :current="paging.current" :page-size="paging.page" size="small" show-elevator show-sizer show-total
        @on-change="onPageChange" @on-page-size-change="onPageSizeChange"/>
    </div>
    <Modal v-model="modal.isShow" :title="modalTitle" :mask-closable="false"
      :width="800" class="has-scorll-body question-list"
      @on-visible-change="onModalVisibleChange">
      <div class="modal-body-overflow" style="height: 400px;">
        <Form ref="form" :model="modal.form" :label-width="90" >
          <FormItem label="题目类型" prop="type" required>
            <Select v-model="modal.form.type" @on-change="onTypeChange">
              <Option v-for="item in modal.typeOptions" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="分类" prop="category" required>
            <Select v-model="modal.form.category">
              <Option v-for="item in categoryList" :value="item.id" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="题目" prop="topic" required>
            <i-Input v-model="modal.form.topic" placeholder="请输入" type="textarea" :rows="4" :maxlength="1000"></i-Input>
          </FormItem>
          <FormItem v-if="isJudgement" label="答案" prop="answer">
            <RadioGroup v-model="modal.form.answer">
              <Radio label="1"><span class="color-success">正确</span></Radio>
              <Radio label="0"><span class="color-error">错误</span></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-else label="选项" prop="options" :error="modal.form.optionError" required>
            <Table class="options-table" :columns="optionTableColumn" :data="optionTableData" border :row-class-name="rowClassName"></Table>
          </FormItem>
          <FormItem label="解析" prop="description" >
            <i-Input v-model="modal.form.description" placeholder="请输入" type="textarea" :maxlength="100"></i-Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="page-table-footer">
        <Button type="default" @click="onModalCancel">取消</Button>
        <Button type="primary" @click="onModalOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import {categoryPage, questionPage, questionCreate, questionDelete, questionEdit} from 'op/api/op.js'
import {questionOptions, QuestionType} from '@/constant'
import {cloneDeep, last, debounce} from 'lodash'
import {mapGetters} from 'vuex'
export default {
  name: 'Question_List',
  data () {
    return {
      tableLoading: false,
      filter: {
        type: 'all',
        category: [],
        content: ''
      },
      columns: [
        {
          type: 'selection',
          width: 60
        },
        {
          title: '题型',
          width: 120,
          render: (h, params) => {
            const type = params.row.type
            const text = questionOptions.find(o => o.id === type).name
            if (text) {
              return h('span', text)
            } else {
              return h('span', {
                attrs: {
                  class: 'color-sub'
                }
              }, '未知题型')
            }
          }
        },
        {
          title: '分类',
          key: 'cname',
          width: 140,
          render: (h, params) => {
            const text = params.row.cname
            if (text) {
              return h('span', text)
            } else {
              return h('span', {
                attrs: {
                  class: 'color-sub'
                }
              }, '未分类')
            }
          }
        },
        {title: '题目', key: 'topic'},
        {
          title: '答案',
          key: 'answer',
          width: 140,
          render: (h, params) => {
            const isJudgement = params.row.type === QuestionType.Judgement
            if (isJudgement) {
              const isRight = parseInt(params.row.answer) > 0
              return h('Tag', {
                props: {
                  color: isRight ? 'success' : 'error'
                }
              }, isRight ? '正确' : '错误')
            } else {
              return h('Tag', params.row.answer)
            }
          }
        },
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
                  this.onDeleteRow(params.row)
                }
              }
            }, '删除')
            return h('div', [editBtn, deleteBtn])
          }
        }
      ],
      data: [],
      paging: {
        current: 1,
        page: 20,
        total: -1
      },
      categoryList: [],
      modal: {
        isShow: false,
        form: {
          id: null,
          type: QuestionType.Single,
          category: '',
          optionError: '',
          topic: '',
          description: '',
          answer: '',
          options: [
            {key: 'A', text: 'option A', isRight: false},
            {key: 'B', text: 'option B', isRight: false},
            {key: 'C', text: 'option C', isRight: false},
            {key: 'D', text: 'option D', isRight: false}
          ],
          selectOptions: [
            {key: 'A', text: 'option A', isRight: false},
            {key: 'B', text: 'option B', isRight: false},
            {key: 'C', text: 'option C', isRight: false},
            {key: 'D', text: 'option D', isRight: false}
          ],
          judgementOptions: [
            {key: '正确', isRight: false},
            {key: '错误', isRight: false}
          ],
          addOption: {key: 'add'},
          optionsColumns0: [
            {
              title: '选项',
              key: 'key',
              render: (h, params) => {
                const isAddRow = params.row.key === 'add'
                if (isAddRow) {
                  const addIcon = h('Icon', {
                    props: {
                      type: 'md-add'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  })
                  const addText = h('span', {
                    style: {
                      fontSize: '12px'
                    }
                  }, '新建')
                  return h('div', {
                    attrs: {
                      class: 'd-flex align-center table-add-btn'
                    },
                    on: {
                      click: () => {
                        this.onOptionRowAdd()
                      }
                    }
                  }, [addIcon, addText])
                } else {
                  return h('span', params.row.key)
                }
              }
            },
            {
              title: '内容',
              key: 'text',
              render: (h, params) => {
                const isAddRow = params.row.key === 'add'
                if (!isAddRow) {
                  return h('Input', {
                    props: {
                      value: params.row.text,
                      size: 'small'
                    },
                    on: {
                      'on-change': evt => {
                        this.updateOptionText(params.row, evt.target.value)
                      }
                    }
                  })
                }
              }
            },
            {
              title: '正确答案',
              key: 'isRight',
              width: 90,
              render: (h, params) => {
                const isAddRow = params.row.key === 'add'
                if (!isAddRow) {
                  const isRight = params.row.isRight
                  return h('Checkbox', {
                    props: {
                      value: isRight
                    },
                    on: {
                      'on-change': val => {
                        this.onRightAnswerChange(params.row, val)
                      }
                    }
                  })
                }
              }
            }
          ],
          optionsColumns: []
        },
        typeOptions: questionOptions
      }
    }
  },
  created () {
    this.initData()
    this.updateTableColumn()
  },
  methods: {
    async initData () {
      this.categoryList = await categoryPage()
      this.filter.category = ['all', 'null', ...this.categoryList.map(o => o.id)]
    },
    initTableByFilter: debounce(function () {
      this.initTableData()
    }, 1000),
    async initTableData () {
      this.tableLoading = true
      const list = await questionPage(this.paging.current, this.paging.page, this.filterCondition.type, this.filterCondition.category, this.filterCondition.content)
      this.data = list.list
      this.paging.total = list.total
      this.tableLoading = false
      const tableBody = document.querySelector('.page-table-wrap .ivu-table-body.ivu-table-overflowY')
      if (tableBody) {
        tableBody.scrollTop = 0
      }
    },
    onPageChange (page) {
      if (this.paging.current !== page) {
        this.paging.current = page
        this.initTableData()
      }
    },
    onPageSizeChange (pageSize) {
      if (this.paging.page !== pageSize) {
        this.paging.page = pageSize
        this.initTableData()
      }
    },
    onCreateBtn () {
      Object.assign(this.modal, {
        isShow: true
      })
      Object.assign(this.modal.form, {id: null})
    },
    onDeleteBtn () {
      const selectedList = this.$refs.table.getSelection()
      if (selectedList.length > 0) {
        this.$Modal.confirm({
          title: '请确认',
          content: `确认删除这${selectedList.length}条数据吗？`,
          onOk: () => {
            this.$nextTick(() => {
              this.doDelete(selectedList.map(i => i.id))
            })
          }
        })
      } else {
        this.$Message.warning('未选中数据')
      }
    },
    // filter
    // onFilterCategoryChange (idList) {
    //   if (idList.includes('all')) {
    //     // this.filter.category = this.filterCategoryList.map(o => o.id)
    //   }
    // },
    // table
    onEdit (row) {
      Object.assign(this.modal, {
        isShow: true
      })
      const editForm = {
        id: row.id,
        topic: row.topic,
        description: row.description,
        options: JSON.parse(row.options || '[]').map(i => {
          i.isRight = row.answer.includes(i.key)
          return i
        }),
        type: row.type,
        category: row.cid,
        answer: row.answer
      }
      Object.assign(this.modal.form, editForm)
    },
    onDeleteRow (row) {
      this.$Modal.confirm({
        title: '请确认',
        content: '确认删除该条数据吗？',
        onOk: () => {
          this.$nextTick(() => {
            this.doDelete([row.id])
          })
        }
      })
    },
    doDelete (idList) {
      questionDelete(idList).then(isSuccess => {
        if (isSuccess) {
          this.$Message.success('删除成功')
          this.initTableData()
        } else {
          this.$$Message.error('删除失败，请刷新后重试')
        }
      })
    },
    // modal
    async onModalOk () {
      if (await this.isModalFormValid()) {
        if (this.isCreate) {
          questionCreate(this.getFormData()).then(data => {
            if (data.isSuccess) {
              this.$Message.success('新建成功')
              this.initTableData()
              this.modal.isShow = false
            } else {
              if (data.errorField && data.errorMessage) {
                this.modal.form[data.errorField + 'Error'] = data.errorMessage
              }
            }
          })
        } else {
          questionEdit(this.getFormData()).then(data => {
            if (data.isSuccess) {
              this.$Message.success('修改成功')
              this.initTableData()
              this.modal.isShow = false
            } else {
              if (data.errorField && data.errorMessage) {
                this.modal.form[data.errorField + 'Error'] = data.errorMessage
              }
            }
          })
        }
      }
    },
    getFormData () {
      const obj = {
        type: this.modal.form.type,
        category: this.modal.form.category,
        topic: this.modal.form.topic,
        answer: this.isJudgement ? this.modal.form.answer : this.optionsAnswer,
        description: this.modal.form.description
      }
      if (!this.isCreate) {
        obj.id = this.modal.form.id
      }
      if (!this.isJudgement) {
        obj.options = this.modal.form.options
      }
      return obj
    },
    onModalCancel () {},
    onModalVisibleChange (isShow) {
      if (!isShow) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          document.querySelector('.has-scorll-body.question-list .modal-body-overflow').scrollTop = 0
        })
      }
    },
    isModalFormValid () {
      const me = this
      return new Promise((resolve) => {
        me.$refs.form.validate(isValid => {
          if (!isValid) {
            resolve(false)
          }
          // check table
          const checkOptionTable = me.isOptionTableValid()
          if (checkOptionTable === true) {
            resolve(true)
          } else {
            me.modal.form.optionError = checkOptionTable
            resolve(false)
          }
        })
      })
    },
    isOptionTableValid () {
      if (this.isJudgement) {
        return true
      }
      const options = this.modal.form.options
      const answerLength = options.filter(o => o.isRight).length
      if (this.isJudgement) {
        if (options.length === 2 && answerLength === 1) {
          return true
        } else {
          return '选择题选项数量为2,且有1个正确答案'
        }
      } else {
        if (!options.every(o => !!o.text)) {
          return '选项内容不能为空'
        }
        if (this.isSingle) {
          if (answerLength === 1) {
            return true
          } else {
            return '单选题正确答案只有1个'
          }
        } else {
          if (answerLength > 0) {
            return true
          } else {
            return '多选题至少有1个正确答案'
          }
        }
      }
    },
    onTypeChange () {
      const options = this.isJudgement ? this.modal.form.judgementOptions : this.modal.form.selectOptions
      if (this.isJudgement) {
        this.modal.form.answer = '1'
      }
      this.modal.form.options = cloneDeep(options)
      this.updateTableColumn()
    },
    // modal table
    rowClassName (row) {
      return row.isRight ? 'high-row' : ''
    },
    updateOptionText (row, text) {
      const option = this.modal.form.options.find(o => o.key === row.key)
      option.text = text
    },
    onRightAnswerChange (row, isChecked) {
      if (this.modal.form.type === QuestionType.Multiple) {
        this.modal.form.options.find(o => o.key === row.key).isRight = isChecked
      } else {
        this.modal.form.options.forEach(o => {
          if (isChecked) {
            o.isRight = (o.key === row.key)
          } else {
            o.isRight = false
          }
        })
      }
    },
    onOptionRowAdd () {
      const lastKey = last(this.modal.form.options).key
      const nextKey = String.fromCharCode(lastKey.charCodeAt() + 1).toUpperCase()
      this.modal.form.options.push({key: nextKey, text: 'option ' + nextKey, isRight: false})
    },
    updateTableColumn () {
      if (this.isJudgement) {
        delete this.modal.form.optionsColumns0[0].width
        this.modal.form.optionsColumns = this.modal.form.optionsColumns0.filter(c => c.key !== 'text')
      } else {
        this.modal.form.optionsColumns0[0].width = 100
        this.modal.form.optionsColumns = this.modal.form.optionsColumns0
      }
    }
  },
  computed: {
    ...mapGetters(['tableHeight']),
    filterCategoryList () {
      return [{name: '所有', id: 'all', isBolder: true}, {name: '未分类', id: 'null', isBolder: true}, ...this.categoryList]
    },
    filterTypeList () {
      return [{name: '所有', id: 'all', isBolder: true}, ...this.modal.typeOptions]
    },
    filterCondition () {
      return {
        type: this.filter.type,
        category: this.filter.category,
        content: this.filter.content
      }
    },
    isCreate () {
      return !this.modal.form.id
    },
    modalTitle () {
      return this.isCreate ? '新建题目' : '编辑题目'
    },
    isJudgement () {
      return this.modal.form.type === QuestionType.Judgement
    },
    isSingle () {
      return this.modal.form.type === QuestionType.Single
    },
    isMultiple () {
      return this.modal.form.type === QuestionType.Multiple
    },
    optionTableColumn () {
      if (this.isJudgement) {
        return this.modal.form.optionsColumns.filter(c => c.key !== 'text')
      } else {
        return this.modal.form.optionsColumns
      }
    },
    optionTableData () {
      if (this.isJudgement || this.modal.form.options.length > 10) {
        return this.modal.form.options
      } else {
        return this.modal.form.options.concat(this.modal.form.addOption)
      }
    },
    optionsAnswer () {
      return this.modal.form.options.filter(o => o.isRight).map(o => o.key.toUpperCase())
    }
  },
  watch: {
    filterCondition: {
      handler (newCon, oldCon) {
        if (newCon.type !== oldCon.type || newCon.category.join(';') !== oldCon.category.join(';') || newCon.content !== oldCon.content) {
          if (this.paging.total < 0) {
            this.initTableData()
          } else {
            this.initTableByFilter()
          }
        }
      }
    },
    'filter.category' (newIds, oldIds) {
      if (newIds.length === oldIds.length) {
        return
      }
      const [newHasAll, oldHasALl] = [newIds.includes('all'), oldIds.includes('all')]
      if (newHasAll && !oldHasALl) {
        this.filter.category = this.filterCategoryList.map(o => o.id)
      } else if (newHasAll && newIds.length < this.filterCategoryList.length) {
        this.filter.category = this.filter.category.filter(o => o !== 'all')
      } else if (!newHasAll && newIds.length === this.filterCategoryList.length - 1) {
        if (oldHasALl) {
          this.filter.category = []
        } else {
          this.filter.category = this.filterCategoryList.map(o => o.id)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/color.scss';
.options-table {
  /deep/ .ivu-table-tbody {
    tr.ivu-table-row.high-row td {
      background-color: fade-out($color-success, 0.85);
    }
  }
}
</style>
