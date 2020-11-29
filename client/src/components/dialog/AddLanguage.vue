<template>
  <div class="add-language">
    <div style="text-align: center;">添加语言</div>
    <el-input placeholder="请输入内容" maxlength="12" v-model="language">
      <template slot="prepend">语言</template>
    </el-input>
    <div class="flex message-dialog-btn" justify-content="center">
       <div class="flex" justify-content="space-between" style="width:70%;">
         <el-button
            v-for="(item,index) in btnTypeHandler" :key="index"
            :fill="item==='确定'||item==='是'"
            :class="{'message-dialog-second-btn': index===1}"
            @click="onClick(item)">{{item}}
          </el-button>
       </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "aui-ss"

export default {
  name: "AddLanguage",
  data () {
    return {
      result: '',
      language: '',
      btnTypesEnum: {
        ok: ['确定'],
        cancel: ['取消'],
        okCancel: ['确定', '取消'],
        yesNo: ['是', '否'],
        skipRetry: ['跳过', '重试'],
        none: []
      }
    }
  },
  props: {
    dialogBoxContentArgs: Object
  },
  computed: {
    btnTypeHandler () {
      return this.btnTypesEnum[this.dialogBoxContentArgs.btnType]
    }
  },
  mounted () {
    console.log(this.dialogBoxContentArgs)
  },
  methods: {
    onClick (item) {
      if (item === '确定') {
        this.result = {
          result: 'OK',
          data: this.language
        }
      } else if (item === '取消') {
        this.result = 'cancel'
      } else if (item === '是') {
        this.result = 'yes'
      } else if (item === '否') {
        this.result = 'no'
      } else if (item === '跳过') {
        this.result = 'skip'
      } else if (item === '重试') {
        this.result = 'retry'
      }
      Dialog.close(this)
    }
  }
}
</script>
<style scoped>
.add-language {
  width: 400px;
  height: 300px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
}
</style>
