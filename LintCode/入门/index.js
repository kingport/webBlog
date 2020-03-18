/**
 * 你可以假设输入一定是一个只有三位数的整数，这个整数大于等于100，小于1000，然后将整数反转
 * @param {numbr} number
 * @return {number}
 * 我的思路是
 * number --- 转array --- 再反转
 */
  function reverseInteger(number) {
    if(number >= 100 && number < 1000) {
      return parseInt(number.toString().split('').reverse().join(''))
    }else {
      return 
    }
  }

/**
 * 
 * 
 */ 

  