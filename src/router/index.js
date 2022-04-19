import { createRouter, createWebHistory } from 'vue-router'
const modulesFiles = require.context('@/view', true, /router.js$/);
let childrenRouters = [];
modulesFiles.keys().forEach((key)=>{
  childrenRouters = childrenRouters.concat(modulesFiles(key).default)
})
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
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

  return true
})

//页面刷新时调用
Router.isReady().then(res => {

})
export default Router