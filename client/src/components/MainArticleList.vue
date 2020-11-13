<template>
  <div class="box" direction="column">
    <div class="flex" justify-content="space-between" style="padding:16px 0;">
      <div align="left" style="font-weight:bold;">最新文章</div>
      <div>
        <el-button type="primary" @click="onCreate">创建文章</el-button>
      </div>
    </div>
    <div class=" flex" align="left" v-for="(item, index) in data" :key="index" :title="item.title">
      <div style="width:30%;">2020年10月10日</div>
      <div class="ellipsis" style="width:70%;"><a href="">{{item.title}}</a></div>
    </div>
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
  },
  methods: {
    onCreate () {
      this.$emit('create-btn')
    }
  }
}
</script>
<style scoped>
.box {
  padding: 0 20px;
  line-height: 2;
  font-size: 18px;
}
.box > div {
  width: 100%;
}
</style>
