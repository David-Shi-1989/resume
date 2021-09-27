<template>
  <div id="excel-upload">
    <div v-if="uploadSuccessWithData">
      <Alert type="success">上传成功，总计{{list.length}}道题目!</Alert>
      <Tabs value="single" :animated="false">
        <TabPane label="单选题" name="single">
          <pageTable :columns="columns" :data="singleData"></pageTable>
        </TabPane>
        <TabPane label="多选题" name="multiple">
          <pageTable :columns="columns" :data="multipleData"></pageTable>
        </TabPane>
        <TabPane label="判断题" name="judgement">
          <pageTable :columns="columns" :data="judgementData"></pageTable>
        </TabPane>
      </Tabs>
    </div>
    <div v-else>
      <div class="tpl-link">
        <a :href="tplUrl" download="模板">
          <img :src="excelImg">
          <span>模板下载</span>
        </a>
      </div>
      <Upload
        multiple
        type="drag"
        name="questionUpload"
        :headers="headers"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        action="/api/op/question/upload"
        :before-upload="beforeUpload"
        :on-success="onSuccess">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>单击或将文件拖动上传</p>
        </div>
      </Upload>
    </div>
  </div>
</template>
<script>
import {questionOptions, QuestionType} from '@/constant'
import { mapGetters } from 'vuex'
import {clearCategoryCache} from 'op/api/op.js'
import pageTable from 'op/components/paging-table.vue'
import excelImg from '@/assets/image/excel.svg'
export default {
  components: {pageTable},
  data () {
    return {
      excelImg,
      headers: {
        userId: ''
      },
      uploadSuccessWithData: false,
      // list: [],
      // eslint-disable-next-line
      // list: {"isSuccess":true,"list":[{"id":"","type":1,"category":"","categoryName":"娱乐","topic":"下面哪位是四大天王？","options":[{"key":"A","text":"周润发"},{"key":"B","text":"周星驰"},{"key":"C","text":"张雨生"},{"key":"D","text":"黎明"}],"answer":["D"],"create_time":null,"create_by":null,"create_method":2,"description":"","is_enable":1},{"id":"","type":1,"category":"","categoryName":"体育","topic":"2021年欧洲杯冠军是？","options":[{"key":"A","text":"法国"},{"key":"B","text":"葡萄牙"},{"key":"C","text":"意大利"},{"key":"D","text":"德国"}],"answer":["C"],"create_time":null,"create_by":null,"create_method":2,"description":"","is_enable":1},{"id":"","type":2,"category":"","categoryName":"娱乐","topic":"下面哪几位是港台明星？","options":[{"key":"A","text":"陆毅"},{"key":"B","text":"周星驰"},{"key":"C","text":"张雨生"},{"key":"D","text":"黎明"},{"key":"E","text":"王宝强"},{"key":"F","text":"张卫健"}],"answer":["B","C","F"],"create_time":null,"create_by":null,"create_method":2,"description":"","is_enable":1},{"id":"","type":2,"category":"","categoryName":"体育","topic":"下面哪几个球队是西班牙俱乐部？","options":[{"key":"A","text":"切尔西"},{"key":"B","text":"西班牙人"},{"key":"C","text":"尤文图斯"},{"key":"D","text":"皇家马德里"}],"answer":["B","D"],"create_time":null,"create_by":null,"create_method":2,"description":"","is_enable":1},{"id":"","type":3,"category":"","categoryName":"地理","topic":"安庆是安徽省的省会","options":[],"answer":false,"create_time":null,"create_by":null,"create_method":2,"description":"","is_enable":1},{"id":"","type":3,"category":"","categoryName":"化学","topic":"水是由氧和氢2种元素构成","options":[],"answer":true,"create_time":null,"create_by":null,"create_method":2,"description":"","is_enable":1}]}.list,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80
        },
        {
          title: '题型',
          key: 'type',
          width: 100,
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
          key: 'categoryName',
          width: 120
        },
        {
          title: '题目',
          key: 'topic'
        },
        {
          title: '选项',
          key: 'options',
          render: (h, params) => {
            const isJudgement = params.row.type === QuestionType.Judgement
            if (isJudgement) {
              return h('span', {
                attrs: {
                  class: 'color-sub'
                }
              }, '无')
            } else {
              const tagList = params.row.options.map(o => {
                const text = `${o.key}:${o.text}`
                return h('div', [h('Tag', {
                  props: {
                    color: params.row.answer.includes(o.key) ? 'success' : 'default'
                  }
                }, text)])
              })
              return h('div', tagList)
            }
          }
        },
        {
          title: '答案',
          key: 'answer',
          width: 120,
          render: (h, params) => {
            const answer = params.row.answer
            const isJudgement = params.row.type === QuestionType.Judgement
            let text = ''
            if (isJudgement) {
              text = answer ? '正确' : '错误'
            } else {
              text = answer.join('')
            }
            return h('span', text)
          }
        }
      ]
    }
  },
  created () {
    this.headers.userId = this.userId
  },
  methods: {
    beforeUpload () {
      this.list = []
    },
    onSuccess (res) {
      clearCategoryCache()
      if (res.isSuccess) {
        this.list = res.list
        if (this.list.length > 0 && this.list.length === res.successCount) {
          this.uploadSuccessWithData = true
          this.$Message.success('上传解析成功,共导入' + res.successCount + '题')
        } else if (this.list.length > 0 && this.list.length > res.successCount) {
          this.uploadSuccessWithData = true
          this.$Message.success(`上传解析成功,总计${this.list.length}题,成功导入${res.successCount}题`)
        } else {
          this.$Message.warn(`上传部分失败，解析${this.list.length}题,成功导入${res.successCount}题`)
        }
      } else {
        this.$Message.error('文件上传解析失败')
      }
    }
  },
  computed: {
    ...mapGetters(['userId']),
    singleData () {
      return this.list.filter(i => i.type === QuestionType.Single)
    },
    multipleData () {
      return this.list.filter(i => i.type === QuestionType.Multiple)
    },
    judgementData () {
      return this.list.filter(i => i.type === QuestionType.Judgement)
    },
    tplUrl () {
      return location.origin + '/static/file/tpl.xlsx'
    }
  }
}
</script>
<style lang="scss" scoped>
.tpl-link {
  $height: 40px;
  $img-height: 28px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  & > a {
    font-size: 13px;
    display: flex;
    align-items: center;
    line-height: $img-height;
    span {
      margin-left: 5px;
      display: inline-block;
      line-height: $img-height;
    }
  }
}
</style>
