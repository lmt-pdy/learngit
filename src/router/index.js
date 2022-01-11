import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home'
import Users from '../components/user/Users'
import Index from '../components/index'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/users',
    children: [
      { path: '/index', component: Index },
      { path: '/users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航首位
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { return next() } // 若访问登录页，则直接访问，不做权限限制
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token') // 判断是否含有token

  if (!tokenStr) { return next('/login') }

  next()
})
export default router
