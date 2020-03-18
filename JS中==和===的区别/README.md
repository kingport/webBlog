## JS中==和===的区别？
  * 这是一道很常见的面试问题？
  * 我们先由题目引出问题
  ```
    6 == 6 // true
    6 === 6 //true
    6 == "6" //true
    6 === "6" //false
  ```
  * 我们可以看出 数字6等于数字6 1 2两行都没有问题
  * 那数字6等于“6”是因为在进行比较时== 会先将数字6转换为“6”进行比较
  * 那6===“6” 就是数字6和字符串6进行对比自然不相等

  ```
    true == 1 //true
    false == 0 //true
    true === 1 //false
    false === 0 //false
  ```
  * bool值进行运算的时候会进行数字转换true变为1false为0 
  * 但是===是不会进行运算转换的

  ```
    '' == 0 // true
    '   ' == 0 //true
    null == undefined //true
    null == 0; // false
    undefined == '' //false
  ```
  * 当字符为空的时候默认进行转换为0 ‘   ‘也是同理的
  * 在JS中有2种特殊的类型 null 和 undefined
  * null 空值 undefined 未申明的变量 2者都是假值
  * 但是2者除了自身以外不等于任何值，不会进行任何转换

  ```
    'false' == false //false
    NaN == NaN // false
    NaN == false //false
    NaN === false //fasle

  ```
  * 我们注意第一个转换的条件是遇到字符串的时候会进行转换，false转为0 但是字符串不会转换
  * NaN是一个特殊的非数字number型它连自身都不会相等更不用说其他的

  ```
    var a = {}
    var b = {}
    var c = a 

    a==b //false
    a===b // false
    a==c // true
    a===c // true
    
  ```
  * 2个对象 2个不同的地址 引用类型比较是比较地址
  * a c 是指向同一个地址 引用同一个对象
