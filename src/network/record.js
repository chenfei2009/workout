import request from './request'

/**
 * 请求日期对应的训练记录数据
 * @param {string} date
 */
export function getRecordsByDate (date) {
  return request({
    url: '/record',
    params: { date }
  })
}

/**
 * 请求日期对应的训练容量 volume 数据
 * @param {string} date
 */
export function getVolumeByDate (date) {
  return request({
    url: '/record/volume',
    params: { date }
  })
}

/**
 * 删除训练记录数据
 * @param {interger} id 当前训练记录对应的编号
 */
export function deleteRecordById (detailId) {
  return request({
    url: `/record/detail/${detailId}`,
    method: 'DELETE'
  })
}

/**
 * 新增或更新身体数据
 * @param {string} date
 * @param {object} formData
 */
export function addBodyData (date, formData) {
  return request({
    url: '/record/data',
    method: 'POST',
    data: { date, formData }
  })
}
