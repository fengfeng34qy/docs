<template>
  <div class="flex" style="margin-left:16px;">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#000"
      active-text-color="#000">
      <el-menu-item v-for="(item, index) in data" :key="index" :index="item.language" style="width:100px;">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="icon-wrap pointer" @click="addNav">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'aui-ss'
import AddLanguage from './dialog/AddLanguage'

export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: this.data[0].language
    }
  },
  props: {
    data: Array
  },
  mounted () {
    console.log(this.data)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    async addNav () {
      Dialog.showNonAwait(AddLanguage, {
        closeContentModalRestPart: true,
        dialogBoxContentArgs: {
          message: '',
          btnType: 'ok'
        }
      })
      // const h = this.$createElement
      // this.$msgbox({
      //   title: '消息',
      //   message: AddLanguage,
      //   showCancelButton: true,
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消'
      // })
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
