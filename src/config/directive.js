import {getAuth} from "./utils";

/** 移动端长按指令 **/
const directiveList = [
  {
    name: 'longpress',
    directive: {
      mounted (el, bind) {
        let timeOutEvent = 0;

        el.addEventListener('touchstart', (e) => {
          timeOutEvent = setTimeout(() => {
            let param = bind.value.param
            let callback = bind.value.callback
            callback && callback(param || {})
          }, 500);
          e.preventDefault();
        })

        el.addEventListener('touchmove', (e) => {
          clearTimeout(timeOutEvent);
          timeOutEvent = 0;
        })

        el.addEventListener('touchend', (e) => {
          clearTimeout(timeOutEvent);
          // if(timeOutEvent!=0){
          //   alert("你这是点击，不是长按");
          // }
          return false;
        })
      }
    }
  },
  {
    name: 'focus',
    directive: {
      mounted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  },
  {
    /** 按钮权限指令 **/
    name: 'auth',
    directive: {
      beforeMount(el,bind,vnode){

      },
      mounted(el,bind,vnode) {
        const {roleMenuList} = getAuth()
        const route = (location.hash||location.pathname).replace(/^\#/,'')
        roleMenuList.forEach(rm=>{
          if(rm.route == route){
            if(rm.auth.indexOf(bind.value) == -1){
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