<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" style="height:50px;width:50px;" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 页面侧边栏 -->
      <el-aside :width="collapse?'60px':'200px'">
        <div class="foldButton" @click="fold">
          <p v-if="collapse">==>></p>
          <p v-else><<==</p>
          </div> <!-- 侧边栏菜单区 -->
            <el-menu background-color="#333744" text-color="#fff" active-text-color="orange" 
              unique-opened :collapse='collapse' :collapse-transition="false" router :default-active="activePath">
              <!-- 一级菜单 -->
              <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                <!-- 一级菜单模板内容 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i :class="iconList[item.id]"></i>
                  <!-- 内容 -->
                  <span>{{item.authName}}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                  @click="saveNavState('/'+subItem.path)">
                  <template slot="title">
                    <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <!-- 内容 -->
                    <span>{{subItem.authName}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
      <!-- 右边主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        menuList: [],
        iconList: {
          '125': 'iconfont iconico08',
          '103': 'iconfont iconico06',
          '101': 'iconfont icongouwuche_yongjin',
          '102': 'iconfont iconyemianxiafangicon_jianguanpingtai-copy',
          "145": 'iconfont icontongji-copy-copy'
        },
        collapse:false ,
        activePath:''
      }
    },
    methods: {
      logout() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('activePath')
        this.$router.push('login')
      },
      getMenuList() {
        this.$axios.get('menus').then((res) => {
          const {
            data
          } = res
          if (data.meta.status === 200) {
            this.menuList = res.data.data
            // console.log(res);
          } else {
            this.$message.error(data.meta.msg)
          }
        })
      },
      fold() {
        this.collapse = !this.collapse
      },
      saveNavState(path){
        this.activePath = path
        sessionStorage.setItem('activePath',path)
      }
    },
    created() {
      this.getMenuList()
      this.activePath = sessionStorage.getItem('activePath')
    }
  }

</script>

<style lang="less" scoped>
  .home_container {
    height: 100%;
  }

  .el-header {
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;

    .foldButton {
      background-color: grey;
      height: 24px;
      text-align: center;
      line-height: 24px;
      color: aquamarine;
      cursor: pointer;
    }

    .el-menu {
      border-right: 0;
    }

  }

  .el-main {
    background-color: #EAEDF1;
  }

  .iconfont {
    margin-right: 10px;
  }

</style>
