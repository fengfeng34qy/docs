<template>
  <div class="login">
    <div v-if="!isAuthenticated">
      <el-button type="text" @click="dialogFormVisible = true">登录</el-button>
      <span>|</span>
      <el-button type="text" @click="dialogRegisterVisible = true">注册</el-button>
    </div>
    <div class="flex" v-else>
      <el-avatar class="cursor" title="管理员" :size="40" alt="头像" src="http://www.sunfengfeng.com/images/face/10.png"></el-avatar>
      <div style="margin:0 6px;">|</div>
      <el-button type="text" @click="dialogFormSignout">退出</el-button>
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
          <el-button type="primary" @click.native.prevent="submitFormSignin('ruleForm')">登录</el-button>
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
          <el-button type="primary" native-type="submit" @click="submitFormSignup('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

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
  mounted () {
    axios({
      method: "POST",
      url: 'http://localhost:8888/getUserInfo',
      headers: {'content-type': 'application/json'},
      data: {
        token: localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res)
      if (res.data.returnCode === '000000') {
        this.$store.commit('setUserInfo', res.data.data)
        localStorage.setItem('token', res.data.token)
        this.isAuthenticated = true
      } else {
        // this.$message.error(res.data.returnMessage || '未知错误')
      }
    })
  },
  methods: {
    /* 登录 */
    submitFormSignin () {
      axios({
        method: 'POST',
        url: 'http://localhost:8888/signin',
        data: {
          username: this.ruleForm.user,
          password: this.ruleForm.pass
        }
      }).then(res => {
        this.dialogFormVisible = false
        if (res.data.returnCode === '000000') {
          this.$store.commit('setUserInfo', res.data.data)
          this.isAuthenticated = true
          this.$message.success('登录成功')
          localStorage.setItem('token', res.data.token)
        } else {
          this.$message.error(res.data.returnMessage || '密码错误')
        }
      })
    },
    /* 退出 */
    dialogFormSignout () {
      localStorage.removeItem('token')
      this.$store.commit('setUserInfo', null)
      location.href = '/'
    },
    submitFormSignup () {
      axios({
        method: 'POST',
        url: 'http://localhost:8888/signup',
        data: {
          username: this.ruleForm.user,
          nickname: this.ruleForm.nickname,
          email: this.ruleForm.email,
          password: this.ruleForm.pass
        }
      }).then(res => {
        this.dialogRegisterVisible = false
        console.log(res)
        if (res.data.returnCode === '000000') {
          this.$notify({ title: '成功', message: '注册成功', type: 'success' })
          setTimeout(() => {
            location.href = '/'
          }, 1500)
        } else {
          this.$message.error(res.data.returnMessage)
        }
      })
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
