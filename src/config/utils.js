import router from "@/router";
import {getAuth as getAuthApi} from '../view/basicMenu/api'

/**
 * @description 日期格式化
 *
 * @param date:时间
 * @param format:日期格式化字符串，默认 yyyy-MM-dd hh:mm:ss
 */
export function dateFormat(date,format) {
  if(date){
    date = date instanceof Date ? date : new Date(date);
    let o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };

    format = (format || 'yyyy-MM-dd hh:mm:ss').replace(/y+/i,date.getFullYear());
    for(let i in o)format = format.replace(new RegExp('(' + i + ')'),('0' + o[i]).slice(-2));
    return format;
  }
  return '';
}

/**
 *  格式化数字千分位 格式化
 * @param num
 * @returns {string}
 */
export function numberFormat(num){
  num = (''+num).replace(/(\d+)(\.)(\d+)/,'$1');
  return (''+num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g ,'$1,');
}

/**
 * getParamsFromUrl:从浏览器地址中获取参数
 * @param：
 * name：参数名称
 */
export function getParamsFromUrl(name){
  var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.href.replace(/(.*)(\?)(.*)/,'$3').match(reg);
  return r ? r[2] : '';
}

/**
 * @desc 拷贝对象
 * @method
 * @params mod
 * @auth   Roffer
 * @date   2019-05-0911:22
 */
export function clone(obj){
  if(obj){
    return JSON.parse(JSON.stringify(obj));
  }
  return {};
}

/**
 * @desc 生成随机ID
 * @date   2019-09-03 11:34
 */
export function randomId(len=9){
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ''
  for(let i = 0 ; i < len ; i++){
    result += str.charAt(Math.floor(Math.random() * str.length))
  }
  return result;
}

/**
 * @desc 生成UUID
 * @date   2019-09-03 11:34
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * @desc 获取对象的所有key
 * @params obj 目标对象，isCovert2Str 是否将获取到的key转化成字符串 true："a,b,c,d,...",false：["a","b","c","d",...]
 * @date   2019-09-03 11:34
 */
export function getKeys(obj,isCovert2Str){
  let keysList = []
  for(let key in obj){
    keysList.push(key)
  }

  isCovert2Str && (keysList = keysList.join(','))

  return keysList
}

/**
 * @desc 判断鼠标点击的位置是包含在指定的元素内 (例如：是否包含在id为'test'的元素内)
 * @params e 鼠标点击的位置
 * @params property 目标元素的属性（通常指id或者class）
 * @params val 目标元素属性的值（通常指id或者class的值）
 * @date   2019-12-06 21:49
 */
export function isInTarget(e,property,val) {
  let retVal = false

  function exec(t){
    if(t[property] === val){
      retVal = true
    }else if(t.parentNode){
      exec(t.parentNode)
    }
  }

  if(e.path){//chrome
    let pathList = e.path
    pathList = pathList.filter(item => {
       return item[property] === val
    })

    retVal = pathList.length > 0
  }else{//通用
    exec(e.target||e.srcElement)
  }

  return retVal
}

/**
 * @desc 格式化文件大小(根据文件字节数大小自动区带单位)
 * @param size:文件字节数
 * @param pointLength:保留的小数位数
 * @param units:单位选项数组,默认：[ 'B', 'K', 'M', 'G', 'TB' ]
 * @date   2019-09-03 11:34
 */
export function formatFileSize(size, pointLength, units) {
  let unit;
  units = units || [ 'B', 'K', 'M', 'G', 'TB' ];
  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024;
  }
  return (unit === 'B' ? size : size.toFixed(pointLength || 2)) + unit;
}

/**
 * @desc 判断是否是对象
 * @param {Object} obj 判断的参数
 * @date 2020-06-18 11:17:53
 * @author Roffer
 *
 */
export function isObject(obj){
  const str = Object.prototype.toString.call(obj);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase() === 'object'
}

/**
 * @desc 获取登录信息
 * @auth Roffer
 * 2022/4/19 13:30
 *
 */
export function getUser(){
  let user = localStorage.getItem('user')
  if(!user){
    router.replace('/login')
  }else
    return JSON.parse(user)
}

/**
 * @desc 获取登录用户权限
 * @auth Roffer
 * 2022/4/19 13:30
 *
 */
export function getAuth(){
  let auth = localStorage.getItem('auth')
  if(!auth){
    router.replace('/login')
  }else
    return JSON.parse(auth)
}

export async function setAuth(){
  const user = getUser()
  /** 获取用户权限 **/
  const response = await getAuthApi({userId:user.id})
  if(response.code == 200){
    localStorage.setItem("auth",JSON.stringify(response.data))
  }
}

/**
 * @desc 删除登录信息
 * @params:
 *   name(类型): 描述
 * @auth Roffer
 * 2022/4/19 13:30
 *
 */
export function removeLoginInfo(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('auth')
}
