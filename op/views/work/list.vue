<template>
  <div>
    <page-table ref="table" :pageApi="getWorks" :isPagination="false" :columns="column"
      size="small" @create-btn="onCreateBtn"></page-table>
    <a-modal :visible="modal.isShow" @cancel="modal.isShow=false">
      <template #title>
        {{modalTitle}}
      </template>
      <a-form :model="modal.form" ref="workForm">
        <a-form-item field="title" label="名称" :rules="modal.rules.name" :validate-trigger="['change', 'input']">
          <a-input v-model="modal.form.name" placeholder="please enter work name" :max-length="32" allow-clear show-word-limit/>
        </a-form-item>
        <a-form-item field="description" label="描述" :rules="modal.rules.description" :validate-trigger="['change', 'input']">
          <a-input v-model="modal.form.description" placeholder="please enter work description" :max-length="128" allow-clear show-word-limit/>
        </a-form-item>
        <a-form-item field="img" label="缩略图">
          
          <VuePictureCropper
            :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f8f8',
              margin: 'auto',
            }"
            :img="modal.form.img"
            :options="{
              viewMode: 1,
              dragMode: 'crop',
              aspectRatio: 16 / 9,
              preview: 'img.copper-preview'
            }"
          />
          <img class="copper-preview">
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import pageTable from 'op/component/page-table'
import {getWorks} from 'op/api/op'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import myImg from '@/assets/image_header.jpg'
export default {
  components: {pageTable, VuePictureCropper},
  data () {
    return {
      getWorks,
      column: [
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '描述',
          dataIndex: 'description'
        }
      ],
      modal: {
        isShow: false,
        form: {
          id: '',
          title: '',
          description: '',
          img: myImg
        },
        rules: {
          name: [
            {required: true, message: '名称必填'}
          ]
        }
      }
    }
  },
  created () {
  },
  methods: {
    onCreateBtn () {
      this.modal.isShow = true
    }
  },
  computed: {
    isEdit () {
      return !!this.modal.form.id
    },
    modalTitle () {
      return this.isEdit ? '编辑作品' : '新建作品'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
