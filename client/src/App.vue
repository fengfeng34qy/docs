<template>
  <div id="app">
    <div class="editorSaveBtn">
      <el-button class="editor-btn" type="primary" @click="onEditor">{{editorText}}</el-button>
      <el-button class="back-btn" v-if="toolbarsFlag" @click="onEditor">返回</el-button>
    </div>
    <el-container>
      <el-header class="header">
        <el-row class="header-box" type="flex">
          <el-col :span="4">
            <div class="" text-align="left">
              <div>孙锋锋的文档</div>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="flex" justify-content="flex-end">
              <SearchInput />
              <NavMenu :data="navDataList"/>
              <Login />
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <div class="flex">
          <div v-if="showSlider" flex="2" style="flex:2;">
            <MainArticleList :data="articleList"/>
            <MainPagination />
          </div>
          <div class="editor-box" flex="3" style="flex:5;">
            <MainEditor :subfield="subfield" :toolbarsFlag="toolbarsFlag" />
          </div>
        </div>
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'
import Login from './components/Login'
import SearchInput from './components/SearchInput'
import MainEditor from './components/MainEditor'
import MainPagination from './components/MainPagination'
import MainArticleList from './components/MainArticleList'

export default {
  name: 'App',
  data () {
    return {
      subfield: false,
      ruleForm: {
        pass: '',
        user: ''
      },
      navDataList: [
        { name: 'JavaScript', language: 'js' },
        { name: 'Java', language: 'java' },
        { name: 'NodeJs', language: 'nodeJs' }
      ],
      articleList: [
        {
          title: '标题1'
        },
        {
          title: '标题1'
        },
        {
          title: '标题1'
        },
        {
          title: '标题1'
        },
        {
          title: '标题1'
        }
      ]
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
  mounted () {},
  methods: {
    submitForm () {
      console.log('a')
    },
    onEditor () {
      this.subfield = !this.subfield
    }
  }
}
</script>

<style>
@import url('./style/reset.css');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
  /* border-bottom: 1px solid #eaecef; */
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
