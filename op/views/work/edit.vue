<template>
  <a-form :model="form" ref="workForm" layout="vertical">
    <a-form-item field="title" label="名称" :rules="rules.title" :validate-trigger="['change', 'input']">
      <a-input v-model="form.title" placeholder="please enter work name" :max-length="32" allow-clear show-word-limit/>
    </a-form-item>
    <a-form-item field="type" label="链接类型">
      <a-radio-group v-model="form.type">
        <a-radio :value="URL_TYPE.link">外链</a-radio>
        <a-radio :value="URL_TYPE.routerName">路由</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item field="link" :label="linkLabel" :rules="rules.link" :validate-trigger="['change', 'input']">
      <a-input v-model="form.link" placeholder="please enter link" :max-length="256" allow-clear show-word-limit/>
    </a-form-item>
    <a-form-item field="category" label="类别" :rules="rules.category" :validate-trigger="['change', 'input']">
      <a-select v-model="form.category">
        <a-option v-for="item in categoryList" :key="item" :value="item">{{item}}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="description" label="描述" :rules="rules.description" :validate-trigger="['change', 'input']">
      <a-textarea v-model="form.description" placeholder="Please enter description" :max-length="128" allow-clear show-word-limit/>
    </a-form-item>
    <a-form-item field="img" label="缩略图">
      <a-upload ref="upload" v-model="form.img" accept="image/jpeg, image/png" :limit="1" :auto-upload="false"
        @change="onUploadChange"></a-upload>
      <a-button v-if="form.imgAfterCrop" size="mini" status="danger" @click="deleteImg">删除</a-button>
    </a-form-item>
    <div class="copper-preview">
      <template v-if="form.imgAfterCrop">
        <a-image :src="form.imgAfterCrop" width="100%"/>
      </template>
      <a-empty v-else>
        <template #image>
          <icon-exclamation-circle-fill />
        </template>
        请上传图片
      </a-empty>
    </div>
  </a-form>
  <a-modal :visible="modal.isShow" :mask-closable="false"
      @ok="imgCropperOk" @cancel="imgCropperCancel" @close="onModalClose" unmountOnClose>
    <template #title>裁剪</template>
    <vue-picture-cropper
      ref="picCropper"
      :boxStyle="{
        height: '200px',
        backgroundColor: '#f8f8f8',
        margin: 'auto'
      }"
      :img="form.img"
      :options="{
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: 16 / 9,
        preview: '#preview_wrap',
      }"/>
    <div id="preview_wrap"></div>
  </a-modal>
  <a-divider />
  <div class="d-flex j-end">
    <a-button style="margin-right:20px;">取消</a-button>
    <a-button type="primary" @click="onSaveClick">确定</a-button>
  </div>
</template>

<script>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import {addWork, getWork} from 'op/api/op'
import { mapMutations } from 'vuex'
import { Message } from '@arco-design/web-vue'
import {KEY_WORK} from 'op/constant'

const URL_TYPE = {
  link: 0, routerName: 1
}

export default {
  props: {
    id: ''
  },
  components: {VuePictureCropper},
  data () {
    return {
      form: {
        title: '',
        type: URL_TYPE.link,
        link: '',
        description: '',
        img: '',
        imgAfterCrop: '',
        imgFile: null,
        category: null,
      },
      rules: {
        title: [{required: true, message: '名称必填'}],
        link: [{required: true, message: '必填'}],
        category: [{required: true, message: '类别必填'}],
      },
      modal: {
        isShow: false,
      },
      URL_TYPE,
      categoryList: ['JavaScript', 'CSS', 'APP'],
      disable: false,
      fileList: [],
    }
  },
  created () {
    if (this.isEdit) {
      this.initEditData()
    }
  },
  methods: {
    ...mapMutations(['loading']),
    async initEditData () {
      function getData () {
        return new Promise((resolve, reject) => {
          try {
            let tmpObj = JSON.parse(localStorage.getItem(KEY_WORK))
            localStorage.removeItem(KEY_WORK)
            console.assert(tmpObj.id === curId)
            resolve(tmpObj)
          } catch (err) {
            // get by api
            getWork(curId).then(res => {
              resolve(res)
            })
          }
        })
      }
      const curId = this.id
      const curObj = await getData(curId)
      Object.assign(this.form, curObj)
      if (curObj.img) {
        const imgSrc = location.origin + curObj.img
        this.fileList = [{
          uid: curObj.id,
          name: curObj.img.split('/').pop(),
          url: imgSrc
        }]
        this.form.imgAfterCrop = imgSrc
      }
    },
    onUploadChange (fileList) {
      if (fileList.length === 1) {
        const imgFile = fileList[0]
        this.form.img = imgFile.url
        this.modal.isShow = true
      } else {
        Object.assign(this.form, {
          img: '',
          imgAfterCrop: '',
          imgFile: '',
        })
      }
    },
    imgCropperOk () {
      this.form.imgAfterCrop = this.$refs.picCropper.getDataURL()
      this.$refs.picCropper.getFile().then(file => {
        this.form.imgFile = file
      })
      this.imgCropperCancel()
    },
    imgCropperCancel () {
      this.modal.isShow = false
    },
    deleteImg () {
      Object.assign(this.form, {
        img: '',
        imgAfterCrop: '',
        imgFile: null
      })
    },
    onModalClose () {},
    validateForm () {
      let formRef = this.$refs.workForm
      return new Promise(function (resolve, reject) {
        formRef.validate().then(errors => {
          resolve(!errors)
        })
      })
    },
    getFormData () {
      let formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('type', this.form.type)
      formData.append('link', this.form.link)
      formData.append('description', this.form.description)
      formData.append('category', this.form.category)

      if (this.form.imgFile) {
        formData.append('workUploadImg', this.form.imgFile)
      } else if (this.isEdit && !this.form.imgFile) {
        formData.append('workUploadImg', '')
      }
      if (this.isEdit) {
        formData.append('id', this.id)
      }
      return formData
    },
    async onSaveClick () {
      if (this.disable && !(await this.validateForm())) return
      this.disable = true
      this.loading(true)
      addWork(this.getFormData()).then(res => {
        if (res.isSuccess) {
          Message.success(`${this.isEdit ? '编辑' : '新建'}成功`)
          setTimeout(() => {
            this.$router.push({name: 'Work_List'})
          }, 1500)
        } else {
          Message.success(`${this.isEdit ? '编辑' : '新建'}失败`)
          this.disable = false
        }
      }).finally(() => {
        this.loading(false)
      })
    }
  },
  computed: {
    linkLabel () {
      return this.form.type === URL_TYPE.link ? 'URL' : 'RouterName'
    },
    isEdit () {
      return !!this.id
    }
  },
}
</script>

<style lang="less" scoped>
#preview_wrap {
  width: 160px;
  height: 90px;
  overflow: hidden;
  margin-top: 20px;
  border: 1px solid #CCC;
}
.copper-preview {
  border: 1px solid #CCC;
  height: 180px;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
