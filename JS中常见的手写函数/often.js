/**
 * 实现一个防抖函数
 * @param {function} fn
 * @param {number} dealy
 */

  function debounce(fn,dealy) {
    let timer = null;
    return function() {
      // 记得清除定时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this,arguments)
      },dealy)
    }
  }

/**
 * 实现一个节流函数
 * @param {function} fn
 * @param {number} dealy
 */
function throttle(fn,dealy) {
  // 定义一个状态
  let flag = true;
  return function() {
    if(!flag) {return}
    flag = false;
    setTimeout(() => {
      fn.apply(this,arguments)
      flag = true
    },dealy)
  }
}

/**
 * 实现一个深克隆 简单版
 * 局限性在于 无法对函数和regexp进行克隆
 * 会抛弃object的constructor
 * @param {object} obj
 */
  function clone(obj) {
    // 简单版
    return JSON.parse(JSON.stringify(obj))
  }

/**
 * 实现一个深克隆 全面版本
 * @param {object} obj
 * @return {object} 
 */
  function clone(obj) {

  }