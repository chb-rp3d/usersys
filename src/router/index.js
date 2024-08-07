import { createRouter, createWebHistory } from 'vue-router'
import { string2Base64, getCookie } from '@/utils/methods'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/config/global'
import { HASH_LOGIN } from '@/hooks/auth/useLoginForm'

// TODO：404 没必要做
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Index.vue'),
    meta: {
      title: '登录'
    },
    beforeEnter: (to, from, next) => {
      // 登录没有
      if (!to.hash) {
        to.hash = `#${HASH_LOGIN}`
        next({ ...to })
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    name: 'index',
    redirect: { name: 'home' },
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/Home',
        name: 'home',
        meta: {
          title: '用户管理',
          requiresAuth: true
        },
        component: () => import('@/pages/dashboard/UserInfo.vue')
      },
      {
        path: '/Account',
        name: 'account',
        meta: {
          title: '账号与安全',
          requiresAuth: true
        },
        component: () => import('@/pages/account/Account.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFound.vue') },
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
  const cookie_lang = getCookie('user-token')
  const cookie_token = getCookie('ACCESS_TOKEN')
  if (lang !== cookie_lang) {
    // 设置语言 lang
  }

  // TODO: 如果需要认证且没有 token，则重定向到登录页
  // TODO: 如果跳转到 /login，但token有效，跳转到首页[通过token登录：LoginByToken]
  if (to.meta.requiresAuth && !cookie_token) {
    next('/login#login')
  } else {
    next()
  }
})
export default router
