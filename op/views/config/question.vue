<template>
  <div id="config-question">
    <Tabs type="card" :animated="false" size="small" v-model="tabIdx">
      <TabPane label="专项答题" name="Category">
        <Form ref="formCategory" :model="form" :label-width="150" :rules="rule">
          <FormItem label="每局题目数量" prop="category_count_game">
            <InputNumber :max="999" :min="1" v-model="form.category_count_game" size="default" class="form-control"></InputNumber>
            <span class="unit">个</span>
          </FormItem>
          <FormItem label="每局时间" prop="category_time">
            <InputNumber :max="10800" :min="1" v-model="form.category_time" size="default" class="form-control"></InputNumber>
            <span class="unit">秒 ({{ form.category_time | parseSecond2Minute}})</span>
          </FormItem>
          <FormItem label="每题分值" prop="category_per_score">
            <InputNumber :max="100" :min="1" v-model="form.category_per_score" size="default" class="form-control"></InputNumber>
            <span class="unit">分</span>
          </FormItem>
          <FormItem label="每人每日参与限制" prop="category_isLimit">
            <i-Switch v-model="form.category_isLimit" class="form-control switch-control"></i-Switch>
            <span class="unit">{{form.category_isLimit ? '限制参与次数' : '不限制参与次数'}}</span>
          </FormItem>
          <FormItem label="最多参与次数" prop="category_freq_limit" v-if="form.category_isLimit">
            <InputNumber :max="999999" :min="1" v-model="form.category_freq_limit" size="default" class="form-control"></InputNumber>
            <span class="unit">次</span>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="每日答题" name="Daily">
        <Form ref="formDaily" :model="form" :label-width="150" :rules="rule">
          <FormItem label="每局题目数量" prop="daily_count_game">
            <InputNumber :max="999" :min="1" v-model="form.daily_count_game" size="default" class="form-control"></InputNumber>
            <span class="unit">个</span>
          </FormItem>
          <FormItem label="每局时间" prop="daily_time">
            <InputNumber :max="10800" :min="1" v-model="form.daily_time" size="default" class="form-control"></InputNumber>
            <span class="unit">秒 ({{ form.daily_time | parseSecond2Minute}})</span>
          </FormItem>
          <FormItem label="每题分值" prop="daily_per_score">
            <InputNumber :max="100" :min="1" v-model="form.daily_per_score" size="default" class="form-control"></InputNumber>
            <span class="unit">分</span>
          </FormItem>
          <FormItem label="每人每日参与限制" prop="daily_isLimit">
            <i-Switch v-model="form.daily_isLimit" class="form-control switch-control"></i-Switch>
            <span class="unit">{{form.daily_isLimit ? '限制参与次数' : '不限制参与次数'}}</span>
          </FormItem>
          <FormItem label="最多参与次数" prop="daily_freq_limit" v-if="form.daily_isLimit">
            <InputNumber :max="999999" :min="1" v-model="form.daily_freq_limit" size="default" class="form-control"></InputNumber>
            <span class="unit">次</span>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="多人答题" name="Multiple">
        <Form ref="formMultiple" :model="form" :label-width="150" :rules="rule">
          <FormItem label="每局时间" prop="multiple_time">
            <InputNumber :max="10800" :min="1" v-model="form.multiple_time" size="default" class="form-control"></InputNumber>
            <span class="unit">秒 ({{ form.multiple_time | parseSecond2Minute}})</span>
          </FormItem>
          <FormItem label="每题分值" prop="multiple_per_score">
            <InputNumber :max="100" :min="1" v-model="form.multiple_per_score" size="default" class="form-control"></InputNumber>
            <span class="unit">分</span>
          </FormItem>
          <FormItem label="获胜分数" prop="multiple_finish_score">
            <InputNumber :max="9999" :min="1" v-model="form.multiple_finish_score" size="default" class="form-control"></InputNumber>
            <span class="unit">分</span>
          </FormItem>
          <FormItem label="每人每日参与限制" prop="multiple_isLimit">
            <i-Switch v-model="form.multiple_isLimit" class="form-control switch-control"></i-Switch>
            <span class="unit">{{form.multiple_isLimit ? '限制参与次数' : '不限制参与次数'}}</span>
          </FormItem>
          <FormItem label="最多参与次数" prop="multiple_freq_limit" v-if="form.multiple_isLimit">
            <InputNumber :max="999999" :min="1" v-model="form.multiple_freq_limit" size="default" class="form-control"></InputNumber>
            <span class="unit">次</span>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
    <div class="btn-wrap">
      <Button type="primary" @click="onSave">保存</Button>
      <Button type="default">取消</Button>
    </div>
  </div>
</template>
<script>
import {getConfig, updateConfig} from 'op/api/op.js'
import {mapMutations} from 'vuex'
import {parseSecond2Minute} from '@/script/utils'
function ruleNumberMustRange ({min = 0, max = 100, isMust = true, rangeMsgAppend = ''}) {
  const rules = [
    { type: 'number', min: min, max: max, message: `范围${min}-${max}${rangeMsgAppend}`}
  ]
  if (isMust) {
    rules.push({ required: true, message: '必填项' })
  }
  return rules
}
export default {
  data () {
    return {
      tabIdx: 'Category',
      form: {
        category_count_game: null,
        category_time: null,
        category_per_score: null,
        category_isLimit: false,
        category_freq_limit: null,
        daily_count_game: null,
        daily_time: null,
        daily_per_score: null,
        daily_isLimit: false,
        daily_freq_limit: null,
        multiple_time: null,
        multiple_per_score: null,
        multiple_finish_score: null,
        multiple_isLimit: false,
        multiple_freq_limit: null
      },
      rule: {
        category_count_game: ruleNumberMustRange({min: 1, max: 999}),
        category_time: ruleNumberMustRange({min: 1, max: 10800, rangeMsgAppend: '(1秒到5小时)'}),
        category_per_score: ruleNumberMustRange({min: 1, max: 100}),
        category_freq_limit: ruleNumberMustRange({min: 1, max: 999999, isMust: false}),
        daily_count_game: ruleNumberMustRange({min: 1, max: 999}),
        daily_time: ruleNumberMustRange({min: 1, max: 10800, rangeMsgAppend: '(1秒到5小时)'}),
        daily_per_score: ruleNumberMustRange({min: 1, max: 100}),
        daily_freq_limit: ruleNumberMustRange({min: 1, max: 999999, isMust: false}),
        multiple_time: ruleNumberMustRange({min: 1, max: 10800, rangeMsgAppend: '(1秒到5小时)'}),
        multiple_per_score: ruleNumberMustRange({min: 1, max: 100}),
        multiple_finish_score: ruleNumberMustRange({min: 1, max: 9999}),
        multiple_freq_limit: ruleNumberMustRange({min: 1, max: 999999, isMust: false})
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapMutations(['loading']),
    initData () {
      this.loading(true)
      getConfig([
        'category_count_game', 'category_time', 'category_per_score', 'category_freq_limit',
        'daily_count_game', 'daily_time', 'daily_per_score', 'daily_freq_limit',
        'multiple_time', 'multiple_per_score', 'multiple_finish_score', 'multiple_freq_limit'
      ]).then(res => {
        Object.assign(this.form, res, {
          category_isLimit: res.category_freq_limit > 0,
          daily_isLimit: res.daily_freq_limit > 0,
          multiple_isLimit: res.multiple_freq_limit > 0
        })
        this.loading(false)
      })
    },
    isFormValid () {
      const formRef = this.$refs['form' + this.tabIdx]
      return new Promise((resolve) => {
        formRef.validate(isValid => {
          resolve(isValid)
        })
      })
    },
    getFormData () {
      const result = {}
      if (this.tabIdx === 'Category') {
        const category_freq_limit = this.form.category_isLimit ? this.form.category_freq_limit : -1
        Object.assign(result, {
          category_count_game: this.form.category_count_game,
          category_time: this.form.category_time,
          category_per_score: this.form.category_per_score,
          category_freq_limit
        })
      } else if (this.tabIdx === 'Daily') {
        const daily_freq_limit = this.form.daily_isLimit ? this.form.daily_freq_limit : -1
        Object.assign(result, {
          daily_count_game: this.form.daily_count_game,
          daily_time: this.form.daily_time,
          daily_per_score: this.form.daily_per_score,
          daily_freq_limit
        })
      } else if (this.tabIdx === 'Multiple') {
        const multiple_freq_limit = this.form.multiple_isLimit ? this.form.multiple_freq_limit : -1
        Object.assign(result, {
          multiple_time: this.form.multiple_time,
          multiple_per_score: this.form.multiple_per_score,
          multiple_finish_score: this.form.multiple_finish_score,
          multiple_freq_limit
        })
      }
      return result
    },
    async onSave () {
      const isFormValid = await this.isFormValid()
      if (isFormValid) {
        this.loading(true)
        const data = this.getFormData()
        updateConfig(data).then(res => {
          const isSuccess = res.isSuccess
          if (isSuccess) {
            this.$Message.success('更新成功')
            this.initData()
          } else {
            this.$Message.error('更新失败')
            this.loading(false)
          }
        })
      } else {
        this.$Message.warning('请检查配置是否正确')
      }
    }
  },
  filters: {
    parseSecond2Minute (val) {
      return parseSecond2Minute(val)
    }
  }
}
</script>
<style lang="scss" scoped>
#config-question {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /deep/ {
    form.ivu-form {
      .ivu-form-item-label {
        font-size: 14px;
        font-weight: bolder;
      }
      .form-control {
        &:not(.switch-control) {
          width: 90px;
        }
        &.switch-control {
          margin-right: 46px;
        }
      }
      .unit {
        margin-left: 15px;
      }
    }
  }
  .btn-wrap {
    padding-left: 20px;
    display: flex;
    justify-content: flex-end;
    & > button {
      width: 100px;
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}
</style>
