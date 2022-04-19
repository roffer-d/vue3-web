export default {
    /**
     * @desc 文字超过长度以 "..." 显示
     * @param {String} val 要截取的值
     * @param {Number} length 要截取长度 默认15
     * @date 2020-06-17 11:13:24
     * @author Roffer
     *
     */
    ellipsis(val='',length=15){
        let reg = new RegExp(`(.{${length}})(.*)`)
        return val.replace(reg,'$1...')
    },
    /**
     * @desc 文件名超过长度以 "xxx...xxx.后缀名" 显示
     * @param {String} val 要截取的值
     * @param {Number} start 要截取长度 默认15
     * @param {Number} end 从后缀名之前的字符开始，保留多少位，默认为3
     * @date 2020-06-17 11:13:24
     * @author Roffer
     *
     */
    fileEllipsis(val='',start=15,end=3){
        let reg = new RegExp(`(.{${start}})(.*)(.{${end}})(\\..*)$`)
        return val.replace(reg,'$1...$3$4')
    }
}