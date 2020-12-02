<template>
  <div class="layout">
    <navbar :languages="languages" :activeIndex="activeIndex" />
    <app-main/>
  </div>
</template>
<script>
import Navbar from './components/navbar'
import { AppMain } from './components'
// import axios from 'axios'

export default {
  name: 'layout',
  data () {
    return {}
  },
  components: {
    Navbar,
    AppMain
  },
  computed: {
    languages () {
      return this.$store.state.languages
    },
    activeIndex () {
      return this.$store.state.activeIndex
    }
  },
  mounted () {
    // axios({
    //   method: "POST",
    //   url: 'http://localhost:8888/home',
    //   headers: {'content-type': 'application/json'},
    //   data: {}
    // }).then(res => {
    //   console.log(res)
    //   this.$store.commit('setLanguages', res.data.data.languages)
    //   // this.$store.commit('setActiveIndex', res.data.data.languages[0].language)
    // })
  },
  methods: {}
}
</script>
<style scoped>

</style>
