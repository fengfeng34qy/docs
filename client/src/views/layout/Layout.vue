<template>
  <div class="layout">
    <navbar ref="navbar" @nav-click="navOnClick" />
    <app-main ref="appMain" :articles="Articles" :total="total" :pageSize="pageSize" @article-change="articleChange" @tag-change="tagChange" @pagination-change="paginationChange" />
  </div>
</template>
<script>
import Navbar from './components/navbar'
import { AppMain } from './components'

export default {
  name: 'layout',
  data () {
    return {
      total: 0,
      pageSize: 10,
      ArticlesAll: [],
      Articles: [],
      ArticlesItem: []
    }
  },
  components: {
    Navbar,
    AppMain
  },
  computed: {
    activeIndex () {
      return this.$store.state.activeIndex
    }
  },
  mounted () {
  },
  methods: {
    navOnClick (key) {
      console.log('点击了导航', key)
      this.$refs.appMain.setTags(key.tag)
      // this.$refs.appMain.setSideArticle(key.language)
    },
    articleChange (data) {
      this.articles = data
      console.log('成功了.', data)
    },
    // 点击了标签
    tagChange (tag) {
      console.log('接收到标签变更.', tag)
      if (tag === 'all') {
        this.Articles = JSON.parse(JSON.stringify(this.ArticlesAll))
      } else {
        let result = []
        for (let i = 0; i < this.ArticlesAll.length; i++) {
          if (this.ArticlesAll[i].tag === tag) {
            result.push(this.ArticlesAll[i])
          }
        }
        this.Articles = result
      }
    },
    navbar () {
      // this.$refs
    },
    // 点击了分页
    paginationChange (data) {
      console.log('点击了分页', data)
      let list = JSON.parse(JSON.stringify(this.Articles))
      this.ArticlesItem = list.splice((data.currentPage - 1) * this.pageSize, 10)
      console.log(this.ArticlesItem)
    }
  }
}
</script>
<style scoped>

</style>
