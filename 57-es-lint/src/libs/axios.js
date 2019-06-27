import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
    const { statusText, status, request: { responseURL } } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL,
    }
    if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}


// 处理重复点击
//声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url + '&' + config.method + '&' + config.data) { //当当前请求在数组中存在时执行函数体
            pending[p].f('too fast'); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}

class HttpRequest {
    constructor (baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            withCredentials: true,
            crossDomain: true,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        }
        return config
    }
    destroy (url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors (instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            removePending(config)
            // 创建取消cancelToken
            config.cancelToken = new cancelToken((c) => {
                // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
                pending.push({
                    u: config.baseURL + config.url + '&' + config.method + '&' + config.data,
                    f: c
                })
            });
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            removePending(res.config);
            const { data, status } = res
            if(data.error_code === 302){
                window.location.href='/#/login';
            }
            return { data, status }
        }, error => {
            return Promise.reject(error)
        })
    }
    request (options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
