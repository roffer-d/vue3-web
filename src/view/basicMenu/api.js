import {post,form} from '@/config/request'
const api = {
    list:'/basicMenu/listPage',//菜单列表
    save:'/basicMenu/save',//添加菜单
    update:'/basicMenu/update',//更新菜单
    del:'/basicMenu/delete',//删除菜单
    getById:'/basicMenu/getById',//根据id获取菜单信息
}

/**
 * @desc 查询菜单列表
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-25
 *
 */
export function query(params={}){
    return form(api.list,params)
}

/**
 * @desc 更新菜单
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-25
 *
 */
export function update(params={}){
    return form(api.update,params)
}

/**
 * @desc 删除菜单
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-25
 *
 */
export function del(params={}){
    return form(api.del,params)
}

/**
 * @desc 添加菜单
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-25
 *
 */
export function save(params={}){
    return form(api.save,params)
}

/**
 * @desc 根据Id获取菜单信息
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-25
 *
 */
export function getById(params={}){
    return form(api.getById,params)
}