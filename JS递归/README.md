## 递归：就是不断的进行传递和回归
  * 阶乘
    * 0! = 1
    * 1! = 1
    * 2! = 1 * 2 = 2
    * 3! = 1 * 2 * 3 = 6
    * 4! = 1 * 2 * 3 * 4 = 24
    * 发现规律是:
  ```
    factorial(n) = factorial(n-1) * n
    factorial(0) = 1

    function factorial(n) {
      if ( n === 0) return 1;
      return factorial(n-1) * n
    }
    factorial(4) //24
  ```
  * 一道经典的面试题：
    * 1个细胞，1个小时分裂一次，生命周期是3个小时，求n个小时后，有多少细胞
    * 存活的细胞数，就是白色+黑色+绿色
  ```
    function total() {
      var yellow = fucntion (n) {
        if(n === 0||n === 1) return 0;
        return green(n-1)
      }
      var green = function (n) {
        if( n=== 0) return 0;
        return white(n-1)
      }
      var white = function (n) {
        if(n===0) return 1;
        return white(n -1) + green(n-1) + yellow(n-1)
      }

      return yellow(n) + green(n) + white(n)
    }
  ```