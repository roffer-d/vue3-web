import {form} from '@/config/request'
const api = {
    list:'/basicUser/listPage',//用户列表
    save:'/basicUser/save',//添加用户
    update:'/basicUser/update',//更新用户
    del:'/basicUser/delete',//删除用户
    getById:'/basicUser/getById',//根据id获取用户信息
    userRole:'/basicUser/userRole',//获取用户角色
    roleList:'/basicRole/list',//获取全部角色
    saveRole:'/basicUser/saveRole',//保存用户角色
}

/**
 * @desc 查询用户列表
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
 * @desc 更新用户
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
 * @desc 删除用户
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
 * @desc 添加用户
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
 * @desc 根据Id获取用户信息
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
  * @desc 获取全部角色
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/4/29 10:48
  *
  */
export function getRoleList(params={}){
    params.auth = 'query'
    return form(api.roleList,params)
}

/**
  * @desc 获取用户角色
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/4/29 11:25
  *
  */
export function getUserRoleData(params={}){
    params.auth = 'query'
    return form(api.userRole,params)
}

/**
  * @desc 保存用户角色
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/4/29 10:48
  *
  */
export function saveRole(params={}){
    params.auth = 'add'
    return form(api.saveRole,params)
}