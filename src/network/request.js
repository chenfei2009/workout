/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// 创建一个 axios 实例
// 通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      // router.push({ name: "Login" })
      alert(error.response.data.msg)
    } else {
      // console.error('出错了')
      return Promise.reject(error)
    }
  }
)

// 导出请求方法
export default request
