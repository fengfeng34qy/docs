<template>
  <div class="login">
    <div v-if="false">
      <el-button type="text" @click="dialogFormVisible = true">登录</el-button>
      <span>|</span>
      <el-button type="text" @click="dialogRegisterVisible = true">注册</el-button>
    </div>
    <div class="flex" v-else>
      <el-avatar class="cursor" title="管理员" :size="40" src="http://www.sunfengfeng.com/images/face/10.png"></el-avatar>
      <div style="margin:0 6px;">|</div>
      <el-button type="text" @click="dialogRegisterVisible = true">退出</el-button>
    </div>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :destroy-on-close="true" @closed="onCloseSign">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" autocomplete="on" label-width="100px">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" :minlength="3" :maxlength="12" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="on" @keyup.enter.native="submitForm" :minlength="3" :maxlength="12"></el-input>
        </el-form-item>
        <div>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native.prevent="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="注册" :visible.sync="dialogRegisterVisible" :destroy-on-close="true">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  @submit.native.prevent label-width="100px">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" :minlength="3" :maxlength="12" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :minlength="3" :maxlength="12"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogRegisterVisible = false">取消</el-button>
          <el-button type="primary" native-type="submit" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      dialogRegisterVisible: false,
      ruleForm: {
        pass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      console.log('su')
    },
    onCloseSign () {
      this.ruleForm.user = ''
      this.ruleForm.pass = ''
    }
  }
}
</script>
<style scoped>

</style>
