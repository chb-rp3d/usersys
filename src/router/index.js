import { createRouter, createWebHistory } from 'vue-router'
import { string2Base64, getCookie, setCookie } from '@/utils/methods'
import { useGlobalStore } from '@/store/modules/global'

import { ACCESS_TOKEN, langEnum, REFRESH_TOKEN } from '@/config/global'
import { HASH_LOGIN, useLoginByToken } from '@/hooks/auth/useLoginForm'

// TODO：404 没必要做
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Index.vue'),
    meta: {
      title: 'Revopoint 账号-登录'
    },
    beforeEnter: (to, from, next) => {
      const cookie_token = getCookie('ACCESS_TOKEN')
      if(cookie_token) (
        next({ name: 'index' })
      )
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
    path: '/home',
    name: 'index',
    redirect: { name: 'home' },
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '用户管理',
          requiresAuth: true
        },
        component: () => import('@/pages/dashboard/UserInfo.vue')
      },
      {
        path: '/account',
        name: 'account',
        meta: {
          title: '账号与安全',
          requiresAuth: true
        },
        component: () => import('@/pages/account/Account.vue')
      }
    ]
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFound.vue') }
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
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'Revopoint 账号'

  const cookie_token = getCookie('ACCESS_TOKEN')
  if (to.fullPath === '/') {
    to.path = `/login#${HASH_LOGIN}`
  }

  // 客户端跳转过来，如果携带了语言和token，则设置语言和token
  console.log(`%c>> $ to, from, next1`, 'color:yellow', to, from)
  if (to.query?.lang && to.query?.access_token) {
    const globalStore = useGlobalStore()
    if (to.query?.lang !== langEnum.EN_US) {
      // 设置语言 lang
      globalStore.toggleLang(to.query.lang)
    }
    setCookie(ACCESS_TOKEN, to.query.access_token)
    const { lang, access_token, ...remainingQuery } = to.query

    const res = await useLoginByToken(to.query.access_token)
    console.log(`%c>> $resresres`, 'color:yellow', res)
    if (res === 'success') {
      next({ path: '/home', query: remainingQuery })
    } else {
      next({ path: '/login', query: remainingQuery })
    }

    return // 结束当前导航守卫
  }

  // 解析跳转过来携带的语言及

  // TODO: 如果需要认证且没有 token，则重定向到登录页
  // TODO: 如果跳转到 /login，但token有效，跳转到首页[通过token登录：LoginByToken]
  if (to.meta.requiresAuth && !cookie_token) {
    next(`login#${HASH_LOGIN}`)
  } else {
    next()
  }
})
export default router
