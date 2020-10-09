import Vue from 'vue';
import Router from 'vue-router';
const Mine = () => import ('@/views/Mine');
const Home = () => import ('@/views/Home');
Vue.use (Router);

const router = new Router ({
  mode: 'hash',
  // mode: process.env.VUE_APP_TARGET === 'web' || window.historyMode ? 'history' : 'hash',
  routes: [
    {
      path: '/mine',
      meta: {
        name: '招商商城',
        keepAlive: true,
      },
      component: Mine,
    },
    {
      path: '/home',
      meta: {
        name: 'home',
      },
      component: Home,
      children: [
        {
          path: 'spaoli',
          component: () => import ('@/components/Sparelist/spaoli.vue'),
        },
        {
          path: 'spamin',
          component: () => import ('@/components/Sparelist/spamin.vue'),
        },
        {
          path: '',
          redirect: 'spaoli',
        },
      ],
    },
    // {
    //   path: '/gasoline/spare',
    //   name: 'spare',
    //   component: Spare,
    //   children: [
    //     {
    //       path: 'spaoli',
    //       component: () => import('@/components/Sparelist/spaoli.vue')
    //     },
    //     {
    //       path: 'spamin',
    //       component: () => import('@/components/Sparelist/spamin.vue')
    //     },
    //     {
    //       path: '',
    //       redirect: 'spaoli'
    //     }
    //   ]
    // },
    {
      path: '/',
      redirect: '/mine',
    },
    {
      path: '/404',
      component: () => import ('@/components/Notfound'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
// 无token无需跳转页面
// router.beforeEach((to, from, next) => {
//   const guestRoutes = [
//     '/mine/login',
//     '/mine/signin',
//     '/mine/login/agree',
//     '/mine/reset',
//     '/oauth/callback',
//   ];
//   console.log(guestRoutes.indexOf(to.path));
//   if (guestRoutes.indexOf(to.path) > -1) {
//     next();
//   } else {
//     const token = localStorage.getItem('Authorization');
//     if (token === null || token === '') {
//       next('/mine/login');
//     } else {
//       next();
//     }
//   }
// });
export default router;
