import {form} from '@/config/request'

const api = {
    login:'/login',//登录
    logOut:'/logOut',//退出登录
    getAuth:'/basicMenu/getAuth',//获取用户权限
}

/**
  * @desc 登录
  * @params:
  *   params(Object): 参数
  * @auth Roffer
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
  * @auth Roffer
  * 2022/4/19 16:51
  *
  */
export function logOut(params={}){
    return form(api.logOut,params)
}

/**
  * @desc 获取用户权限
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/5/5 16:20
  *
  */
export function getAuth(params={}){
    return form(api.getAuth,params)
}
