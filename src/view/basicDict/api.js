import {post,form} from '@/config/request'
const api = {
    list:'/basicDict/listPage',//字典列表
    save:'/basicDict/save',//添加字典
    update:'/basicDict/update',//更新字典
    del:'/basicDict/delete',//删除字典
    getById:'/basicDict/getById',//根据id获取字典信息
    getDict:'/basicDict/getDict',//获取所有操作数据的权限
}

/**
 * @desc 查询字典列表
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-06
 *
 */
export function query(params={}){
    return form(api.list,params)
}

/**
 * @desc 更新字典
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-06
 *
 */
export function update(params={}){
    return form(api.update,params)
}

/**
 * @desc 删除字典
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-06
 *
 */
export function del(params={}){
    return form(api.del,params)
}

/**
 * @desc 添加字典
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-06
 *
 */
export function save(params={}){
    return form(api.save,params)
}

/**
 * @desc 根据Id获取字典信息
 * @params:
 *   params(Object): 参数
 * @auth Roffer
 * @date 2022-05-06
 *
 */
export function getById(params={}){
    return form(api.getById,params)
}

/**
  * @desc 获取所有操作数据的权限
  * @params:
  *   params(Object): 参数
  * @auth Roffer
  * @date 2022/5/6 14:56
  *
  */
export function getDict(params={}){
    return form(api.getDict,params)
}