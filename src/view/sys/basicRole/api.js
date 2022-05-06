import {post,form} from '@/config/request'
const api = {
    list:'/basicRole/listPage',//角色列表
    save:'/basicRole/save',//添加角色
    update:'/basicRole/update',//更新角色
    del:'/basicRole/delete',//删除角色
    getById:'/basicRole/getById',//根据id获取角色信息
    getRoleAuth:'/basicRole/getRoleAuth',//获取角色关联的权限
    saveRoleAuth:'/basicRole/saveRoleAuth',//保存角色权限
}

/**
 * @desc 查询角色列表
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
 * @desc 更新角色
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
 * @desc 删除角色
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
 * @desc 添加角色
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
 * @desc 根据Id获取角色信息
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-04-25
 *
 */
export function getById(params={}){
    return form(api.getById,params)
}

/**
  * @desc 获取角色关联的权限
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/4/29 15:01
  *
  */
export function getRoleAuth(params={}){
    return form(api.getRoleAuth,params)
}

/**
 * @desc 保存角色权限
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022/4/29 15:01
 *
 */
export function saveRoleAuth(params={}){
    return post(api.saveRoleAuth,params)
}