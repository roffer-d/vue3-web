import {post,form} from '@/config/request'
const api = {
    login:'/login',//登录
    logOut:'/logOut',//退出登录
}

/**
  * @desc 登录
  * @params:
  *   params(Object): 参数
  * @auth Dulongfei
  * 2022/4/19 16:51
  *
  */
export function login(params={}){
    return form(api.login,params)
}

/**
  * @desc 退出登录
  * @params:
  *   params(Object): 参数
  * @auth Dulongfei
  * 2022/4/19 16:51
  *
  */
export function logOut(params={}){
    return form(api.logOut,params)
}