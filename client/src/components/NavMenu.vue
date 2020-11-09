<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#000"
      active-text-color="#000">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">消息中心</el-menu-item>
      <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: '1'
    }
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
