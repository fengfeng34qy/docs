<template>
  <div class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
            <router-view ref="appMain" :key="key" :total="total" :pageSize="pageSize" :articles="articles" @article-change="articleChange" @tag-change="tagChange" @pagination-change="paginationChange" />
        </keep-alive>
      </transition>
  </div>
</template>
<script>

export default {
  name: 'app-main',
  data () {
    return {}
  },
  props: {
    articles: Array,
    total: Number,
    pageSize: Number
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  },
  methods: {
    setSideArticle (language) {
      this.$refs.appMain.setSideArticle(language)
    },
    setTags (tags) {
      this.$refs.appMain.setTags(tags)
    },
    articleChange (data) {
      this.$emit('article-change', data)
    },
    articleChange2 (item) {
      this.$refs.appMain.changeEditor(item)
    },
    tagChange (data) {
      this.$emit('tag-change', data)
    },
    paginationChange (data) {
      this.$emit('pagination-change', data)
    }
  }
}
</script>
<style scoped>
.app-main {
  /* padding-top: 60px; */
  box-sizing: border-box;
  background: #eaecef;
}
</style>
