/**
 * ajax请求配置
 */
import axios from 'axios'
import qs from 'qs'
import {isObject, removeLoginInfo} from './utils'
import {h} from 'vue'
import router from '@/router/index'
import {ElMessage, ElNotification} from 'element-plus'

// axios默认配置
// axios.defaults.timeout = 30000;          // 超时时间
// axios.defaults.baseURL = '/';  // 默认地址
//**整理数据格式**
// axios.defaults.transformRequest = function (data) {
//     return qs.stringify(data);
// };

/**
 * 默认通用请求
 **/

let axiosDefault = axios.create({
    timeout: 30000,
    baseURL: '/basic',
    withCredentials: false
})

/**
 * 公共请求
 *
 * @param {str} url api请求路径
 * @param {obj} params 请求参数
 * @param {obj} options 自定义请求信息,同axios;options.isShowMsg:是否显示异常提示
 */
const request = (url = '/', params = {}, options = {}) => {
    // 判断参数是否正常
    if (url && isObject(params) && isObject(options)) {
        options.headers = options.headers || {}

        const methodType = {
            'get': 'params',
            'post': 'data',
        }
        const type = methodType[options.method]
        const headers = options.headers

        //默认post
        options['method'] = options['method'] || 'post';

        //判断options中是否有参数对象，有则合并
        if (isObject(options[type])) {
            options[type] = Object.assign({}, params, options[type]);
        } else {
            options[type] = params;
        }

        //判断表单提交 参数序列化
        if (headers && headers["Content-Type"] && headers["Content-Type"] === 'application/x-www-form-urlencoded') {
            options['transformRequest'] = [function (data) {
                return qs.stringify(data);
            }]
        } else {
            delete options['transformRequest']
        }

        options['url'] = url;
        if (options['baseURL']) {
            options['baseURL'] = options['baseURL']
        }

        const Authorization = localStorage.getItem('token');
        /** 在请求头中添加token **/
        if (Authorization) {
            options.headers.Authorization = localStorage.getItem('token');
        }

        const code = getMenuCode()
        if (code) {
            /** 在请求头添加当前请求路由路径、权限标识，后端做数据权限认证 **/
            options.headers.code = code
            options.headers.auth = params.auth

            delete options[type].auth
        }

        return new Promise((resolve, reject) => {
            axiosDefault(options).then(res => {
                return resolve(res)
            }).catch((error) => {
                // ElMessage.error('请求失败')
                ElNotification({
                    title: '错误提示',
                    message: h('i', {style: 'color: #ff6600'}, '请求失败'),
                })
                return resolve(error.response);
            })
        })
    } else {
        let msg = '';
        if (!url) {
            msg = 'request=>url:不能为空！'
        } else if (!isObject(params)) {
            msg = 'request=>params:必须是对象！'
        } else if (!isObject(options)) {
            msg = 'request=>options:必须是对象！'
        } else {
            msg = 'request=>其它异常！'
        }
        return Promise.resolve({});
    }
}

const form = (url, params, options = {}) => {
    options.method = 'post'
    options.headers = options.headers || {}
    options.headers["Content-Type"] = 'application/x-www-form-urlencoded'
    return request(url, params, options)
}

const post = (url, params, options = {}) => {
    options.method = 'post'
    return request(url, params, options)
}

const get = (url, params, options = {}) => {
    options.method = 'get'
    return request(url, params, options)
}

const requestAll = (requsetList) => {
    if (!(requsetList instanceof Array)) {
        throw new Error('请求参数必须是数组,格式为:[["请求路径(String)","请求参数(Object)","请求选项配置(Object)"],...]')
    }

    let methodList = []
    requsetList.forEach(item => {
        methodList.push(request(...item))
    })

    return new Promise((resolve, reject) => {
        axios.all(methodList).then(axios.spread(function () {
            let array = Array.prototype.slice.call(arguments).map((item) => item.data)
            resolve(array)
        })).catch((e) => {
            reject(e)
        })
    })
}

// **路由请求拦截**
// http request 拦截器
axiosDefault.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error.response);
    }
)

// http response 拦截器
axiosDefault.interceptors.response.use(
    response => {
        let data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        response.data = data
        if (data.code != 200) {
            let message = response.data.message
            ElNotification({
                title: '错误提示',
                message: h('i', {style: 'color: #ff6600'}, message),
            })

            switch (data.code) {
                case 10001:
                    //移除登录信息
                    removeLoginInfo()
                    //未登录,跳转到登录页
                    router.replace('/login')
                    break
                case 10003:
                    //无操作权限
                    break
            }
        }

        return response.data;
    },
    error => {
        if (error.response && error.response.data) {
            let data = error.response.data
            data = typeof data === 'string' ? data : JSON.stringify(data)
            if (data.indexOf('code=401') !== -1) {//登录超时
                router.replace('/login')
            }
        } else if (error.message === `timeout of 3000ms exceeded`) {
            ElNotification({
                title: '错误提示',
                message: h('i', {style: 'color: #ff6600'}, '请求超时！'),
            })
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    }
)

/** 从当前路由中获取权限标识 **/
const getMenuCode = ()=>{
    const routerList = router.getRoutes()
    const path = (location.hash || location.pathname).replace(/^\#/, '')
    return routerList.filter(route=>route.path === path)[0].meta.code
}

export {
    request,
    form,
    post,
    get,
    requestAll
}
