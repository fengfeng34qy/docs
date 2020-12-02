<template>
  <div class="box" direction="column">
    <div class="flex" justify-content="space-between" style="padding:16px 0;">
      <div align="left" style="font-weight:bold;">最新文章</div>
      <div>
        <el-button type="primary" @click="onCreate">创建文章</el-button>
      </div>
    </div>
    <div class="article-list-wrap">
      <div class="flex article-list-box pointer" justify-content="space-between" align="left" v-for="(item, index) in Articles" :key="index" :title="item.title + ' - ' + item.author" @click="change(item.content)">
        <div class="flex" justify-content="flex-start" style="width:100%;">
          <div align="right" align-items="center" style="width:15%;font-size:14px;">2020/10/10</div>
          <div class="ellipsis article-title" align-items="center" style="width:70%;">{{item.title}}</div>
        </div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainArticleList',
  data () {
    return {}
  },
  // props: {
  //   data: Array
  // },
  computed: {
    Articles () {
      return this.$store.state.articleList
    }
  },
  methods: {
    onCreate () {
      this.$emit('create-btn')
    },
    change (content) {
      this.$emit('change-editor', content)
    }
  }
}
</script>
<style scoped>
.box {
  padding: 0 10px;
  line-height: 2.4;
  font-size: 18px;
}
.box > div {
  width: 100%;
}
.article-list-wrap {
  min-height: 460px;
}
.article-list-box {
  /* border-bottom: 1px solid #ccc; */
  box-sizing: border-box;
  transition: all .3s;
  height: 46px;
}
.article-list-box:hover {
  background: #eaecef;
}
.article-title {
  box-sizing: border-box;
  text-indent: 1rem;
}
.tag {
  width: 15%;
}
</style>
