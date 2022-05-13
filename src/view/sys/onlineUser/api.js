import {post,form} from '@/config/request'
const api = {
    list:'/basicUser/onlineUsers',//获取在线用户列表
    offLine:'/basicUser/offLine',//踢用户下线
}

/**
 * @desc 查询在线用户列表
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-06
 *
 */
export function query(params={}){
    params.auth = 'query'
    return form(api.list,params)
}

export function offLine(params={}){
    params.auth = 'offLine'
    return form(api.offLine,params)
}