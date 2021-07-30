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
            <SearchInput v-show="isShow" @article-change="articleChange1"/>
            <div class="flex" style="margin-left:16px;">
              <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                @select="handleSelect"
                background-color="#fff"
                text-color="#000"
                active-text-color="#000">
                <el-menu-item v-for="(item, index) in Languages" :key="index" :index="item.language" style="width:100px;">{{item.name}}</el-menu-item>
              </el-menu>
              <div class="icon-wrap pointer" @click="addNav">
                <i class="el-icon-plus"></i>
              </div>
            </div>
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
import { Dialog } from 'aui-ss'
import AddLanguageDialog from '../../../components/dialog/AddLanguageDialog'
import C003 from '../../../messages/C003'

export default {
  name: 'navbar',
  events: {
    'getNavbar': 'getNavbar'
  },
  data () {
    return {
      activeIndex: '',
      Languages: []
    }
  },
  components: {
    SearchInput,
    NavMenu,
    Login
  },
  // props: {
  //   languages: Array
  // },
  computed: {
    isShow () {
      if (this.$route.fullPath === '/') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.$EventManager.$on("onNavChangeEvent", (data) => {
      console.log('触发监听事件 - onNavChangeEvent')
      this.$nextTick(() => {
        // 设置nav导航
        this.Languages = data.language
        this.activeIndex = data.activeIndex
      })
    })
  },
  methods: {
    // 导航设置
    setLanguages (data) {
      this.Languages = data
      this.activeIndex = data[0].language
    },
    handleSelect (m, keyPath) {
      // 当前的语言 == session.Customer.language
      if (this.session.Customer.language === m) return
      console.log(m, keyPath)
      for (let i = 0; i < this.Languages.length; i++) {
        if (this.Languages[i].language === m) {
          let t = this.session.Customer.tag
          let articles = this.HomeHelper.getArticle(m, t, 'nav')
          this.$EventManager.$emit('onNavClickEvent', articles)
          this.$emit('nav-click', this.Languages[i])
        }
      }
    },
    async addNav () {
      let dialog = await Dialog.showAwait(AddLanguageDialog, {
        closeContentModalRestPart: true,
        dialogBoxContentArgs: {
          message: '',
          btnType: 'okCancel'
        }
      })
      console.log(dialog)
      if (dialog.result === 'OK') {
        if (!dialog.data.language || !dialog.data.tag) {
          throw new Error('请输入语言和标签')
        }
        let request = new C003()
        request.language = dialog.data.language
        request.tag = dialog.data.tag
        let result = await this.RequestHelper.sendAsync(request)
        console.log(result)
        this.Languages = result.data.data
      }
    },
    articleChange1 (item) {
      console.log('sff')
      this.$emit('article-change', item)
    },
    getNavbar () {}
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
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  box-sizing: border-box;
  /* box-shadow: 0 0 6px 2px #ccc inset; */
}
</style>
