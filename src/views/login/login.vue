<template>
  <div class="container">
    <h1 class="title">欢迎来到cloud-book后台管理系统</h1>

    <div class="login-box">
      <h2 class="login-box-title">请登录</h2>
      <el-form class="form">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="handleLogin" type="primary" class="login-btn" :loading="isLoading">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      return {
        formData: {
          username: '',
          password: ''
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
      }
    }
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
