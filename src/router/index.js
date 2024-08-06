import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('@/pages/login/Index.vue')
  },
  {
    path: '/Index',
    name: 'index',
    redirect: { name: 'home' },
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/Home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/pages/dashboard/UserInfo.vue')
      },
      {
        path: '/Account',
        name: 'account',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/pages/account/Account.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

/**
 * 全局前置守卫
 * 1. 登录态检查【从cookie获取】
 * 2. 第一次语言检查【和cookie对比】
 */
router.beforeEach((to, from, next) => {
  console.log(`%c>> $`, 'color:yellow', to)
  const lang = to.query?.lang || 'en'
  const cookie_token = localStorage.getItem('user-token')
  const cookie_lang = localStorage.getItem('user-token')
  if (lang !== cookie_lang) {
    // 设置语言 lang
  }

  // 如果需要认证且没有 token，则重定向到登录页
  // TODO: 如果跳转到login，但token有效，跳转到首页
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})
export default router
