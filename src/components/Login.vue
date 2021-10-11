<template>
  <div class="login_container">
    <div class='login_box'>
      <div class='avatar_box'>
        <img src="../assets/logo.png" alt="">
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont iconico08"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password">
            <i slot="prefix" class="iconfont icongouwuche_jianyifankui"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetLoginForm('loginForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loginForm:{
          username:'admin',
          password:'123456'
        },
        rules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('login',this.loginForm).then((res) => {
              // console.log(res);
              const {data} = res
              if(data.meta.status === 200){
                this.$message.success('登陆成功')
                sessionStorage.setItem('token',data.data.token)
                this.$router.push('home')
              }else{
                this.$message.error('登录失败')
              }
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetLoginForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: green;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: skyblue;
      }
    }
  }

  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>
