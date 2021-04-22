<template>
  <div class="login">
    <div v-if="!isAuthenticated">
      <el-button type="primary" size="mini" @click="dialogFormVisible = true">登录</el-button>
      <!-- <span>|</span> -->
      <el-button type="danger" size="mini" @click="dialogRegisterVisible = true">注册</el-button>
    </div>
    <div class="flex" v-else>
      <el-avatar class="cursor" title="管理员" :size="40" alt="头像" src="https://www.sunfengfeng.com/images/face/10.png"></el-avatar>
      <div style="margin:0 6px;">|</div>
      <el-button type="success" size="mini" @click="dialogFormSignout">退出</el-button>
    </div>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" :destroy-on-close="true" @closed="onCloseSign">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" autocomplete="on" label-width="100px">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" :minlength="3" :maxlength="12" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="on" @keyup.enter.native="submitFormSignin" :minlength="3" :maxlength="12"></el-input>
        </el-form-item>
        <div>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" :disabled="!ruleForm.user.trim() || !ruleForm.pass.trim()" @click.native.prevent="submitFormSignin('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="注册" :visible.sync="dialogRegisterVisible" :destroy-on-close="true">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  @submit.native.prevent label-width="100px">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" :minlength="3" :maxlength="12" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="ruleForm.nickname" :minlength="3" :maxlength="12" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :minlength="3" :maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" :minlength="3" :maxlength="36" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogRegisterVisible = false">取消</el-button>
          <el-button type="primary" :disabled="!ruleForm.user.trim() || !ruleForm.pass.trim()" native-type="submit" @click="submitFormSignup('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import C004 from '../messages/C004'
import C005 from '../messages/C005'
import C008 from '../messages/C008'

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
      isAuthenticated: false,
      dialogFormVisible: false,
      dialogRegisterVisible: false,
      ruleForm: {
        pass: '',
        user: '',
        nickname: '',
        email: ''
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
  async mounted () {
    let request = new C008()
    request.token = localStorage.getItem('token')
    let result = await this.RequestHelper.sendAsync(request)
    if (result.data.returnCode === '000000') {
      this.$store.commit('setUserInfo', result.data.data)
      localStorage.setItem('token', result.data.token)
      this.isAuthenticated = true
    } else {
      // this.$message.error(res.data.returnMessage || '未知错误')
    }
  },
  methods: {
    /* 登录 */
    async submitFormSignin () {
      let request = new C005()
      request.username = this.ruleForm.user
      request.password = this.ruleForm.pass
      let result = await this.RequestHelper.sendAsync(request)
      this.dialogFormVisible = false
      if (result.data.returnCode === '000000') {
        this.$store.commit('setUserInfo', result.data.data)
        this.isAuthenticated = true
        this.$message.success('登录成功')
        localStorage.setItem('token', result.data.token)
      } else {
        this.$message.error(result.data.returnMessage || '密码错误')
      }
    },
    /* 退出 */
    dialogFormSignout () {
      localStorage.removeItem('token')
      location.href = '/'
    },
    /* 注册 */
    async submitFormSignup () {
      let request = new C004()
      request.username = this.ruleForm.user
      request.nickname = this.ruleForm.nickname
      request.email = this.ruleForm.email
      request.password = this.ruleForm.pass
      let result = await this.RequestHelper.sendAsync(request)
      this.dialogRegisterVisible = false
      if (result.data.returnCode === '000000') {
        this.$notify({ title: '成功', message: '注册成功', type: 'success' })
        setTimeout(() => {
          location.href = '/'
        }, 1500)
      } else {
        this.$message.error(result.data.returnMessage)
      }
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
