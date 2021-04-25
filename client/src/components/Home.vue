<template>
  <div class="home">
    <div class="editorSaveBtn">
      <el-button class="editor-btn" type="primary" v-if="isLogin" @click="onEditor">{{editorText}}</el-button>
      <el-button class="back-btn" v-if="toolbarsFlag" @click="onBack">返回</el-button>
    </div>
    <el-container>
      <el-main class="main">
        <div class="flex" align-items="flex-start" style="height:100%;">
          <div v-show="showSlider" flex="2" style="width:28%;height:100%;display:flex;flex-direction:column;box-sizing:border-box;">
            <MainArticleList ref="mainArticle" :data="articleList" :articles="articles" :total="total"  @create-btn="onCreate" @tag-change="tagChange" @pagination-change="paginationChange" @change-editor="changeEditor"/>
            <div class="author-wrap">
              <div>
                <div>Vue版本号：{{this.version}}</div>
                <div>作者：孙锋锋</div>
                <div>目前就职于赞同科技</div>
              </div>
            </div>
          </div>
          <div class="editor-box" flex="3" style="width:72%">
            <div v-if="!value">使用教程</div>
            <div v-else>
              <MainEditor
                :value="value"
                :subfield="subfield"
                :toolbarsFlag="toolbarsFlag"
                :navigation="navFlg"
                @mavon-editor-change="mavonEditorChange"
              />
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu'
import Login from '../components/Login'
import SearchInput from '../components/SearchInput'
import MainEditor from '../components/MainEditor'
import MainPagination from '../components/MainPagination'
import MainArticleList from '../components/MainArticleList'
// import axios from 'axios'
import C007 from '../messages/C007'

export default {
  name: 'home',
  data () {
    return {
      articleId: '',
      navFlg: false,
      value: '',
      subfield: false
    }
  },
  components: {
    SearchInput,
    NavMenu,
    MainEditor,
    Login,
    MainPagination,
    MainArticleList
  },
  props: {
    articles: Array,
    total: Number,
    pageSize: Number
  },
  computed: {
    isLogin () {
      return this.$store.state.userInfo.username && this.$store.state.articleId
    },
    articleList () {
      return this.$store.state.articleList
    },
    editorText () {
      if (!this.subfield) {
        return '编辑'
      } else {
        return '保存'
      }
    },
    showSlider () {
      return this.subfield !== true
    },
    toolbarsFlag () {
      return this.subfield === true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async () => {
      // console.log(to, from)
    })
  },
  mounted () {
    // axios.get('https://www.sunfengfeng.com/markdownfiles/demo.md').then(res => {
    //   this.value = res.data
    // }, err => {
    //   this.$message.error(err.message)
    // })
  },
  methods: {
    onCreate () {
      this.$router.push({path: '/create'})
    },
    submitForm () {
      console.log('a')
    },
    async onEditor () {
      if (this.subfield) {
        let request = new C007()
        request.id = this.articleId
        request.content = this.value
        request.token = localStorage.getItem('token')
        let result = await this.RequestHelper.sendAsync(request)
        if (result.data.returnCode === '000000') {
          this.subfield = false
          this.navFlg = false
        } else {
          this.$message.error(result.data.returnMessage)
          // this.$router.push({path: '/create'})
        }
      } else {
        this.subfield = true
      }
    },
    // 返回按钮
    onBack () {
      this.subfield = false
    },
    mavonEditorChange (val) {
      this.value = val
    },

    // 点击某个文章事件触发
    changeEditor (item) {
      this.articleId = item.id
      this.value = item.content
    },

    tagChange (data) {
      this.$emit('tag-change', data)
    },

    paginationChange (data) {
      this.$emit('pagination-change', data)
    },

    setSideArticle (language) {
      this.$refs.mainArticle.setSideArticle(language)
    },

    setTags (tags) {
      this.$refs.mainArticle.setTags(tags)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search input {
  border-radius: 20px;
}
.header {
  padding: 0;
  box-sizing: border-box;
  max-height: 60px;
  border-bottom: 1px solid #eaecef;
}
.header-box {
  align-items: center;
  box-sizing: border-box;
  padding: 0 25px;
}
.header-right {
  align-items: center;
}
.header-right ul {
  border: none !important;
}
.editor-box {
  overflow-y: auto;
  height:calc(100vh - 60px);
}
.main {
  padding: 0;
}
.editorSaveBtn {
  position: absolute;
  width: 156px;
  right:58px;
  top:116px;
  text-align: left;
  z-index:10000;
}
.editor-btn {
  opacity: 0.5;
}
.editor-btn:hover {
  opacity: 1;
}
.back-btn {
  opacity: 0.5;
}
.back-btn:hover {
  opacity: 1;
}
.author-wrap {
  height: 240px;
  display: flex;
  align-items: center;
}
.author-wrap > div {
  width: 100%;
}
</style>
