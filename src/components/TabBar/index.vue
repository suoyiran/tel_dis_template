<template>
  <div class="bottom">
    <ul class="bottom-ul">
      <router-link tag="li"
                   to="/home">
        <i class="iconfont icon-jiayouzhan" />
        <span>首页</span>
      </router-link>
      <router-link tag="li"
                   to="/shopping">
        <i class="iconfont icon-mall" />
        <span>商城</span>
      </router-link>
      <router-link tag="li"
                   to="/cinema">
        <i class="iconfont icon-chongzhi" />
        <span>充值</span>
      </router-link>
      <router-link tag="li"
                   to="/mine">
        <i class="iconfont icon-geren" />
        <span>{{number}}</span>
      </router-link>
      <!-- <button @click="cyy"></button> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: ['number'],
  methods: {
    cyy () {
      this.$emit("zifu", "子夫传旨")
    }
  }
};
</script>

<style scoped lang="scss">
.bottom {
  width: 100%;
  height: 49px;
  color: #999999;
  /*border: 1px solid #0000ff;*/
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
.bottom-ul {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.bottom-ul > li {
  height: 100%;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.active {
  background-color: #262628;
}
/*底部router-link 的激活样式切换*/
.router-link-active {
  color: #0072dc;
  //background-color: #262628;
}
.bottom-ul > li > i {
  font-size: 24px;
}
.bottom-ul > li > span {
  font-size: 13px;
  line-height: 15px;
}
</style>
