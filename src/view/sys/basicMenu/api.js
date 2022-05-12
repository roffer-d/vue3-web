import {post,form} from '@/config/request'
const api = {
    list:'/basicMenu/listPage',//菜单列表
    menuTree:'/basicMenu/menuTree',//菜单树
    save:'/basicMenu/save',//添加菜单
    update:'/basicMenu/update',//更新菜单
    del:'/basicMenu/delete',//删除菜单
    getById:'/basicMenu/getById',//根据id获取菜单信息
    getAuth:'/basicMenu/getAuth',//获取用户权限
    menuAuth:'/basicMenu/menuAuth',//菜单权限配置
}

/**
  * @desc 菜单树
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/4/25 15:02
  *
  */
export function menuTree(params={}){
    params.auth = 'query'
    return form(api.menuTree,params)
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
    params.auth = 'query'
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
    params.auth = 'edit'
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
    params.auth = 'delete'
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
    params.auth = 'add'
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
    params.auth = 'query'
    return form(api.getById,params)
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
    params.auth = 'query'
    return form(api.getAuth,params)
}

/**
  * @desc 菜单权限配置
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/5/7 16:06
  *
  */
export function menuAuth(params={}){
    params.auth = 'add'
    return post(api.menuAuth,params)
}