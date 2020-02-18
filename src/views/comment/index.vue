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
      <el-table-column label="评论状态">
        <template slot-scope="scope">
          {{scope.row.comment_status? '正常' : '关闭'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button @click="toggleStatus(scope.row)" v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
          <el-button @click="toggleStatus(scope.row)" v-else type="success" size="small">打开评论</el-button>
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
    toggleStatus (row) {
      const text1 = '关评论？？？关了，读者无法评论'
      const text2 = '打开评论？？？'
      this.$confirm(row.comment_status ? text1 : text2, '温馨提示', {
        confirmButtonText: 'sure',
        cancelButtonText: 'cancel',
        type: 'waring'
      }).then(async () => {
        try {
          const res = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          this.$message.success(res.data.data.allow_comment ? '打开评论' : '关闭评论')
          row.comment_status = res.data.data.allow_comment
        } catch (e) {
          this.$message.error('操作失败')
        }
      }).catch(() => {})
    },
    async getComments () {
      const res = await this.$http.get('articles', { params: this.reqParams })
      this.comments = res.data.data.results
      this.total = res.data.data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    }
  }
}
</script>

<style scoped lang='less'></style>
