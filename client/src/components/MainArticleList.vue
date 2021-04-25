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
      <div v-if="articles.length > 0">
        <div class="flex article-list-box pointer" :class="{'active': item.id === currentId}" justify-content="space-between" align="left"
          v-for="(item, index) in articles"
          :key="index"
          :title="item.title + ' -- ' + '标签:' + item.tag + ' -- ' + '作者:' + item.author"
          @click="articleClick(item)"
          @contextmenu.prevent="openMenu($event, item)"
        >
          <div class="flex" justify-content="flex-start" style="width:100%;">
            <div align="right" align-items="center" style="width:15%;font-size:14px;">{{item.createtime | timestampFormet}}</div>
            <div class="ellipsis article-title" align-items="center" style="width:70%;">{{item.title}}</div>
            <div class="article-tag-box"><el-tag type="warning" class="article-tag-item" style="width:100%;text-align:center;">{{item.tag}}</el-tag></div>
          </div>
          <div><i class="el-icon-arrow-right"></i></div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
          <li @click="handleDelete(rightClickItem)">删除</li>
        </ul>
      </div>
      <div v-else>
        <div>暂无数据</div>
      </div>
    </div>
    <!-- <div class="author-wrap">
      <div>Vue版本号：{{this.version}}</div>
      <div>作者：孙锋锋</div>
      <div>目前就职于赞同科技</div>
    </div> -->
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
import C002 from '../messages/C002'
import C009 from '../messages/C009'
import basicPage from '../common/mixins/basic-page'
import MessageDialog from '../components/dialog/MessageDialog'
import { Dialog } from 'aui-ss'

export default {
  name: 'MainArticleList',
  mixins: [basicPage],
  data () {
    return {
      currentId: '',
      top: 0,
      left: 0,
      visible: false,
      rightClickItem: {},
      languages: [],
      // Articles: [], // 文章列表
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
    tag () {
      return this.$store.state.tag
    },
    IsLogin () {
      return !(this.$store.state.userInfo.username)
    }
  },
  watch: {
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created () {
    console.log(this.version)
    this.$EventManager.$on('onNavClickEvent', this.onNavClick)
    this.$EventManager.$on("onArticleChangeEvent", this.onArticleChange)
  },
  async mounted () {
    if (this.session.Customer.articles.length > 0) {
      console.log('session===', this.session)
      // session存在

      // 设置nav导航
      let navChangeEventArgs = {
        language: this.session.Customer.languages,
        activeIndex: this.session.Customer.language
      }
      this.$EventManager.$emit("onNavChangeEvent", navChangeEventArgs)

      // 设置标签
      this.Tags = this.getTags(this.session.Customer.language) // 获取tags
      console.log('Tags', this.Tags)

      // 设置当前激活标签
      this.currentTag = this.session.Customer.tag

      // 设置文章列表
      let m = this.session.Customer.language
      let t = this.session.Customer.tag
      let articles = this.HomeHelper.getArticle(m, t)
      this.$EventManager.$emit('onArticleChangeEvent', articles)

      // 设置文章显示内容
      let artItem = {
        id: this.session.Customer.articleId,
        content: this.session.Customer.content
      }
      this.$emit('change-editor', artItem)
    } else {
      // session不存在,加载sessoin数据...
      let request = new C002()
      let result = await this.RequestHelper.sendAsync(request)
      if (result.data.returnCode === '000000') {
        if (result.data.data.languages.length > 0) {
          // session赋值
          this.session.Customer.articles = result.data.data.articles
          this.session.Customer.languages = result.data.data.languages
          this.session.Customer.language = result.data.data.languages[0].language
          this.session.Customer.tags = result.data.data.languages[0].tag
          this.session.Customer.articleId = ''
          this.session.Customer.tag = '全部'
          console.log('session', this.session)

          this.languages = result.data.data.languages // 保留nav,创建文章页面需要用到

          // 设置nav导航
          let navChangeEventArgs = {
            language: result.data.data.languages,
            activeIndex: result.data.data.languages[0].language
          }
          this.$EventManager.$emit("onNavChangeEvent", navChangeEventArgs)

          // 设置标签
          this.Tags = this.getTags(this.session.Customer.language) // 获取tags
        }

        if (result.data.data.articles && result.data.data.articles.length > 0) {
          let atc = result.data.data.articles
          let arr = []
          let fenlei = result.data.data.languages[0].language
          for (let i = 0; i < atc.length; i++) {
            if (atc[i].module === fenlei) {
              arr.push(atc[i])
            }
          }
          this.total = arr.length // 总条数
          this.Articles = JSON.parse(JSON.stringify(arr)) // 文章列表
          this.articles = JSON.parse(JSON.stringify(arr)) // 文章列表
        }
      }
    }
  },
  methods: {
    getTags (language) {
      let tag = ''
      let languages = this.session.Customer.languages
      if (language) {
        for (let i = 0; i < languages.length; i++) {
          if (languages[i].name === language) {
            tag = languages[i].tag
          }
        }
      } else {
        tag = languages[0].tag
      }
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
    // 点击创建按钮，通过路由跳转创建文章页面
    onCreate () {
      let params = {
        tag: this.Tags,
        languages: this.languages
      }
      this.$router.push({ path: '/create/createArticle', name: 'CreateArticle', params })
    },
    // 选择文章
    articleClick (item) {
      this.currentId = item.id
      // 当前文章id == session.Customer.articleId
      if (this.session.Customer.articleId === item.id) return

      this.session.Customer.articleId = item.id
      this.session.Customer.content = item.content
      this.$store.commit('setArticleId', item.id)

      this.$emit('change-editor', item)
    },
    // 点击标签事件
    tabClick (e) {
      // 当前标签 == session.Customer.tag
      if (this.session.Customer.tag === this.currentTag) return

      console.log('点击了标签>>>', this.currentTag)
      let m = this.session.Customer.language
      let t = this.currentTag
      this.articles = this.HomeHelper.getArticle(m, t, 'tag')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.$emit('pagination-change', {currentPage: val, tag: this.value})
    },
    // 设置文章列表下面的标签
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
      this.session.Customer.tags = result
      // this.articles = this.Articles
    },
    onNavClick (data) {
      this.$nextTick(() => {
        // 监听导航点击事件
        console.log('触发监听事件 - onNavClickEvent')
        this.currentTag = '全部'
        this.articles = data
      })
    },
    onArticleChange (data) {
      console.log('触发监听事件 - onArticleChangeEvent')
      this.articles = data
    },
    /* 删除 */
    async handleDelete (item) {
      let DialogResult = await Dialog.showAwait(MessageDialog, {
        dialogBoxContentArgs: {
          message: '确认删除？',
          btnType: 'okCancel'
        }
      })
      if (DialogResult === 'OK') {
        let request = new C009()
        request.id = item.id
        let result = await this.RequestHelper.sendAsync(request)
        if (result.data.returnCode === '000000') {
          // TODO
        }
      }
    },
    /* 打开右键菜单 */
    openMenu (e, item) {
      this.rightClickItem = item
      let x = e.clientX
      let y = e.clientY

      this.top = y
      this.left = x

      this.visible = true
    },
    /* 关闭右键菜单 */
    closeMenu () {
      this.visible = false
    },
    onClose () {
      this.$EventManager.$off("onNavClickEvent")
      this.$EventManager.$off("onArticleChangeEvent")
    }
  }
}
</script>
<style scoped>
.box {
  padding: 0 10px;
  /* line-height: 2.4; */
  font-size: 18px;
  height: 100%;
  border:1px solid rgb(204, 204, 204);
  box-sizing: border-box;
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
  background: rgba(228, 141, 16, 0.5);
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

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}

.contextmenu li:hover {
  background-color: rgb(3, 125, 243);;
  color: white;
}
.active {
  background: rgba(228, 141, 16) !important;
}
</style>
