<template>
  <div id="app">
    <el-button type="primary" @click="onEditor" style="position:absolute;right:20px;top:80px;z-index:10000;">{{editorText}}</el-button>
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
  overflow-x: hidden;
  height:calc(100vh - 60px);
}
.main {
  padding: 0;
}
</style>
