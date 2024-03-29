import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// 开启Keep-Alive模式
const Agent = require('agentkeepalive')
const keepaliveAgent = new Agent({
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000, // socket连接保持60s
  freeSocketTimeout: 30000 // free socket keepalive for 30 seconds
})
axios.defaults.httpAgent = keepaliveAgent

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做点什么
    // if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers['X-Token'] = getToken()
    // config.method = 'post'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default {
  async sendAsync (request) {
    return new Promise(function (resolve, reject) {
      console.log('<<<<<<<<<<<<<<<<<上送报文>>>> %c' + request.url, 'color:#0DBCBC;font-weight:bold;border:1px solid #000;')
      console.log(request)
      service({
        method: request.method || "POST",
        url: request.url || "",
        data: request
      }).then((res) => {
        console.log('<<<<<<<<<<<<<<<<<接收报文>>>> %c' + request.url, 'color:green;font-weight:bold;border:1px solid #000;')
        console.log(res)
        resolve(res)
      })
    })
  }
}
// export default service
