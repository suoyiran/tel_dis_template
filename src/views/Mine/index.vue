<template>
  <div>
    <!-- <van-loading vertical
                 v-if="isLoading"
                 type="spinner"
                 color="#1989fa"
                 size="60px">加载中...</van-loading>
    <div v-else>
      <i>{{ week }}</i>
      <span class="mine">
        mineb
      </span>
      <i class="iconfont icon-dingwei1" />
      <button @click="dian"></button>
      <TabBar @zifu="hehe"
              :number="number" />
    </div>
    <Setup fath="1998" /> -->
    <footer>
      <div>w</div>
    </footer>
    <!-- <img src="../../assets/fdi001.jpg"
         alt=""> -->
    <TabBar @zifu="hehe"
            :number="number" />
  </div>
</template>

<script>
import Setup from '@/components/Setup'
import TabBar from '@/components/TabBar'
import httpClient from '../../plugins/axios'
import Drmer from "../../Drmer";
export default {
  data () {
    return {
      isLoading: false,
      number: '007',
      week: '上课',
    }
  },
  components: {
    TabBar,
    Setup,
  },
  setup () {
    console.log('setup')
  },
  beforeCreate () {
    console.log('beforecreate')
  },
  created () {
    console.log(this.$route.meta.name)
  },
  async created () {
    const config = await Drmer.call('AppService@version');
    console.log(config.system)
  },
  methods: {
    hehe: function (chuan) {
      this.week = chuan
      console.log(chuan)
    },
    dian () {
      httpClient
        .post('/mobile/code', {
          mobile: '13064032815',
          usage: 'reset',
        })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //async awiat异步
    // async getFaceResult () {
    //   try {
    //     let res = await httpClient.get('/oauth/wechat', {params: resp});
    //     if (res.code === 200) {
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // await this.$router.push({
    //       path: '/mine/signin',
    //       query: {
    //         nickname: res.data.nickname,
    //         openId: res.data.unionId,
    //         imgurl: res.data.headImgUrl
    //       }
    //     });
  },
}
</script>

<style lang="scss" scoped>
footer {
  height: 300px;
  background: url("../../assets/fdi001.jpg") no-repeat;
  background-size: 100% 100%;
}
.mine {
  font-size: 12px;
}
i {
  font-size: 12px;
}
::v-deep .van-loading {
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
}
::v-deep .van-loading__text {
  margin-top: 25px;
}
</style>
