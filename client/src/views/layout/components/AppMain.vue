<template>
  <div class="app-main">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
            <router-view :key="key"/>
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
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    }
  },
  methods: {}
}
</script>
<style scoped>
.app-main {
  /* padding-top: 60px; */
  box-sizing: border-box;
}
</style>
