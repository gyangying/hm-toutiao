<template>
<div class='container-setting'>
  <com-a></com-a>
  <com-b></com-b>
  <el-card>
    <div solt="header">
      <my-bread>个人设置</my-bread>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机：">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="user.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveSetting()" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
           class="avatar-uploader"
           action=""
           :show-file-list="false"
           :http-request="uploadImage"
           >
            <img v-if="user.photo" :src="user.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </div>
  </el-card>
</div>
</template>

<script>
import auth from '@/utils/auth'
import eventBus from '@/eventBus'
import ComA from '@/components/com-a'
import ComB from '@/components/com-b'
export default {
  name: 'app-setting',
  components: { ComA, ComB },
  data () {
    return {
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async uploadImage ({ file }) {
      const fd = new FormData()
      fd.append('photo', file)
      const res = await this.$http.patch('user/photo', fd)
      this.user.photo = res.data.data.photo
      const user = auth.getUser()
      user.photo = res.data.data.photo
      auth.setUser(user)
      eventBus.$emit('updateUserPhoto', res.data.data.photo)
      this.$message.success('修改用户头像成功')
    },
    async saveSetting () {
      try {
        const { name, intro, email } = this.user
        await this.$http.patch('user/profile', { name, intro, email })
        this.$message.success('保存个人信息成功')
        const user = auth.getUser()
        user.name = name
        auth.setUser(user)
        eventBus.$emit('updateUserName', name)
      } catch (e) {
        this.$message.error('保存个人信息失败')
      }
    },
    async getUserInfo () {
      const res = await this.$http.get('user/profile')
      this.user = res.data.data
    }
  }
}
</script>

<style scoped lang='less'></style>
