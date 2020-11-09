<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-row class="header-box" type="flex">
          <el-col :span="12">
            <div class="" text-align="left">
              <div>孙锋锋文档</div>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row class="header-right" type="flex" align="center">
              <el-col :span="12" align="right">
                <div style="width:202px;">
                  <el-input
                    class="search"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="searchValue">
                  </el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <el-menu
                  :default-active="activeIndex"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#fff"
                  text-color="#000"
                  active-text-color="#000">
                  <el-menu-item index="1">处理中心</el-menu-item>
                  <el-menu-item index="2">消息中心</el-menu-item>
                  <el-menu-item index="3">订单管理</el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <el-row type="flex" style="min-height:92vh;">
          <el-col :span="8" style="border-right:1px solid #eaecef;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              layout="prev, pager, next"
              :total="100">
            </el-pagination>
          </el-col>
          <el-col :span="16">
            <mavon-editor
              class="mavon-editor"
              :toolbars="markdownOption"
              :navigation="false"
              :transition="true"
              :boxShadow="true"
              :codeStyle="'androidstudio'"
              :toolbarsFlag="false"
              :ishljs="true" :bold="true"
              :shortCut="true"
              :editable="true"
              :subfield="false"
              :defaultOpen="'preview'"
              :tabSize="4"
              v-model="value"/>
          </el-col>
        </el-row>
      </el-main>
      <!-- <el-footer></el-footer> -->
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import toolbars from './config/toolbars'
import readme from './assets/readme.md'

export default {
  name: 'App',
  data () {
    return {
      currentPage1: 1,
      value: readme,
      markdownOption: toolbars,
      searchValue: '',
      activeIndex: '1',
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
  mounted () {
    console.log(readme)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    onClick () {
      axios.post('http://localhost:8888/post').then(res => {
        console.log(res)
      })
    },
    onChange (e) {
      console.log(e)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
.mavon-editor {
  width: 100%;
  height: 100%;
}
</style>
