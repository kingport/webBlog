## JS中的深拷贝和浅拷贝（一般只针对Object Array这样复杂的对象）
  * 我们知道JS中的数据类型是 基本数据类型和引用数据类型
  * 对于基本数据类型：浅拷贝是对值的拷贝
  * 对于对象来说，浅拷贝是对对象地址的拷贝，那么就是说复制的结果是2个对象，但是2个对象指向同一个地址，修改一个对象的属性那么另外一个对象的属性也会被修改，那么深拷贝则是创建新的栈，2个对象对应2个不同的地址，修改其中一个对象的属性不会改变另外一个对象的属性
    
  * 如何实现：
  ```
    第一种方法：通过JSON解析
    var test = {
      name: {
        xing: {
          first: 'zhang',
          second: 'wang'
        }
      }
    }
    var copy = JSON.parse(JSON.stringify(test))
    // 缺点不能处理循环对象，如下代码就会error
    let a = {}
    let b = {a}
    a.b = b
    let copy = JSON.parse(JSON.stringify(a))
    如Map、RegEXp,Date 等在进行序列化的时候会丢失,无法复制function,原型链没有了，所属的类也没有了

    // 封装一个简单的函数来实现
    function cloneObj(obj){
      // 判断obj的隐式属性constructor 是Array还是Object
      let str, newobj = obj.constructor === Array ? []: {}
      // 如果传的参数不是一个object的类型
      if(typeof obj !== 'object') {
        return 
      }
      if(window.JSON) {
        str = JSON.Stringify(obj)
        newobj = JSON.Parse(str)
      }else {
        for (let i in obj) {
          newobj[i] = typeof obj[i] === 'object' ?
          cloneObj(obj[i]) : obj[i]
        }
      }
      return newobj
    }
    // 可以深拷贝对象和数组
  ```