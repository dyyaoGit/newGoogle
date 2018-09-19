<template>
  <div>
    <h1>上传图片测试页</h1>

    <!--<h2>传统表单上传</h2>-->
    <!--<div>-->
      <!--<form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">-->
        <!--<input type="file" name="file" >-->
        <!--<br>-->
        <!--<input type="text" name="token" v-model="token">-->
        <!--<br>-->
        <!--<button>-->
          <!--提交-->
        <!--</button>-->
      <!--</form>-->
    <!--</div>-->

    <form action="" enctype="multipart/form-data"></form>
    <!--<h2>ajax上传图片</h2>-->
    <!--<input type="file" @change="handleChange">-->
    <!--<img :src="imgData" >-->
    <!--<uploadCom @success="uploadImg"></uploadCom>-->
    <!--<div style="border: 1px solid #000;">-->
      <!--<img :src="imgData" >-->
    <!--</div>-->

    <comCheckBox v-model="myCheckBox"></comCheckBox>
  </div>
</template>

<script>
  import comCheckBox from '@/components/checkbox-com'
  import uploadCom from '@/components/upload-com'
  import axios from 'axios'

  export default {
    name: "index",
    components: {
      uploadCom,
      comCheckBox
    },
    data () {
      return {
        token: '',
        imgData: '',
        myCheckBox: ''
      }
    },
    methods: {
      getToken() {
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          console.log(res)
          this.token = res.data.data
        })
      },
      handleChange (event) {
        let file = event.target.files[0]

        let formData = new FormData()
        formData.append('file', file, file.name)
        formData.append('token', this.token)

        axios.post('https://upload-z1.qiniup.com', formData, {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json'
          }
        }).then(res => {
            this.imgData = res.data.url
        })
      },
      uploadImg (url) {
        this.imgData = url
      }
    },
    created() {
      this.getToken()
    }
  }
</script>

<style scoped>

</style>
