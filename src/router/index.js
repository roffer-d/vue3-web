import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import {checkLogin,getMenu} from "../config/utils";
import {ElMessage} from 'element-plus'

const modulesFiles = require.context('@/view', true, /router.js$/);
let childrenRouters = [];
modulesFiles.keys().forEach((key)=>{
  childrenRouters = childrenRouters.concat(modulesFiles(key).default)
})

const isDevelopment = process.env.NODE_ENV === 'development'
const Router = createRouter({
  history: isDevelopment ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/sys/basicUser',
      component: () => import('@/view/home'),
      meta: {
        title: "系统管理"
      },
      children: childrenRouters
    },
    {
      path: "/login",
      component: () => import('@/view/login/index'),
    },
    {
      path: "/404",
      component: () => import('@/view/errorPage/404'),
    },
    { path: "/:catchAll(.*)", redirect: '/404' }
  ],
})

Router.beforeEach((to, from) => {
  const isLogin = checkLogin()

  /** 如果访问的是登录页面，并且已经存在登录信息，直接跳转到首页 **/
  if(to.path == '/login' && isLogin){
    Router.replace({path:'/'})
  }

  const filterPath = ['/','/login','/404']
  if(filterPath.includes(to.path)){
    return true
  }

  let result = true
  const code = to.meta.code
  const menuList = getMenu()
  if(menuList && code){
    result = menuList.map(m=>m.code).includes(code)
    if(!result){
      ElMessage({
        type:'error',
        message:'无权限访问！'
      })
    }
  }
  return result
})

//页面刷新时调用
Router.isReady().then(res => {
  console.log('页面刷新')
})
export default Router