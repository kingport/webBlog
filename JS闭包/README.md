## 如何使用let实现闭包

  * 先看var在闭包中
  ```
    var arr = []
    for(var i = 0; i<10; i++) {
      arr.push(() => i)
    }
    console.log(arr[2]()) // 10
  ```
  * let声明在闭包中
  ```
    var arr = []
    for(let i = 0; i<10; i++) {
      arr.push(() => i)
    }
    console.log(arr[2]()) // 2
  ```
  * 这是因为let会形成一个块级作用域（作用死域），且不会存在变量提升，而setTimeout的this永远绑定window，所以this里是找不到作为全局变量的i的。

  * 一道经典的面试题
  ```
    for (var = 0; i< 5 ;i++) {
      setTimeout(function() {
        console.log(i++) // 5 6 7 8 9
      },4000)
    }
    console.log(i) // 5
  ```
  * 考点：闭包 函数执行上下文 浏览器事件轮询机制
  * 首先执行代码前先创建全局执行上下文
  * 再执行for循环5次setTimeout
  * JS单线程，所以任务队列机制，会先将setTimeout函数结果放到任务队列中，等到执行栈执行完毕后，来开始执行任务队列，所以i++是最后执行
  * 那么在setTimeout中的匿名函数可以访问外部i的值
  * 此时for循环执行后i++ i++ i++ i++ i++变为5
  * 再执行setTimeout函数后访问i那么i是5，循环5次那么就是5，6，7，8，9

  * 如何实现执行0，1，2，3，4
    * 立即执行函数可以实现
    ```
      for (var = 0; i< 5 ;i++) {
        (function(k) {
          setTimeout(function() {
            console.log(k++) // 0,1,2,3,4
          },4000)
        })(i)
      }
    ```
    * let 也可以 略