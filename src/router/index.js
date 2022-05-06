import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import {getAuth} from "../config/utils";
import {ElMessage} from 'element-plus'

const modulesFiles = require.context('@/view', true, /router.js$/);
let childrenRouters = [];
modulesFiles.keys().forEach((key)=>{
  childrenRouters = childrenRouters.concat(modulesFiles(key).default)
})
const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'basicUser',
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
  const filterPath = ['/login','/404']
  if(filterPath.includes(to.path)){
    return true
  }

  let result = true
  const auth = getAuth()
  if(auth){
    const toPath = to.path
    const menuList = auth.menuList
    result = menuList.map(m=>m.router).includes(toPath)
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