import {post,form} from '@/config/request'
const api = {
    list:'/basicRoleMenu/listPage',//角色菜单列表
    save:'/basicRoleMenu/save',//添加角色菜单
    update:'/basicRoleMenu/update',//更新角色菜单
    del:'/basicRoleMenu/delete',//删除角色菜单
    getById:'/basicRoleMenu/getById',//根据id获取角色菜单信息
}

/**
 * @desc 查询角色菜单列表
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
 * @desc 更新角色菜单
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
 * @desc 删除角色菜单
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
 * @desc 添加角色菜单
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
 * @desc 根据Id获取角色菜单信息
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-20
 *
 */
export function getById(params={}){
    return form(api.getById,params)
}