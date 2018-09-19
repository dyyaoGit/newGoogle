<template>
  <div class="container">
    <h1 class="title">欢迎来到cloud-book后台管理系统</h1>

    <!--<h1 id="h1" ref="title">标题</h1>-->

    <div class="login-box">
      <h2 class="login-box-title">请登录</h2>
      <el-form class="form" ref="form" :rules="rule" :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" @keyup.enter.native="validateLogin"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="validateLogin" type="primary" class="login-btn" :loading="isLoading">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      const validateUsername = (rule, value, callback) => {
          if(!value) {
            callback(new Error('必须输入合法用户名'))
          } else {
            callback()
          }
      }

      const validatePassword = (rule, value, callback) => {
        if (value&&value.length>=5) {
          callback()
        } else {
          callback(new Error('请输入合法的密码'))
        }
      }


      return {
        formData: {
          username: '',
          password: ''
        },
        rule: {
          username: [{validator: validateUsername, trigger: 'blur'}],
          password: [{validator: validatePassword, trigger: 'blur'}],
        },
        isLoading: false
      }
    },
    methods: {
      handleLogin() {
        this.isLoading = true
        this.$axios.post('/login', this.formData).then(res => {
          console.log(res)
          if(res.code == 200){
            this.$store.commit('CHANGE_USERINFO', res.data)
            this.$message.success('登录成功')
            setTimeout(() => {
              this.$router.push('/layout/index')
            }, 1000)
          } else {
            this.$message.error(res.msg)
          }
          this.isLoading = false
        }).catch(err => {
          this.isLoading = false
        })
      },
      validateLogin () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.handleLogin()
          } else {
            return false;
          }
        });
      }
    },
    // created() { // vue实例准备好的时候， new Vue()
    //   this.$nextTick(() => {
    //     let h1 = this.$refs.title
    //     console.log(h1)
    //   })
    //
    //   let template = {
    //     template: '<h1>我是组件内容</h1>'
    //   }
    // },
    // mounted() {
    //   let h1 = this.$refs.title
    //   console.log(h1)
    // }

  }
</script>

<style scoped lang="scss">
.container {
  overflow: hidden;
  min-height: 100vh;
  background: #545c64;

  .title {
    margin-top: 80px;
    text-align: center;
    color: #fff;
    font-weight: 400;
  }

  .login-box {
    width: 400px;
    height: 300px;
    border: 1px solid #e8e8e8;
    background: #fff;
    border-radius: 6px;
    padding: 40px;
    margin: 20px auto 0;

    .login-box-title {
      color: #333;
      font-weight: 400;
      text-align: center;
    }

    .form {
      margin-top: 20px;
    }

    .login-btn {
      width: 100%;
      box-sizing: border-box;
    }
  }


}
</style>
