<template>
  <div class="container-article">
    <el-card>
      <div slot="header" >
        <my-bread>素材管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="filterData.channel_id"></my-channel>
          <!-- <el-select v-model="filterData.channel_id"
            @change="changeChannel"
            clearable
          placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width=150px;height:100px">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width:120px>
          <template slot-scope="scope">
            <el-button @click="toEditArticle(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="delArticle(scope.row.id)" plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        @current-change="pager"
        :current-page="filterData.page"
        :page-size="filterData.per_page"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import MyChannel from '@/components/my-channel'
import MyBread from '@/components/my-bread'
export default {
  name: 'app-article',
  components: { MyBread },
  data () {
    return {
      articles: [],
      total: 0,
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [
        { label: '前端', value: 1 },
        { label: '数据库', value: 2 }
      ],
      dateArr: []
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    delArticle (id) {
      this.$confirm('删吗','说你呢',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await this.$http.delete(`article/${id}`)
          this.$message.success('删除成功')
          this.getArticles()
        } catch (e) {
          this.$messgage.error('删失败')
        }
      }).catch(() => {})
    },
    toEditArticle (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // changeChannel () {
    //   if (this.filterData.channel_id === '') {
    //     this.filterData.channel_id = null
    //   }
    // },
    changeDate (value) {
      if (value) {
        this.filterData.begin_pubdate = value[0] 
        this.filterData.end_pubdate = value[1]
      } else {
        this.filterData.begin_pubdate = null 
        this.filterData.end_pubdate = null
      }
    },
    search () {
      this.filterData.page = 1
      this.getArticles()
    },
    pager (newPage) {
      this.filterData.page = newPage
      this.getArticles()
    },
    // async getChannelOptions () {
    //   const res = await this.$http.get('channels')
    //   this.channelOptions = res.data.data.channels
    // },
    async getArticles () {
      const res = await this.$http.get('articles', { params: this.filterData })
      this.articles = res.data.data.results
      // console.log(this.articles)
      this.total = res.data.data.total_count
    }
  }
}
</script>

<style scoped lang="less"></style>
