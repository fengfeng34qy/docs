<template>
  <div class="create-article">
    <div class="create-title">创建文章</div>
    <div class="mavon-editor-wrap">
      <div class="mavon-editor-box" v-if="true">
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
  padding-bottom: 200px;
}
.create-title {
  padding: 100px 0;
}
.mavon-editor-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mavon-editor-box {
  width: 75%;
}
</style>
