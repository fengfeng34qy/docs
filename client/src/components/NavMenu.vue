<template>
  <div class="flex" style="margin-left:16px;">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#000"
      active-text-color="#000">
      <el-menu-item v-for="(item, index) in Languages" :key="index" :index="item.language" style="width:100px;">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="icon-wrap pointer" @click="addNav">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'aui-ss'
import axios from 'axios'
import AddLanguageDialog from './dialog/AddLanguageDialog'

export default {
  name: 'NavMenu',
  data () {
    return {
      // activeIndex: ''
    }
  },
  computed: {
    Languages () {
      return this.$store.state.languages
      // return this.languages
    },
    activeIndex () {
      if (this.$store.state.languages && this.$store.state.languages.length > 0) {
        return this.$store.state.languages[0].language
      } else {
        return ""
      }
    }
  },
  props: {
    languages: Array
  },
  mounted () {
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(this.Languages)
      for (let i = 0; i < this.Languages.length; i++) {
        if (this.Languages[i].language === key) {
          this.$emit('nav-click', this.Languages[i])
        }
      }
    },
    async addNav () {
      let dialog = await Dialog.showAwait(AddLanguageDialog, {
        closeContentModalRestPart: true,
        dialogBoxContentArgs: {
          message: '',
          btnType: 'okCancel'
        }
      })
      console.log(dialog)
      if (dialog.result === 'OK') {
        axios({
          method: "POST",
          url: 'http://localhost:8888/addLanguage',
          headers: {'content-type': 'application/json'},
          data: {
            language: dialog.data.language,
            tag: dialog.data.tag
          }
        }).then(res => {
          console.log(res)
          this.$store.commit('setLanguages', res.data.data)
        })
      }
    }
  }
}
</script>
<style scoped>
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  box-sizing: border-box;
  /* box-shadow: 0 0 6px 2px #ccc inset; */
}
</style>
