<template>
  <div class="add-swiper">
    <el-form :model="formData" class="form-500">
      <el-form-item label="轮播图标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="轮播图书籍">
        <el-select v-model="formData.category" @change="handleShowDialog">
          <el-option v-for="(item, index) in categoryData"
                     :key="index"
                     :label="item.title"
                     :value="item._id"
          ></el-option>
        </el-select>

        <div class="book-item clearfix" v-if="selectedBook[0]">
          <div class="img-wrap fll">
            <img :src="selectedBook[0].img" >
          </div>
          <div class="selectbook fll">
            <div class="title">
              标题: {{selectedBook[0].title}}
            </div>
            <div class="author">
              作者: {{selectedBook[0].author}}
            </div>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="轮播图头图">
        <imgUpload v-model="formData.img" class="fll"></imgUpload>
      </el-form-item>
      <el-form-item label="轮播图排序">
        <el-input-number v-model="formData.index"  :min="1" label="数字越大越靠前"></el-input-number>
      </el-form-item>
    </el-form>

    <el-button type="danger" @click="handleSubmit">提交</el-button>

    <el-dialog title="书籍列表" :visible.sync="isShowDialog" width="70%">
      <el-table :data="bookData">
        <el-table-column property="title" label="书名" width="300"></el-table-column>
        <el-table-column property="img" label="书籍头图" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="img-item">
          </template>
        </el-table-column>
        <el-table-column property="author" label="作者" width="300"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button @click="handleAdd(scope.row._id)" size="mini" type="primary">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pnChange"
        :total="bookCount">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  import imgUpload from '@/components/upload-com'

  export default {
    components: {
      imgUpload
    },
    data () {
      return {
        formData: {
          img: '',
          title: '',
          book: '',
          index: 1,
          category: ''
        },
        isShowDialog: false,
        bookpn: 1,
        bookSize: 3,
        bookData: [],
        categoryData: [],
        bookCount: 0
      }
    },
    methods: {
      getCategogy () {
        this.$axios.get('/category').then(res => {
          this.categoryData = res.data
        })
      },
      getData() {
        let params = {size: this.bookSize, pn: this.bookpn}
        this.$axios.get(`/category/${this.formData.category}/books`, params).then(res => {
          console.log(res)
          this.bookData = res.data.books
          this.bookCount = res.count
        })
      },
      handleShowDialog() {
        this.isShowDialog = true
        this.getData()
      },
      handleAdd(id) {
        this.formData.book = id
        this.isShowDialog = false
      },
      handleSubmit() {
        this.$axios.post('/swiper', this.formData).then(res => {
          if(res.code == 200) {
            this.$router.push({name: 'swiper'})
          }
        })
      },
      pnChange(pn) {
        this.bookpn = pn
        this.getData()
      }
    },
    created() {
      this.getCategogy()
      // this.getData()
    },
    computed: {
      selectedBook() {
        if (this.bookData.length>0) {
          return this.bookData.filter(item => item._id === this.formData.book)
        } else {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .book-item {
    width: 430px;
    border: 1px solid #999;
    margin-top: 20px;
    line-height: 1.5;
    padding: 15px;
    border-radius: 4px;
  }

  .img-wrap {
    width: 100px;
    height: 120px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .selectbook {
    margin-left: 20px;

    .title {
      color: #333;
      font-weight: 700;
      font-size: 15px;
    }

    .author {
      color: #444;
    }

  }
</style>
