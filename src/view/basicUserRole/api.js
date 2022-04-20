import {post,form} from '@/config/request'
const api = {
    list:'/basicUserRole/listPage',//用户角色列表
    save:'/basicUserRole/save',//添加用户角色
    update:'/basicUserRole/update',//更新用户角色
    del:'/basicUserRole/delete',//删除用户角色
    getById:'/basicUserRole/getById',//根据id获取用户角色信息
}

/**
 * @desc 查询用户角色列表
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-20
 *
 */
export function query(params={}){
    return form(api.list,params)
}

/**
 * @desc 更新用户角色
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-20
 *
 */
export function update(params={}){
    return form(api.update,params)
}

/**
 * @desc 删除用户角色
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-20
 *
 */
export function del(params={}){
    return form(api.del,params)
}

/**
 * @desc 添加用户角色
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-20
 *
 */
export function save(params={}){
    return form(api.save,params)
}

/**
 * @desc 根据Id获取用户角色信息
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-20
 *
 */
export function getById(params={}){
    return form(api.getById,params)
}