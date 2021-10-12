<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getUserList'>
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userChangeState(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-tooltip content="修改" placement="top" effect="light" :enterable='false'>
              <el-button type="primary" icon="el-icon-edit" size='mini'></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" effect="light" :enterable='false'>
              <el-button type="danger" icon="el-icon-delete" size='mini'></el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top" effect="light" :enterable='false'>
              <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>

    </el-card>

  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2
        },
        userList: [],
        totalPage: 0
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      async getUserList() {
        const {
          data
        } = await this.$axios.get('users', {
          params: this.queryInfo
        })
        console.log(data);
        if (data.meta.status !== 200) {
          return this.$message.error('获取用户列表失败')
        } else {
          this.userList = data.data.users
          this.totalPage = data.data.total
        }
      },
      
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getUserList()
        // console.log(newSize);
      },

      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },

      userChangeState(state){
        this.$axios.put(`users/${state.id}/state/${state.mg_state}`).then(res => {
          console.log(res);
          const {data} = res
          if(data.meta.status !== 200){
            state.mg_state = !state.mg_state
            return this.$message.error('更新状态失败！')
          }
          this.$message.success('更新成功！')
        })
      }
    }
  }

</script>

<style lang='less' scoped>

</style>
