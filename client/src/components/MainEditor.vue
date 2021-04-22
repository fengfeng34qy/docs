<template>
  <div>
    <mavon-editor
      class="mavon-editor"
      :fontSize="'14px'"
      :toolbars="markdownOption"
      :navigation="navigation"
      :transition="true"
      :boxShadow="false"
      :codeStyle="codeStyle"
      :toolbarsFlag="toolbarsFlag"
      :ishljs="true" :bold="true"
      :shortCut="true"
      :editable="true"
      :subfield="subfield"
      :defaultOpen="'preview'"
      :tabSize="4"
      :externalLink="externalLink"
      @save="onSave"
      @change="onchange"
      :value="value"
    />
  </div>
</template>
<script>
import toolbars from '../config/toolbars'

export default {
  name: 'MainEditor',
  data () {
    return {
      // value: '',
      // codeStyle: 'atelier-forest-light',
      codeStyle: 'github',
      markdownOption: toolbars,
      externalLink: {
        // markdown_css: function () {
        //   // 这是你的markdown css文件路径
        //   return '/markdown/github-markdown.min.css';
        // },
        // hljs_js: function () {
        //   // 这是你的hljs文件路径
        //   return '/highlightjs/highlight.min.js';
        // },
        hljs_css: function (css) {
          // 这是你的代码高亮配色文件路径
          // return '/highlightjs/styles/' + css + '.min.css';

          // 我的代码高亮主题
          return 'static/styles/' + 'myHighlight.css'
        }
        // hljs_lang: function (lang) {
        //   // 这是你的代码高亮语言解析路径
        //   return '/highlightjs/languages/' + lang + '.min.js';
        // },
        // katex_css: function () {
        //   // 这是你的katex配色方案路径路径
        //   return '/katex/katex.min.css';
        // },
        // katex_js: function () {
        //     // // 这是你的katex.js路径
        //     // return '/katex/katex.min.js';
        // }
      }
    }
  },
  props: {
    subfield: Boolean,
    toolbarsFlag: Boolean,
    navigation: Boolean,
    value: String
  },
  mounted () {},
  methods: {
    onSave (data) {
    },
    onchange (val) {
      this.$emit('mavon-editor-change', val)
    }
  }
}
</script>
<style scoped>
.main-editor {
  height: calc(100vh - 60px);
  overflow: auto;
  box-sizing: border-box;
}
.mavon-editor {
  width: 100%;
  height: calc(100vh - 80px);
  box-sizing: border-box;
}
</style>
