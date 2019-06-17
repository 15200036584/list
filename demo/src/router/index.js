import Vue from 'vue'
import Router from 'vue-router'
import { from } from '_array-flatten@2.1.2@array-flatten';

const home = () => import('../views/home/index.vue');
const order = () => import('../views/order/index.vue');
const login = () => import('../views/login/index.vue');
const detail = () => import('../views/detail/index.vue');
const commit = () => import('../views/commit/index.vue');
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: home,
      name: 'home',
      meta: {
        title: '加班/休假'
      }
    }, {
      path: '/order',
      component: order,
      name: 'order',
      meta: {
        title: '筛选'
      }
    }, {
      path: '/login',
      component: login,
      name: "login",
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/detail/:type/:id',
      component: detail,
      name: 'detail',
      props: true,
      meta: {
        title: '办公室加班申请表'
      }
    }, {
      path: '/commit/:type',
      component: commit,
      meta: {
        title: "提交申请表"
      },
      props:true,
      name:'commit'
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;

