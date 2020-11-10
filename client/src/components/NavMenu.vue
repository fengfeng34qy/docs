<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#000"
      active-text-color="#000">
      <el-menu-item v-for="(item, index) in data" :key="index" :index="item.language" style="width:100px;">{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: this.data[0].language
    }
  },
  props: {
    data: Array
  },
  mounted () {
    console.log(this.data)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>

</style>
