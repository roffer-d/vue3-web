function Socket(url) {
    this.url = url
    this.callback = {}
    this.instance = null

    this.init()
}

Socket.prototype.init = function () {
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

Socket.prototype.addCallback = function (type, callback) {
    this.callback[type] = callback
}

Socket.prototype.send = function (data) {
    if (this.instance.readyState == this.instance.OPEN) {
        this.instance.send(JSON.stringify(data))
    } else {
        setTimeout(() => {
            this.send(data)
        }, 1000)
    }
}

Socket.prototype.close = function (e) {
    this.instance && this.instance.close()
}

export default Socket;