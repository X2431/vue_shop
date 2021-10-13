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
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
          <template slot-scope="scope">
            <el-tooltip content="修改" placement="top" effect="light" :enterable='false'>
              <el-button type="primary" icon="el-icon-edit" size='mini' @click="editUserInfo(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" effect="light" :enterable='false'>
              <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top" effect="light" :enterable='false'>
              <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 3, 4]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
      </el-pagination>

      <!-- 用户添加区域 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="ResetForm('addRuleForm')">

        <el-form :model="addForm" :rules="addRules" ref="addRuleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmitForm('addRuleForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户信息区域 -->
      <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="ResetForm('editRuleFormRef')">
        <el-form :model="editForm" :rules="addRules" ref="editRuleFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmitForm('editRuleFormRef',editForm.id)">确 定</el-button>
        </span>
      </el-dialog>
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
        totalPage: 0,
        addDialogVisible: false,
        addForm: {
          username: '111',
          password: '111',
          email: '111@qq.com',
          mobile: '111'
        },
        editDialogVisible:false,
        editForm:{},
        addRules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          mobile: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
        },
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
        // console.log(data);
        if (data.meta.status !== 200) {
          return this.$message.error('获取用户列表失败')
        } else {
          this.userList = data.data.users
          this.totalPage = data.data.total
        }
      },

      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize
        this.getUserList()
        // console.log(newSize);
      },

      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },

      userChangeState(state) {
        this.$axios.put(`users/${state.id}/state/${state.mg_state}`).then(res => {
          console.log(res);
          const {
            data
          } = res
          if (data.meta.status !== 200) {
            state.mg_state = !state.mg_state
            return this.$message.error('更新状态失败！')
          }
          this.$message.success('更新成功！')
        })
      },

      addSubmitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.addDialogVisible = false
            const {
              data
            } = await this.$axios.post('users', this.addForm)
            if (data.meta.status !== 201) {
              return this.$message.error('用户添加失败')
            }
            // console.log(data);
            this.$message.success('用户添加成功')
            this.getUserList()
          } else {
            this.$message.error('请正确填写信息')
            return false;
          }
        });
      },

      ResetForm(formName) {
        this.$refs[formName].resetFields();
      },

      editUserInfo(id){
        this.$axios.get(`users/${id}`).then(res => {
          const {data} = res
          if(data.meta.status !== 200){
            return this.$message.error('获取用户信息失败，无法修改')
          }
          this.editForm = data.data
          this.editDialogVisible = true
        })
      },

      editSubmitForm(formName,id){
        this.$refs[formName].validate(async(valid) => {
          if(valid){
            const {data} = await this.$axios.put(`users/${id}`,{email:this.editForm.email,mobile:this.editForm.mobile})
            if(data.meta.status !== 200){
              return this.$message.error('用户信息更新失败')    
            }
            this.$message.success('用户信息更新成功')
            this.editDialogVisible = false
            this.getUserList()
          }else{
            this.$message.error('您输入的数据不合法,请重试')
            this.ResetForm(formName)
          }
        })
      },

      deleteUser(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const {data} =await this.$axios.delete(`users/${id}`)
          // console.log(data);
          if(data.meta.status !== 200){
            return this.$message.error('删除用户失败')
          }
          this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }

</script>

<style lang='less' scoped>

</style>
