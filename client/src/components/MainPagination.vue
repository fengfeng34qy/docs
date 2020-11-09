<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style scoped>

</style>
