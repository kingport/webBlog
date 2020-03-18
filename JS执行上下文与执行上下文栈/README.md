## 变量提升与函数提升
  * 看一道基础的面试题（变量提升）
  ```
    var a = 3
    function fn() {
      console.log(a);
      var a = 4;
    }
    // a的值 undefined
  ```
  * console.log(a) 会现在函数内部找a，发现a在下面，但是由于JS有变量提升，所有a提升到上面进行了声明var a ;，但没有赋值
  * 所以是undefined 全局a=3，是不会去找的


  * 函数提升
  ```
    f2() // 222
    f3() // 变量提升无法打印
    function f2() {
      console.log(222)
    }
    var f3 = function () {
      console.log(3333)
    }
  ```
## 全局执行上下文
  * 在执行全局代码前将window确定为全局执行上下文
  * 对全局数据进行预处理
    * var 定义的全局变量---undefined,添加为window的属性
    * function 声明全局函数---赋值（fun），添加window方法
    * this--赋值window
  * 开始执行全局代码
## 函数执行上下文
  ```
    function fn(a1) {
      console.log(a1); // 2
      console.log(a2); //undefined
      a3(); // a3
      console.log(this); //window
      console.log(arguments); // 伪数组（2,3）
      var a2 = 3 ;
      function a3() {
        console.log('a3')
      }
    }
    fn(2,3)
  ```
  * 在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象
  * 对局部数据进行预处理
    * 形参变量--赋值（实参）--添加为执行上下文的属性
    * var 定义的全局变量--undefined，添加为执行上下文的属性
    * function声明的函数---赋值（fun）---添加为执行上下文的方法
    * this---赋值（调用函数对象）
  * 开始执行函数体代码
## 执行上下文栈
## 面试题