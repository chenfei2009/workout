// 计时器格式化
export default function formatTimer (timer) {
  // 获取时分秒
  let h = parseInt(timer / 3600)
  let m = parseInt((timer - h * 3600) / 60)
  let s = timer - h * 3600 - m * 60
  // 格式化
  h = (h < 10 ? `0${h}` : h)
  m = (m < 10 ? `0${m}` : m)
  s = (s < 10 ? `0${s}` : s)
  // h < 10 ? h = `0${h}` : ''
  // m < 10 ? m = `0${m}` : ''
  // s < 10 ? s = `0${s}` : ''
  return `${h}:${m}:${s}`
}
