// 数字格式化
export default function formatNum (num, length) {
  const curLength = getLength(num)
  if (curLength >= length) return num.toString()
  return num.toFixed(length)
}

function getLength (num) {
  const targetList = num.toString().split('.')
  if (targetList.length === 1) return 0
  return targetList[1].length
}
