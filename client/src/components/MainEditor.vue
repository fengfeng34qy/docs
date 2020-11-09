<template>
  <div>
    <mavon-editor
      class="mavon-editor"
      :fontSize="'19px'"
      :toolbars="markdownOption"
      :navigation="false"
      :transition="true"
      :boxShadow="true"
      :codeStyle="codeStyle"
      :toolbarsFlag="false"
      :ishljs="true" :bold="true"
      :shortCut="true"
      :editable="true"
      :subfield="false"
      :defaultOpen="'preview'"
      :tabSize="4"
      :externalLink="externalLink"
      v-model="value"/>
  </div>
</template>
<script>
import toolbars from '../config/toolbars'
import axios from 'axios'

export default {
  name: 'MainEditor',
  data () {
    return {
      value: '',
      codeStyle: 'atelier-forest-light',
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
        // hljs_css: function (css) {
        //   // 这是你的代码高亮配色文件路径
        //   return '/highlightjs/styles/' + css + '.min.css';
        // },
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
  mounted () {
    axios.get('http://www.sunfengfeng.com/markdownfiles/README.md').then(res => {
      console.log(res)
      this.value = res.data
    })
  }
}
</script>
<style scoped>
.mavon-editor {
  width: 100%;
  height: 100%;
}
</style>
