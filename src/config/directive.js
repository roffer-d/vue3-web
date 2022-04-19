/** 移动端长按指令 **/
const directiveList = [
  {
    name: 'longpress',
    directive: {
      inserted (el, bind) {
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
      inserted: function (el) {
        // 聚焦元素
        el.focus()
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