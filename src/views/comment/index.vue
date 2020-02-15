<template>
<div class='container-comment'>
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="comments">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.comment_status? '正常' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
          <el-button v-else type="success" size="small">打开评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    style="margin-top:20px"
    background
    layout="prev, pager, next"
    :total="total"
    :current-page="reqParams.page"
    :page-size="reqParams.per_page"
    @current-change="changePager"
    ></el-pagination>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'app-comment',
  data () {
    return {
      total: 0,
      comments: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      }
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const data = await this.$http.get('article', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    }
  }
}
</script>

<style scoped lang='less'></style>
