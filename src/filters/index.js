/**
 * 截取字符串
 * @param string 欲截取的字符串
 * @param retainNum 保留字符串长度
 * @returns {String} 过滤够的字符串
 */
export function cutString (string, retainNum) {
  if (string.length > retainNum) {
    return string.substr(0, 4) + '...'
  }
  return string
}

/**
 * 友好显示时间 （几天前）
 * @param time 时间戳
 * @returns {string} 友好时间
 */
export function fromNow (timeStamp) {
  let time = new Date(timeStamp).getTime()
  const between = (Date.now() - Number(time)) / 1000
  if (between < 3600) {
    return ~~(between / 60) + ' 分钟前'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' 小时前'
  } else {
    return ~~(between / 86400) + ' 天前'
  }
}
