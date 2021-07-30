<template>
  <div style="width:202px;">
    <!-- <el-input
      class="search"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="value">
    </el-input> -->
    <el-autocomplete
      class="inline-input"
      v-model="value"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
export default {
  name: 'SearchInput',
  data () {
    return {
      title: '',
      value: '',
      restaurants: [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" }
      ]
    }
  },
  methods: {
    querySearch (queryString, cb) {
      // var restaurants = this.restaurants
      var restaurants = this.session.Customer.articles
      for (let i = 0; i < restaurants.length; i++) {
        // 给restaurants添加value属性用于搜索
        restaurants[i].value = restaurants[i].title
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (item) => {
        return (item.title.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    handleSelect (item) {
      console.log(item)
      this.$emit('article-change', item)
    }
  }
}
</script>
<style scoped>

</style>
