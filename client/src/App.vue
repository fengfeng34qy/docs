<template>
  <div id="app">
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
        <el-row type="flex" style="min-height:92vh;">
          <el-col :span="8" style="border-right:1px solid #eaecef;">
            <MainArticleList :data="articleList"/>
            <MainPagination />
          </el-col>
          <el-col :span="16">
            <MainEditor />
          </el-col>
        </el-row>
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
  mounted () {},
  methods: {
    submitForm () {
      console.log('a')
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
}
.header-box {
  align-items: center;
  border-bottom: 1px solid #eaecef;
  box-sizing: border-box;
}
.header-right {
  align-items: center;
}
.header-right ul {
  border: none !important;
}
.main {
  padding: 0;
}
</style>
