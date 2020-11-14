<template>
  <div class="create-article">
    <mavon-editor
    class="mavon-editor"
    :fontSize="'14px'"
    :toolbars="markdownOption"
    :navigation="false"
    :transition="true"
    :boxShadow="false"
    :codeStyle="codeStyle"
    :toolbarsFlag="true"
    :ishljs="true" :bold="true"
    :shortCut="true"
    :editable="true"
    :subfield="false"
    :defaultOpen="'preview'"
    :tabSize="4"
    :externalLink="externalLink"
    @save="onSave"
    :value="value"
/>
  </div>
</template>

<script>
import toolbars from '../config/toolbars'

export default {
  name: 'CreateArticle',
  data () {
    return {
      value: '',
      codeStyle: 'github',
      markdownOption: toolbars,
      externalLink: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
