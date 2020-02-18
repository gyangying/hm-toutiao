<template>
<div class='container-publish'>
  <el-card>
    <div slot="header">
      <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
    </div>
    <el-form label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="articleForm.title" style="width:400px" palceholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <div v-if="articleForm.cover.type===1">
          <my-image v-model="articleForm.cover.images[0]"></my-image>
        </div>
        <div v-if="articleForm.cover.type===3">
          <my-image :key="i" v-for="i in 3" v-model="articleForm.cover.images[i-1]"></my-image>
        </div>
      </el-form-item>
      <el-form-item label="频道：">
        <my-channel v-model="articleForm.channel_id"></my-channel>
      </el-form-item>
      <el-form-item v-if="$route.query.id">
        <el-button @click="update()" type="success">修改文章</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button @click="submit(false)" type="primary">发布文本</el-button>
        <el-button @click="submit(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
// import MyImage from '@/components/my-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'app-publish',
  components: { quillEditor },
  data () {
    return {
      articleForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getArticle()
    }
  },
  watch: {
    '$route.query.id': function () {
      this.toggleFormInfo()
    }
  },
  methods: {
    async update () {
      try {
        await this.$http.put(`articles/${this.articleForm.id}?draft=false`, this.articleForm)
        this.$message.success('修改成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('修改失败')
      }
    },
    toggleFormInfo () {
      if (this.$route.query.id) {
        this.getArticle()
      } else {
        this.articleForm = {
          title: null,
          channel_id: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    },
    async getArticle () {
      const res = await this.$http.get(`articles/${this.$route.query.id}`)
      this.articleForm = res.data.data
    },
    async submit (draft) {
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articleForm)
        this.$message.success(draft ? '存入草稿' : '发布成功')
        this.$router.push('/article')
      } catch (e) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
