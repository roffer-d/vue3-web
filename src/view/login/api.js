import {post,form} from '@/config/request'
const api = {
    login:'/login',//登录
    logOut:'/logOut',//退出登录
}

export function login(params={}){
    return form(api.login,params)
}

export function logOut(params={}){
    return form(api.logOut,params)
}