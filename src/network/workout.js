import request from './request'

/**
 * 请求当前动作当前组别历史记录数据
 * @param {interger} id 当前动作编号
 * @param {interger} count 当前组别
 */
export function getRecordsByCount (id, count) {
  return request({
    url: '/workout/count',
    params: { id, count }
  })
}

/*
  请求上一组记录数据
  @params 当前动作 id 上一组别 preCount
*/
export function getLastRecord (id, count) {
  return request({
    url: '/workout/last',
    params: { id, count }
  })
}

/**
 * 提交训练记录数据
 * @param {object} record 当前训练记录
 */
export function addRecord (record) {
  return request({
    url: '/workout/add',
    method: 'POST',
    data: record
  })
}

/*
  查询当前日期范围内部位数据
  @params 开始日期 startDate 结束日期 endDate
*/
export function getPartRecord (timeStr) {
  return request({
    url: '/workout/cale',
    params: { timeStr }
  })
}

/**
 * 更新训练记录数据
 * @param {object} record 当前训练记录
 */
export function putRecord (record, recordId) {
  return request({
    url: '/workout/update',
    method: 'PUT',
    data: { record, recordId }
  })
}
