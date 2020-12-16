<template>
  <div class="box" direction="column">
    <div class="flex" justify-content="space-between" style="padding:16px 0 0;">
      <div align="left" style="font-weight:bold;">最新文章</div>
      <div>
        <div v-if="IsLogin">
          <el-button disabled>登录写文章</el-button>
        </div>
        <div v-else>
          <el-button type="primary" @click="onCreate">创建文章</el-button>
        </div>
      </div>
    </div>
    <div class="tabs-box">
      <el-tabs class="tabs-item" tab-position="bottom" type="card" v-model="currentTag" @tab-click="tabClick">
        <el-tab-pane class="tab-pane-item" :label="item.label" :name="item.value" v-for="(item, index) in this.Tags" :key="index"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="article-list-wrap">
      <div class="flex article-list-box pointer" justify-content="space-between" align="left" v-for="(item, index) in articles" :key="index" :title="item.title + ' -- ' + '标签:' + item.tag + ' -- ' + '作者:' + item.author" @click="change(item)">
        <div class="flex" justify-content="flex-start" style="width:100%;">
          <div align="right" align-items="center" style="width:15%;font-size:14px;">{{item.createtime | timestampFormet}}</div>
          <div class="ellipsis article-title" align-items="center" style="width:70%;">{{item.title}}</div>
          <div class="article-tag-box"><el-tag type="warning" class="article-tag-item" style="width:100%;text-align:center;">{{item.tag}}</el-tag></div>
        </div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
    <div class="author-wrap">
      <div>作者：孙锋锋</div>
      <div>就职于赞同科技</div>
    </div>
    <!-- <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'MainArticleList',
  data () {
    return {
      languages: [],
      Articles: [], // 文章列表
      articles: [], // 文章列表
      total: 0, // 文章总数
      Tags: [], // 标签列表
      currentTag: '全部', // 当前标签
      currentPage: 1
    }
  },
  props: {
    // articles: Array,
    // total: Number,
    pageSize: Number
  },
  computed: {
    // Tags () {
    //   return this.$store.state.tags
    // },
    IsLogin () {
      return !(this.$store.state.userInfo.username)
    }
  },
  mounted () {
    axios({
      method: "POST",
      url: 'http://localhost:8888/home',
      headers: {'content-type': 'application/json'},
      data: {}
    }).then(res => {
      console.log(res)
      if (res.data.returnCode === '000000') {
        if (res.data.data.languages.length > 0) {
          this.languages = res.data.data.languages // 保留nav,创建文章页面需要用到
          this.Tags = this.getTags(this.languages) // 获取tags
        }
        if (res.data.data.articles && res.data.data.articles.length > 0) {
          let atc = res.data.data.articles
          let result = []
          let fenlei = atc[0].module
          for (let i = 0; i < atc.length; i++) {
            if (atc[i].module === fenlei) {
              result.push(atc[i])
            }
          }
          this.total = result.length // 总条数
          this.Articles = JSON.parse(JSON.stringify(result)) // 文章列表 - 不变
          this.articles = JSON.parse(JSON.stringify(result)) // 文章列表
        }
      }
    })
  },
  methods: {
    getTags (languages) {
      let tag = languages[0].tag
      let tmpResult = tag.split(',')
      let result = []
      result.push({
        value: '全部',
        label: '全部'
      })
      for (let i = 0; i < tmpResult.length; i++) {
        let obj = {}
        obj.value = tmpResult[i]
        obj.label = tmpResult[i]
        result.push(obj)
      }
      return result
    },
    onCreate () {
      let params = {
        tag: this.Tags,
        languages: this.languages
      }
      this.$router.push({ path: '/create/createArticle', name: 'CreateArticle', params })
    },
    change (content) {
      this.$emit('change-editor', content)
    },
    // 点击标签事件
    tabClick (e) {
      console.log(this.currentTag)
      if (this.currentTag === '全部') {
        this.articles = this.Articles
      } else {
        this.articles = this.Articles.filter((item) => {
          return item.tag === this.currentTag
        })
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}:${this.currentPage}`)
      this.$emit('pagination-change', {currentPage: val, tag: this.value})
    },
    fn () {
      this.value = 'all'
    },
    setTags (tags) {
      let tmpResult = tags.split(',')
      let result = []
      result.push({
        value: '全部',
        label: '全部'
      })
      for (let i = 0; i < tmpResult.length; i++) {
        let obj = {}
        obj.value = tmpResult[i]
        obj.label = tmpResult[i]
        result.push(obj)
      }
      this.Tags = result
      this.currentTag = '全部'
      this.articles = this.Articles
    }
  }
}
</script>
<style scoped>
.box {
  padding: 0 10px;
  /* line-height: 2.4; */
  font-size: 18px;
}
.box > div {
  width: 100%;
}
.article-list-wrap {
  /* min-height: 460px; */
  height: 552px;
  box-sizing: border-box;
  overflow: auto;
  border: 1px solid #E4E7ED;
  border-top: none;
  /* background: #f5f7fa; */
}
.article-list-box {
  /* border-bottom: 1px solid #ccc; */
  box-sizing: border-box;
  transition: all .3s;
  height: 46px;
}
.article-list-box:hover {
  background: #eaecef;
}
.article-title {
  box-sizing: border-box;
  text-indent: 1rem;
}
.tag {
  width: 15%;
}
.tab-pane-item {
  width: 80px;
}
.tabs-box .el-tabs__header{
  background: #f5f7fa;
}
</style>
<style>
.tabs-box .el-tabs__header{
  background: #f5f7fa;
}
.tabs-box .is-active {
  background: #fff;
}

/* 标签样式 */
.article-tag-box {
  width: 12%;
}
.article-tag-item {
  height: 24px;
  line-height: 24px;
  width: 100%;
  overflow: hidden;
}

 /*滚动条样式*/
 .article-list-wrap::-webkit-scrollbar {/*滚动条整体样式*/
  width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 16px;
  /* height: var(--option-scrollbar-height); */
}
.article-list-wrap::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: var(--option-scrollbar-radius);
  background: #b7b7b7;
}
.article-list-wrap::-webkit-scrollbar-thumb:hover,::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
.article-list-wrap::-webkit-scrollbar-track {/*滚动条里面轨道*/
  background: var(--option-scrollbar-track-bg);
}
</style>
