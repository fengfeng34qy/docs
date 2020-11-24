<template>
  <div class="create-article">
    <div class="create-title">创建文章</div>
    <div class="mode-wrap" align="left">
      <div class="title-box">
        <el-input placeholder="请输入内容" v-model="title">
          <template slot="prepend">标题</template>
        </el-input>
      </div>
      <div class="mark-box">
        <el-input placeholder="可不填" v-model="mark">
          <template slot="prepend">标签</template>
        </el-input>
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
      <div class="mavon-editor-box" v-if="!mode">
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
      <div v-else class="mavon-editor-box">
        <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
      </div>
    </div>
  </div>
</template>

<script>
import toolbars from '../config/toolbars'

export default {
  name: 'CreateArticle',
  data () {
    return {
      title: '',
      mark: '',
      mode: false,
      value: '',
      content: '',
      codeStyle: 'github',
      markdownOption: toolbars,
      externalLink: {}
    }
  },
  methods: {
    onSave () {}
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
.mode-wrap {
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-box, .mark-box, .mode-box {
  width: 75%;
  padding: 6px 0;
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
</style>
