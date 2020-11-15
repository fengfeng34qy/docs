<template>
  <div class="box" direction="column">
    <div class="flex" justify-content="space-between" style="padding:16px 0;">
      <div align="left" style="font-weight:bold;">最新文章</div>
      <div>
        <el-button type="primary" @click="onCreate">创建文章</el-button>
      </div>
    </div>
    <div class="flex article-list-box" justify-content="space-between" align="left" v-for="(item, index) in data" :key="index" :title="item.title">
      <div align="right" align-items="center" style="width:15%;font-size:14px;">2020/10/10</div>
      <div class="ellipsis pointer article-title" align-items="center" style="width:70%;">{{item.title}}</div>
      <div class="flex tag" align-items="center"><el-tag :type="item.tag.type" :color="item.tag.color" :hit="true" style="width:100%;text-align:center;">{{item.tag.label}}</el-tag></div>
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
  padding: 0 16px;
  line-height: 2.4;
  font-size: 18px;
}
.box > div {
  width: 100%;
}
.article-list-box {
  /* border-bottom: 1px solid #ccc; */
  box-sizing: border-box;
  transition: all .3s;
}
.article-list-box:hover {
  /* background: #eaecef; */
}
.article-title:hover {
  text-decoration: underline;
}
.tag {
  width: 15%;
}
</style>
