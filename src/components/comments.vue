<template>
  <div>
    <a-empty v-if="list.length===0" description="快来抢占沙发"/>
    <a-comment v-for="chat1 in list" :key="chat1.id"
      :author="chat1.name" :avatar="chat1.avatar" :content="chat1.content"
      :datetime="chat1.create_datetime"
    >
      <template v-for="chat2 in chat1.sub" :key="chat2.id">
        <a-comment :author="chat2.name" :avatar="chat2.avatar" :content="chat2.content"
          :datetime="chat2.create_datetime"></a-comment>
      </template>
    </a-comment>
    <a-divider />
    <a-comment :author="userName" :avatar="userAvatarSrc" align="right">
      <template #avatar>
        <a-avatar v-if="userAvatar" :size="26">
          <img :src="userAvatarSrc" />
        </a-avatar>
        <a-avatar v-else :style="{ backgroundColor: 'var(--color-fill-4)' }" :size="26">
          <IconUser />
        </a-avatar>
      </template>
      <template #content>
        <a-input v-model="reply" placeholder="Leave your comment here." size="small" allow-clear :max-length="64" show-word-limit/>
      </template>
      <template #actions>
        <a-button key="1" type="primary" size="mini" @click="onReplyBtn"> Reply </a-button>
      </template>
    </a-comment>
    <a-modal :visible="modal.isShow" @cancel="modal.isShow=false" @ok="onModalOK" @close="onModalClose">
      <template #title>用户信息</template>
      <a-form :model="modal.form" ref="userInfoForm">
        <a-form-item field="name" label="昵称" :rules="modal.rules.name">
          <a-input v-model="modal.form.name" placeholder="怎么称呼您" size="small"
            :max-length="16" allow-clear show-word-limit/>
        </a-form-item>
        <a-form-item field="avatar" label="头像" :rules="modal.rules.avatar">
          <div class="avatar-list">
            <img v-for="(val,key) in avatarList" :key="key" :src="val" :class="{active:key===modal.form.avatar}"
              @click="onAvatarSelect(key)">
          </div>
        </a-form-item>
        <a-form-item field="email" label="E-mail" :rules="modal.rules.email">
          <a-input v-model="modal.form.email" placeholder="请输入email,有回复可以通知您" size="small"
            :max-length="128" allow-clear/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-vue/es/icon'
import { avatarList, getAvatar } from '@/components/avatar'
import { mapGetters, mapMutations } from 'vuex'
import {webUserCreate, getComment, addComment} from 'op/api/op'
import { Message } from '@arco-design/web-vue'

export default {
  components: {
    IconHeart,
    IconMessage,
    IconStar,
  },
  props: {
    resourceId: ''
  },
  data () {
    return {
      avatarList,
      reply: '',
      list: [],
      modal: {
        isShow: false,
        form: {
          name: '',
          avatar: '',
          id: '',
          email: ''
        },
        rules: {
          name: [
            {required: true, message: '请告诉我怎么称呼您'}
          ],
          avatar: [
            {required: true, message: '不选一个头像吗?'}
          ],
          email: [
            {type: 'email', message: '请检查email格式'}
          ]
        },
        disable: false
      }
    }
  },
  created () {
    this.initUserInfo()
    this.initCommentList()
  },
  methods: {
    ...mapMutations(['loading', 'updateUserInfo']),
    initUserInfo () {
      Object.assign(this.modal.form, {
        name: this.userName,
        avatar: this.userAvatar,
        id: this.userId,
        email: this.userEmail
      })
    },
    initCommentList () {
      getComment(this.resourceId).then(res => {
        this.list = res
        this.$emit('comment-change', res)
        this.renderChatList()
      })
    },
    onReplyBtn () {
      if (this.userInfoIsReady) {
        this.loading(true)
        addComment({
          userId: this.userId,
          content: this.reply,
          resourceId: this.resourceId
        }).then(res => {
          if (res.isSuccess) {
            this.cleanReply()
            Message.success('留言成功')
            this.initCommentList()
          } else {
            Message.error(res.errorMsg || '留言失败')
          }
        }).finally(() => {
          this.loading(false)
        })
      } else {
        this.modal.isShow = true
      }
    },
    onAvatarSelect (avatar) {
      this.modal.form.avatar = avatar
    },
    onModalOK () {
      if (this.modal.disable) return
      this.$refs.userInfoForm.validate().then(error => {
        if (!error) {
          this.modal.disable = true
          this.loading(true)
          webUserCreate(this.modal.form.name, this.modal.form.avatar, this.modal.form.email)
            .then(res => {
              if (res.isSuccess) {
                Message.success('保存成功')
                this.modal.isShow = false
                this.updateUserInfo(res.user)
              } else {
                Message.error(res.errorMsg || '保存失败')
              }
            }).finally(() => {
              this.modal.disable = false
              this.loading(false)
            })
        }
      })
    },
    onModalClose () {
      this.$refs.userInfoForm.resetFields()
    },
    cleanReply () {
      this.reply = ''
    },
    renderChatList () {
      this.list.forEach(c => {
        c.avatar = getAvatar(c.avatar)
      })
      let list = this.list.filter(i => !i.parent_comment_id)
      list.forEach(chat1 => {
        chat1.sub = this.list.filter(chat2 => chat2.parent_comment_id === chat1.id)
      })
      this.list = list
    }
  },
  computed: {
    ...mapGetters(['userId', 'userName', 'userAvatar', 'userEmail']),
    userInfoIsReady () {
      return this.userId && this.userName && this.userAvatar
    },
    userAvatarSrc () {
      if (this.userAvatar) {
        return getAvatar(this.userAvatar)
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped lang="less">
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
.avatar-list {
  @avatar-size: 10%;
  padding: 5px 5px 0 5px;
  border: 1.5px solid var(--color-text-4);
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  img {
    width: @avatar-size;
    height: @avatar-size;
    padding: 2px;
    border: 1px solid transparent;
    opacity: .2;
    cursor: pointer;
    margin-bottom: 5px;
    &.active {
      opacity: 1;
      border-color: red;
    }
    &:hover {
      opacity: 1;
    }
  }
}
.username-text {
  color: var(--color-text-2);
  font-size: 12px;
}
</style>