import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ?
      localStorage.getItem('Authorization') :
      '',
    // UserHead: localStorage.getItem('UserHead') ? localStorage.getItem('UserHead') : require('../assets/logo.jpg'), // 用户头像
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user
      localStorage.setItem('Authorization', state.Authorization)
    },
    // changeHead(state, user) {
    //   state.UserHead = user;
    //   localStorage.setItem('UserHead', state.UserHead);
    // },
  },
  actions: {
    // actiHead(countext, n) {
    //   countext.commit('changeHead', n);
    // }
  },
  modules: {},
  /* getters: {
    HeadChange(state){
      return state.UserHead
    }
  } */
})