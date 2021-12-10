import request from './request'

/**
 * 请求计划列表
 * @param 无
 */
export function getPlanList () {
  return request({
    url: '/plan/list'
  })
}

/**
 * 请求训练计划对应的动作列表
 * @param {interger} planId 计划编号
 */
export function getMovesByName (name) {
  return request({
    url: '/plan/moves',
    params: { name }
  })
}

/**
 * 新建训练计划
 * @param {string} name 计划名称
 * @param {array} moves 选中动作列表
 */
export function addPlan (name, moves) {
  return request({
    url: '/plan/add',
    method: 'POST',
    data: { name, moves }
  })
}

/**
 * 更新训练计划
 * @param {string} name 计划名称
 * @param {array} moves 选中动作列表
 */
export function updatePlan (name, moves) {
  return request({
    url: '/plan/update',
    method: 'PUT',
    data: { name, moves }
  })
}

/**
 * 删除训练计划
 * @param {string} name 计划名称
 */
export function deletePlan (name) {
  return request({
    url: '/plan/delete',
    method: 'DELETE',
    params: { name }
  })
}

/**
 * 请求最近10次的训练记录数据
 * @param 无
 */
export function getRecentRecords () {
  return request({
    url: '/plan/recent'
  })
}
