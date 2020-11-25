<template>
  <div class="navbar">
    <el-header class="header">
      <el-row class="header-box" type="flex">
        <el-col :span="4">
          <div class="" text-align="left">
            <div>
              <a class="home" href="/"><span class="site-name">孙锋锋的文档</span></a>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="flex" justify-content="flex-end">
            <SearchInput v-show="isShow" />
            <NavMenu v-show="isShow" :data="languages" />
            <Login />
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu'
import SearchInput from '@/components/SearchInput'
import Login from '@/components/Login'

export default {
  name: 'navbar',
  components: {
    SearchInput,
    NavMenu,
    Login
  },
  computed: {
    languages () {
      return this.$store.state.languages
    },
    isShow () {
      console.log(this.$route.fullPath)
      if (this.$route.fullPath === '/') {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
.navbar {
  background: #fff;
  height: 60px;
  /* position: absolute; */
  /* z-index: 10000;
  width: 100%; */
}
.site-name {
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
}
.home {
  display: inline-block;
  text-decoration: none;
  font-weight: 500;
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
  box-sizing: border-box;
  padding: 0 25px;
  height: 100%;
}
.header-right {
  align-items: center;
}
.header-right ul {
  border: none !important;
}
</style>
