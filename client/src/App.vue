<template>
  <div id="app">
    <!-- <yyl-npm-practice :propData="propData"></yyl-npm-practice> -->
    <router-view/>
  </div>
</template>

<script>
// import des from './utils/des'

export default {
  name: 'App',
  data () {
    return {
      propData: '11111111111111111111'
    }
  },
  components: {},
  computed: {},
  mounted () {
    // let pwd = '12323434'
    // des.mac(pwd, '4BBA984C4EACFF98')
  },
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
/* ::-webkit-scrollbar {
  width: 6px;
  background-color: #e5e5e5;
  border-radius: 4px;
} */
/* ::-webkit-scrollbar-thumb {
  background-color: #b7b7b7;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover,::-webkit-scrollbar-thumb:active {
  background-color: #a1a1a1;
}
::-webkit-scrollbar-thumb-track {
  box-shadow: 0 0 0px #808080 inset;
  -webkit-box-shadow: 0 0 0px #808080 inset;
} */
</style>
