/**
  * @desc websocket 工具类
  * @param url 连接url
  * @auth Roffer
  * @date 2022/5/13 15:01
  *
  */
export default class Socket {
    constructor(url) {
        this.url = url
        this.callback = {}
        this.instance = null

        this.init()
    }

    /** 初始化连接 **/
    init(){
        let instance = new WebSocket(`ws://${this.url}`)

        instance.onmessage = (e) => {
            const res = JSON.parse(e.data)
            this.callback[res.type] && this.callback[res.type](res.data)
        }

        instance.onclose = (e) => {
            console.log("connect closed(" + e.code + ")")
        }

        instance.onopen = (e) => {
            console.log('连接成功！')
        }

        instance.onerror = (e) => {
            console.log('websocket连接失败！')
        }

        this.instance = instance
    }

    /** 添加接收message的回调函数 **/
    addHandler(type,callback){
        this.callback[type] = callback
    }

    /** 发送消息到服务端 **/
    send(data){
        if (this.instance.readyState == this.instance.OPEN) {
            this.instance.send(JSON.stringify(data))
        } else {
            setTimeout(() => {
                this.send(data)
            }, 1000)
        }
    }

    /** 断开连接 **/
    close(){
        this.instance && this.instance.close()
    }
}
