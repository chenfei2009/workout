import request from './request'

/**
 * 查询当前日期范围部位记录数据
 * @param {string} startDate 起始日期
 * @param {string} endDate 结束日期
 */
export function getPartListByDate (startDate, endDate) {
  return request({
    url: '/cale',
    params: { startDate, endDate }
  })
}
