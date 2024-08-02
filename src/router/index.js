import {createRouter,createWebHistory} from 'vue-router'

import Dashboard from '@/pages/dashboard/UserInfo.vue'
// import Account from '@/pages/account/UserInfo.vue'

const routes=[
  {
    path: '/',
    component:()=>import('@/pages/login/Index.vue')
  },
  {
    path:'/Index',
    name:'index',
    redirect: { name: 'home' },
    component:()=>import('@/layout/Index.vue'),
    children:[
      {
        path:'/Home',
        name:'home',
        meta:{
            title:'首页'
        },
        component:()=>import('@/pages/dashboard/UserInfo.vue')
      },
      {
        path:'/Account',
        name:'account',
        meta:{
            title:'用户管理'
        },
        component:()=>import('@/pages/account/Account.vue')
      },
    ]
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router

