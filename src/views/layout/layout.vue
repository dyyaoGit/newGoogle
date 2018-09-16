<template>
  <div class="layout">
    <div class="header ml-200">
      <h1 class="title">
        云书后台操作系统
      </h1>
    </div>
    <div class="side-bar">
      <el-menu
        :router="true"
        background-color="#545c64"
        text-color="#fff"
          >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/layout/index">首页</el-menu-item>
            <el-menu-item index="/login">登录页</el-menu-item>
            <el-menu-item index="/layout/users">用户管理页面</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>

    </div>
    <div class="main-content ml-200">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "layout"
  }
</script>

<style scoped lang="scss">
  .layout {
    .title {
      text-align: center;
      font-weight: 400;
      line-height: 60px;
      height: 60px;
      border-bottom: 1px solid #f1f1f1;
      font-size: 20px;
    }

    .ml-200 {
      margin-left: 200px;
    }

    .side-bar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      padding-top: 80px;
      width: 200px;
      border-right: 1px solid #f1f1f1;
      overflow: hidden;
      background: #545c64;
    }

    .main-content {
      padding: 15px;
    }
  }
</style>
