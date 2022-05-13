import {getRole} from "./utils";

/** 移动端长按指令 **/
const directiveList = [
  {
    /** 按钮权限指令 **/
    name: 'auth',
    directive: {
      beforeMount(el,bind,vnode){

      },
      mounted(el,bind,vnode) {
        const roleList = getRole()
        const route = (location.hash||location.pathname).replace(/^\#/,'')
        roleList.forEach(rm=>{
          if(rm.route == route){
            let authList = rm.auth.split(',')
            if(!authList.includes(bind.value)){
              /** 没有该按钮权限,删除该按钮 **/
              el.parentNode.removeChild(el)
            }
          }
        })
      }
    }
  }
]

export default (app) =>{
    directiveList.forEach(item => {
      let { name, directive } = item
      app.directive(name, directive)
    })
}