<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/bg1.jpg" alt />
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-login"
};
</script>

<style  scoped lang='less'>
.container-login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/bg1.jpg) no-repeat center/cover;
  // background-size: cover;
  .my-card {
    width: 400px;
    height: 350px;
    transform: translate(-50%, -60%);
    position: absolute;
    left: 50%;
    top: 50%;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
