<template>
  <div class="my-image">
    <div class="img_btn" @click="openDialog()">
      <img :src="value || imageBtnUrl" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="list">
            <div v-loading="loading">
              <el-radio-group v-model="reqParams.collect" @click="changeCollect" size="small">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <div class="img-list">
                <div @click="selectedImage(item.url)" :class="{selected:selectedImageUrl === item.url}" class="img-item" v-for="item in images" :key="item.id">
                  <img :src="item.url" alt />
                </div>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              hide-on-single-page
              :total="total"
              :current-page="reqParams.page"
              :page-size="reqParams.per_page"
              @current-change="pager"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="uploadHeaders"
              :show-file-list="false"
              :on-success="handleSuccess"
            >
              <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/auth'
import defaultImage from '@/assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      images: [],
      dialogVisible: false,
      activeName: 'list',
      loading: false,
      selectedImageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      uploadImageUrl: null,
      imageBtnUrl: defaultImage
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'list') {
        if (!this.selectedImageUrl) return this.$message.waring('请选中一张素材图')
        // this.imageBtnUrl = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.uploadImageUrl) return this.$message.waring('请上传一张素材图')
        // this.imageBtnUrl = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess (res) {
      this.$message.success('上传成功')
      this.uploadImageUrl = res.data.url
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
      this.activeName = 'list'
      this.selectedImageUrl = null
      this.uploadImageUrl = null 
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const res = await this.$http.get('user/images', {
        params: this.reqParams
      })
      this.loading = false
      this.images = res.data.data.results
      this.total = res.data.data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  padding-top: 20px;
  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3) url(../assets/images/selected.png) no-repeat center/ 50px auto;
    }
  }
}
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.img_btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
