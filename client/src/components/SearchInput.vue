<template>
  <div style="width:202px;">
    <el-input
      class="search"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="value">
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'SearchInput',
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style scoped>

</style>
