import {post,form} from '@/config/request'
const api = {
    list:'/basicLog/listPage',//操作日志列表
}

/**
 * @desc 查询操作日志列表
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-05
 *
 */
export function query(params={}){
    return form(api.list,params)
}