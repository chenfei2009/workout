import request from './request'

/**
 * 查询 每个部位的训练天数
 * @param {interger} range 查询范围 7 30 90 近7天 近30天 近90天
 */
export function getPartDataByRange (range) {
  return request({
    url: `/stat/part/${range}`
  })
}

/*
  查询 每个日期的训练容量
  @params 当前范围 range 7 30 90 近7天 近30天 近90天
*/
export function getVolumeDataByRange (range) {
  return request({
    url: `/stat/volume/${range}`
  })
}

/*
  查询 每个动作的训练频次
  @params 当前范围 range 7 30 90 近7天 近30天 近90天
*/
export function getMoveDataByRange (range) {
  return request({
    url: `/stat/move/${range}`
  })
}
