<template>
  <div class="create-article">
    <div class="create-title">创建文章</div>
    <div class="mode-wrap" align="left">
      <div class="from-box">
        <div class="title-box">
          <el-input placeholder="请输入文章标题" v-model="title">
            <template slot="prepend">标题</template>
          </el-input>
        </div>
        <div class="mark-box">
          <el-select v-model="language" @change="onModuleChange" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.language"
              :value="item.name"><template slot="prepend">分类</template>
            </el-option>
          </el-select>
        </div>
        <div class="mark-box">
          <el-select v-model="tag" placeholder="请选择标签">
            <el-option
              v-for="item in tags"
              :key="item.label"
              :label="item.label"
              :value="item.value"><template slot="prepend">标签</template>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="mode-box">
        <el-switch
          v-model="mode"
          active-text="富文本模式"
          inactive-color="#13ce66"
          inactive-text="markdown模式">
        </el-switch>
      </div>
    </div>
    <div class="mavon-editor-wrap">
      <div class="mavon-editor-box" v-show="!mode">
        <mavon-editor
          class="mavon-editor"
          :fontSize="'14px'"
          :toolbars="markdownOption"
          :navigation="false"
          :transition="true"
          :boxShadow="true"
          :codeStyle="codeStyle"
          :toolbarsFlag="true"
          :ishljs="true" :bold="true"
          :shortCut="true"
          :editable="true"
          :subfield="true"
          :defaultOpen="'preview'"
          :tabSize="4"
          :externalLink="externalLink"
          @save="onSave"
          :value="value"
        />
      </div>
      <div v-show="mode" class="mavon-editor-box">
        <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
      </div>
    </div>
  </div>
</template>

<script>
import toolbars from '../config/toolbars'
import C006 from '../messages/C006'

export default {
  name: 'CreateArticle',
  data () {
    return {
      options: [],
      title: '',
      language: '',
      tags: [],
      tag: '',
      mode: false,
      value: '',
      content: '',
      codeStyle: 'github',
      markdownOption: toolbars,
      externalLink: {}
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.options = this.$route.params.languages
  },
  computed: {
    // options () {
    //   console.log(this.$store.state.languages)
    //   return this.$store.state.languages
    // },
    // tags () {
    //   return this.$route.params.tag
    // }
  },
  methods: {
    // 分类change事件
    onModuleChange (e) {
      let languages = this.$route.params.languages
      let tag = ''
      let tags = [{label: '全部', value: '全部'}]
      // 清空选中的标签
      this.tag = ''
      for (let i = 0; i < languages.length; i++) {
        if (languages[i].language === this.language) {
          tag = languages[i].tag.split(',')
        }
      }
      for (let j = 0; j < tag.length; j++) {
        let obj = {
          label: tag[j],
          value: tag[j]
        }
        tags.push(obj)
      }
      this.tags = tags
    },
    // 创建文章页面 - 保存
    async onSave (value) {
      let request = new C006()
      request.author = (this.$store.state.userInfo && this.$store.state.userInfo.username) ? this.$store.state.userInfo.username : ""
      request.module = this.language
      request.content = value
      request.title = this.title
      request.tag = this.tag.replace(/\s/g, '')
      request.token = localStorage.getItem('token')
      let result = await this.RequestHelper.sendAsync(request)
      if (result.data.returnCode === '000000') {
        this.$notify({title: '创建成功', message: '', type: 'success'})
      } else {
        // this.$message.error(res.data.returnMessage || '未知错误')
        this.$notify({title: '警告', message: result.data.returnMessage, type: 'warning'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create-article {
  width: 100%;
  /* padding-bottom: 200px; */
}
.create-title {
  font-size: 24px;
  padding: 6px 0;
  font-weight: 500;
}
.mark-box, .title-box {
  padding-right: 20px;
}
.mode-wrap {
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.from-box {
  width: 75%;
  display: flex;
  justify-content: flex-start;
}
.mode-box {
  width: 75%;
  padding: 10px 0;
}
.mavon-editor-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mavon-editor-box {
  width: 75%;
}
.mavon-editor {
  height: 680px;
}
.vue-html5-editor {
  height: 680px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  border: none;
}
</style>
