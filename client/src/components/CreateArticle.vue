<template>
  <div class="create-article">
    <div class="create-title">创建文章</div>
    <div class="mode-wrap" align="left">
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
  padding: 50px 0;
}
.mode-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
}
.mode-box {
  width: 75%;
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
  height: 700px;
}
</style>
