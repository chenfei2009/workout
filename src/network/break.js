import request from './request'

/**
 * 提交组间休息数据
 * @param { Number } detail_id
 * @param { Object } recordItem
 */
export function updateBreakById (detailId, breaktime, comment) {
  return request({
    url: '/break',
    method: 'PUT',
    data: { detailId, breaktime, comment }
  })
}
