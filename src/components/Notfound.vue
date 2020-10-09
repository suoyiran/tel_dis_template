<template>
  <div id="notfound">
    <van-button plain type="primary" @click="back()">返回首页</van-button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push('/home')
    },
  },
}
</script>

<style lang="scss" scoped>
#notfound {
  background: url('../assets/404.jpg');
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
::v-deep .van-button--primary {
  border-color: black;
  color: black;
  //透明
  display: block;
  background: transparent;
  position: absolute;
  top: 55%;
  right: 0%;
  left: 0%;
  margin: auto;
  width: 20%;
  height: 4%;
  border-radius: 50px;
}
</style>
