<template>
  <div class="message-dialog">
    <div style="text-align:center;font-size:24px;">{{this.dialogBoxContentArgs.message}}</div>
    <div style="text-align:center;">{{this.dialogBoxContentArgs.content}}</div>
    <div class="flex message-dialog-btn" justify-content="center">
       <div class="flex" justify-content="space-between" style="width:60%;">
         <el-button
            v-for="(item,index) in btnTypeHandler" :key="index"
            :type="(item==='确定'||item==='是') ? 'primary': ''"
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
  name: "message-dialog",
  data () {
    return {
      result: '',
      tag: '',
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
  mounted () {},
  methods: {
    onClick (item) {
      if (item === '确定') {
        this.result = {
          result: 'OK',
          data: {
            language: this.language,
            tag: this.tag
          }
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
.message-dialog {
  width: 400px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
}
.input-item {
  margin: 16px 0;
}
.message-dialog-btn {
  margin-top: 68px;
}
</style>
