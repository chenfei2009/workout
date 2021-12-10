import request from './request'

// 请求首页数据
export function getHomeData () {
  return request({
    url: '/home/data'
  })
}
