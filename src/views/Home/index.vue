<!--  -->
<template>
  <div class="home">
    <span>{{ viewsCount }}</span>
    <van-button type="primary">主要按钮</van-button>
    <van-button plain type="primary">返回首页</van-button>
    <van-cell title="单元格" value="内容" size="large" label="描述信息" />

    <van-tabs type="card">
      <van-tab title="标签 1" to="/home/spamin" line-height="50px">内容 1</van-tab>
      <van-tab title="标签 2" to="/home/spaoli" line-height="100px">内容 2</van-tab>
    </van-tabs>
    <router-view />
    <TabBar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TabBar from '@/components/TabBar'
export default {
  components: {
    TabBar,
  },
  data () {
    return {
      checked: true,
    }
  },

  created () {
    // this.$store.dispatch('addViews') // 直接通过store的方法 触发action, 改变 views 的值
    //this.blogAdd() // 通过mapActions 触发mutation 从而commit ，改变state的值
  },

  computed: {
    ...mapState({
      viewsCount: 'Authorization',
    }),
    //...mapState(["Authorization", "UserHead"])

    //...mapGetters({

    // todosALise: 'getToDo' // getToDo 不是字符串，对应的是getter里面的一个方法名字 然后将这个方法名字重新取一个别名 todosALise

    //})
  },

  methods: {
    // ...mapMutations({
    //   totalAlise: 'changeLogin' // changeLogin 是mutation 里的方法，totalAlise是重新定义的一个别名方法，本组件直接调用这个方法
    // }),
    // ...mapActions([
    //   'actiHead' // 第一个actiHead是定义的一个函数别名称，挂载在到this(vue)实例上，后面一个actiHead 才是actions里面函数方法名称
    // ])
    // 往里面传参
    // increase (id) {
    //   this.actiHead(id)
    // }
  },
}
</script>

<style lang="scss" scoped>
.home span {
  /*设置内容超出后自动换行*/
  word-wrap: break-word;
  word-break: break-all;
}
::v-deep .van-tab__text--ellipsis {
  overflow: visible;
}
::v-deep .van-tabs__nav--card {
  height: 60px;
  margin: 0;
}
::v-deep .van-tabs--card > .van-tabs__wrap {
  height: 60px;
}
</style>
