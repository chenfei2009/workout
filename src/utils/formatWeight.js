// 重量格式化
export default function formatWeight (weight, unit, target) {
  if (target === 'kg') return ToKG (weight, unit)
  return ToLbs (weight, unit)
}

function ToKG (weight, unit) {
  if (unit === 'kg') {
    return {
      weight: weight,
      unit: 'kg'
    }
  } else if (unit === 'lbs') {
    return {
      weight: parseInt(0.4535 * weight),
      unit: 'kg'
    }
  }
}

function ToLbs (weight, unit) {
  if (unit === 'lbs') {
    return {
      weight: weight,
      unit: 'lbs'
    }
  } else if (unit === 'lbs') {
    return {
      weight: parseInt(2.2046 * weight),
      unit: 'lbs'
    }
  }
}