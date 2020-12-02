<template>
  <div class="home">
    <div class="editorSaveBtn">
      <el-button class="editor-btn" type="primary" @click="onEditor">{{editorText}}</el-button>
      <el-button class="back-btn" v-if="toolbarsFlag" @click="onEditor">返回</el-button>
    </div>
    <el-container>
      <el-main class="main">
        <div class="flex" align-items="flex-start">
          <div v-if="showSlider" flex="2" style="width:28%">
            <MainArticleList :data="articleList" @create-btn="onCreate" @change-editor="changeEditor"/>
            <MainPagination />
          </div>
          <div class="editor-box" flex="3" style="width:72%">
            <MainEditor
              :value="value"
              :subfield="subfield"
              :toolbarsFlag="toolbarsFlag"
              :navigation="navFlg"
            />
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
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
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
  computed: {
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
  mounted () {
    axios.get('http://www.sunfengfeng.com/markdownfiles/demo.md').then(res => {
      this.value = res.data
    }, err => {
      this.$message.error(err.message)
    })

    axios({
      method: "POST",
      url: 'http://localhost:8888/home',
      headers: {'content-type': 'application/json'},
      data: {}
    }).then(res => {
      console.log(res)
      if (res.data.returnCode === '000000') {
        if (res.data.data.languages && res.data.data.languages.length > 0) {
          this.$store.commit('setLanguages', res.data.data.languages)
        }
        if (res.data.data.articles && res.data.data.articles.length > 0) {
          let articles = res.data.data.articles
          let result = []
          let fenlei = articles[0].module
          for (let i = 0; i < articles.length; i++) {
            if (articles[i].module === fenlei) {
              result.push(articles[i])
            }
          }
          this.$store.commit('setArticleList', result)
        }
      }
    })
  },
  methods: {
    onCreate () {
      this.$router.push({path: '/create'})
    },
    submitForm () {
      console.log('a')
    },
    onEditor () {
      this.subfield = !this.subfield
      if (this.subfield) {
        this.navFlg = false
      }
      console.log(this.navFlg)
    },
    changeEditor (content) {
      this.value = content
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
</style>
