<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row class="header-box" type="flex">
          <el-col :span="12">
            <div class="" text-align="left">
              <div>孙锋锋的文档</div>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row class="header-right" type="flex" align="center">
              <el-col :span="12" align="right">
                <SearchInput />
              </el-col>
              <el-col :span="12">
                <NavMenu />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <el-row type="flex" style="min-height:92vh;">
          <el-col :span="8" style="border-right:1px solid #eaecef;">
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
import SearchInput from './components/SearchInput'
import MainEditor from './components/MainEditor'
import MainPagination from './components/MainPagination'

export default {
  name: 'App',
  data () {
    return {
      list: [
        {
          path: '',
          children: [
            {
              path: 'dashboard',
              component: () => import('./views/login/index'),
              name: 'Dashboard',
              meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
            }
          ]
        }
      ]
    }
  },
  components: {
    SearchInput,
    NavMenu,
    MainEditor,
    MainPagination
  },
  mounted () {},
  methods: {}
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
  padding: 0 20px;
}
</style>
