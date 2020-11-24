<template>
  <div class="layout">
    <navbar/>
    <app-main/>
  </div>
</template>
<script>
import Navbar from './components/navbar'
import { AppMain } from './components'

export default {
  name: 'layout',
  data () {
    return {}
  },
  components: {
    Navbar,
    AppMain
  },
  methods: {}
}
</script>
<style scoped>

</style>
