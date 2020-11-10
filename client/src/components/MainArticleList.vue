<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MainArticleList',
  data () {
    return {}
  },
  props: {
    data: Array
  }
}
</script>
<style scoped>

</style>
