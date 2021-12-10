// 分组聚合函数
export default function groupBy (array, func) {
  const groups = {}
  array.forEach(v => {
    const group = JSON.stringify(func(v))
    groups[group] = groups[group] || []
    groups[group].push(v)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}
