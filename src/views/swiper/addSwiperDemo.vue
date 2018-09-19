<template>
  <div class="add-swiper-demo">
    <el-form :model="formData" class="form-500">
      <el-form-item label="轮播图标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="轮播图书籍">
        <el-select v-model="formData.category" @change="categoryChange">
          <el-option v-for="(item, index) in categoryData"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>

        <div class="book-item clearfix" v-if="getBookItem[0]">
          <div class="img-wrap">
            <img :src="getBookItem[0].img" >
          </div>
          <div class="book-desc">
            <div class="title">
              标题: {{getBookItem[0].title}}
            </div>
            <div class="author">
              作者: {{getBookItem[0].author}}
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="轮播图头图">
        <upload-img v-model="formData.img" class="fll"></upload-img>
      </el-form-item>

      <el-form-item label="轮播图排序">
        <el-input-number v-model="formData.index" :min="1"></el-input-number>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleSubmit" v-if="$route.name == 'addSwiperDemo'">
      提交
    </el-button>
    <el-button type="primary" @click="handleSaveEdit" v-else>
      保存更改
    </el-button>

    <el-dialog title="书籍列表" :visible.sync="isShowDialog">
      <el-table :data="bookData">
        <el-table-column property="title" label="书名" width="150"></el-table-column>
        <el-table-column label="书籍头图" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="img-item">
          </template>
        </el-table-column>
        <el-table-column property="author" label="作者"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleAddBook(scope.row._id)">
              添加
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        formData: {
          title: '',
          img: '',
          book: '',
          index: '',
          category: ''
        },
        categoryData: [],
        bookData: [],
        bookCount: 0,
        isShowDialog: false
      }
    },
    methods: {
      getCategory() {
        this.$axios.get('/category').then(res => {
          this.categoryData = res.data
        })
      },
      async getBookData() {
        const res = await this.$axios.get(`/category/${this.formData.category}/books`)
        this.bookData = res.data.books
        this.bookCount = res.count
      },
      categoryChange() {
        this.isShowDialog = true
        this.getBookData()
      },
      handleAddBook(id) {
        this.formData.book = id
        this.isShowDialog = false
      },
      handleSubmit() {
        let isCanSubmit = true
        for(let key in this.formData){
          if(!this.formData[key]){
            isCanSubmit = false
          }
        }

        if(isCanSubmit) {
          this.$axios.post('/swiper', this.formData).then(res => {
            if(res.code == 200) {
              this.$message.success(res.msg)
              this.$router.push({name: 'swiper'})
            }
          })
        } else { // 缺少必要参数
          this.$message.error('缺少必要参数')
        }
      },
      getInitData() { // 编辑页面下用
        this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
          this.formData = {
            ...this.formData,
            ...res.data,
            book: res.data.book._id, // 回填书籍id
            category: res.data.book.type // 回填分类id
          }
          this.getBookData()
        })
      },
      handleSaveEdit() { // 在编辑页面下保存更改
        this.$axios.put(`/swiper/${this.$route.query.id}`, this.formData).then(res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.$router.push({name: 'swiper'})
          }
        })
      }
    },
    created() {
      this.getCategory()
      if (this.$route.name == 'addSwiperDemo') { // 添加页面
        this.formData = {
          title: '',
          img: '',
          book: '',
          index: '',
          category: ''
        }
      } else { // 编辑页面
        this.getInitData()
      }
    },
    computed: {
      getBookItem() {
        if (this.formData.book) { // 如果有值则用户已经选择了一本书
          return this.bookData.filter(item => item._id == this.formData.book)
        } else {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .book-item {
    margin-top: 20px;
    width: 430px;
    padding: 15px;
    border: 1px solid #999;
    border-radius: 4px;

    .img-wrap {
      float: left;
      width: 100px;
      height: 120px;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .book-desc {
      float: left;
      margin-left: 20px;

      .title {
        color: #333;
        font-weight: 700;
        font-size: 15px;
      }

      .author {
        color: #555;
      }
    }
  }
</style>
