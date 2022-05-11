import {form} from '@/config/request'

const api = {
    login:'/login',//登录
    logOut:'/logOut',//退出登录
    createImg:'/createImg',//获取滑块图片
    checkImg:'/checkImg',//验证滑块图片
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
  * @desc 获取滑块图片
  * @param params 参数
  * @auth Roffer
  * @date 2022/5/10 15:43
  *
  */
export function createImg(params={}){
    return form(api.createImg,params)
}

/**
  * @desc 验证滑块图片
  * @param params 参数
  * @auth Roffer
  * @date 2022/5/10 15:44
  *
  */
export function checkImg(params={}){
    return form(api.checkImg,params)
}
