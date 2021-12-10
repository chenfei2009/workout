import request from './request'

/**
 * 请求动作列表数据
 * 包含当前日期对应的 count
 * @param {interger}  pid 部位编号
 * @param {string}  date 当前日期
 */
export function getMoves (pid, date) {
  return request({
    // 写法1
    // url: `/movement?id=${id}`
    // 写法2
    url: '/movement',
    params: { pid, date }
  })
}

/**
 * 更新动作列表数据
 * @param {array}  formData 值组成的列表
 */
export function updateMoves (formData) {
  return request({
    url: '/movement/update',
    method: 'PUT',
    data: { formData }
  })
}

/**
 * 查询待删除动作是否有历史记录数据
 * @param {interger} id 当前动作编号
 */
export function getRecordCountById (id) {
  return request({
    url: `/movement/record/${id}`
    // url: '/movement/record/:id',
    // params: { id }
  })
}

/**
 * 删除动作
 * @param {interger} id 当前动作编号
*/
export function deleteMoveById (id) {
  return request({
    url: `/movement/delete/${id}`,
    method: 'DELETE'
    // params: { id }
  })
}

/**
 * 新增动作
 * @param {object} move 当前动作对象
*/
export function addMove (move) {
  return request({
    url: '/movement/add',
    method: 'POST',
    data: move
  })
}
