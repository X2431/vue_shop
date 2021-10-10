<template>
  <div>
      <el-button type="primary" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
    name:'Home',
    methods:{
        logout(){
            sessionStorage.removeItem('token')
            this.$router.push('login')
        }
    }
}
</script>

<style lang="less" scoped>

</style>