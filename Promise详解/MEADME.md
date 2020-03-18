## Promise 是为了解决地狱回调的问题，让业务代码更加简洁，是ES6中重要特性。
  * 创建一个promise类,看如下代码promise是如何使用的 
  ```
    const promise = new Promise((res,rej) => {
      try {
        res('promise')
      }
      catch(err){
        rej(err)
      }
    })
    1. 首先它是一个构造函数方法，并且接收一个function为参数
    2. 接收2个参数res成功后的返回值，rej失败返回的原因

  ```
  * 我们先来分析一下，首先创建一个promise 类
  ```
    class Mypromise {
      // 构造函数接收一个function方法
      constructor(callback) {
        callback(this.res,this.rej)
      }
      rej(err) {

      }
      res(value) {
      }
    }
    // 测试一下
    var test = new Mypromise((res,rej) => {
      console.log('hello promise')
    })
  ```
  * 现在我们创建的类中可以执行传入的方法了，但是传入的res和rej有什么用呢
  * 我们去promise规范中得知，promise中有3中状态
    * pending 等待
    * fulfilled 成功
    * rejected 失败
  * 当状态为 pending时，promise可以变为fulfilled或者rejected
  * 当状态为 fulfilled时，promise不能改变其状态，必须有值返回
  * 当状态为 rejected时，promise不能改变其状态，必须有拒绝的原因返回

  * 那么在Mypromise中必须定义三种状态
  ```
    定义3种状态
    const states = ['pending','fulfilled','rejected'];

    class Mypromise {
      // 构造函数接收一个function方法，每个类都会有此方法
      constructor(callback) {
        this.state = this.states[0]; // 当前的状态，默认pending
        this.value = null; // 默认返回成功的值
        this.err = null; // 默认返回错误的值
        callback(this.res,this.rej); // 默认执行回调函数
      }
      // 成功返回函数
      res(value) {
        // 判断当前状态
        if(this.state === this.states[0]) {
          // 将状态变为成功 并且返回值
          this.state = this.states[1]
          this.value = value          
        }
      }
      // 失败返回函数
      rej(err) {
        // 判断当前状态
        if(this.state === this.states[0]) {
          // 将状态变为失败 并且失败原因
          this.state = this.states[2]
          this.err = err          
        }
      }
    }
    // 测试后，调用resolve后，状态变为fulfilled，再调用reject时，状态和值都不会改变，这样符合Promise规范~~
  ```
  * 写到现在，promise已经可以实现返回成功和失败的值了，但是值是怎么输出到业务上的呢，还是通过promise的规范，可以看到他是通过then方法来输出值的，then是一个必要的方法（详细解析可以了解官方的规范）
    * promise必须提供一个then方法去访问当前的值或者最终的值或原因
    * promise中接收2个参数  onFulilled 和 onRejected
    * onFulilled和onRejected两者都是一个可选的参数：

      * 如果onFulilled不是一个函数，它必须被忽视
      * 如果onRejected不是一个函数，它必须被忽视


      * 如果onFulilled是一个函数：
      * 它必须在fulfilled时被调用，promise方法中的value作为第一个参数
      * 它必须在fulfilled之前不被调用
      * 它不能被多次调用


      * 如果onRejected是一个函数：
      * 它必须在rejected时被调用，promise方法中的reason作为第一个参数
      * 它必须在rejected之前不被调用
      * 它不能被多次调用


      * 在执行上下文堆栈仅包含平台代码之前，不能调用onFulfilled或onRejected
      * onFulfilled和onRejected必须是一个函数
      * then可以在同一个promise中多次被调用
      * then必须返回一个promise

  * 我们来实现then方法
  ```
    const states = ['pending','fulfilled','rejected'];

    class Mypromise {
      // 构造函数接收一个function方法，每个类都会有此方法
      constructor(callback) {
        this.state = this.states[0]; // 当前的状态，默认pending
        this.value = null; // 默认返回成功的值
        this.err = null; // 默认返回错误的值
        callback(this.res,this.rej); // 默认执行回调函数
      }
      // 成功返回函数
      res(value) {
        // 判断当前状态
        if(this.state === this.states[0]) {
          // 将状态变为成功 并且返回值
          this.state = this.states[1]
          this.value = value          
        }
      }
      // 失败返回函数
      rej(err) {
        // 判断当前状态
        if(this.state === this.states[0]) {
          // 将状态变为失败 并且失败原因
          this.state = this.states[2]
          this.err = err          
        }
      }

      // 定义then方法
      then(onFulfilled,onRejected) {
        // 判断参数是否一个函数
        if(typeof onFulfilled !== 'function') {return };
        if(typeof onRejected !== 'function') {return };


        // 如果状态是fulfilled
        if(this.state === this.states[1]) {
          // 必须返回一个promise
          return new Mypromise((res,rej) => {
            try{
              // 执行传入的方法
              const result = onFulfilled(this.value)

              // 如果返回一个promise，则调用then方法
              if(result instanceof Mypromise) {
                result.then(rej,res)
              }else {
                // 直接将值返回
                res(result)
              }
            }catch(err){
              rej(err)
            }
          })
        }


        // 如果状态是rejected
        if(this.state === this.states[2]) {
          // 必须返回一个promise
          return new Mypromise((res,rej) => {
            try{
              // 执行传入的方法
              const result = onRejected(this.value)

              // 如果返回一个promise，则调用then方法
              if(result instanceof Mypromise) {
                result.then(rej,res)
              }else {
                // 直接将值返回
                res(result)
              }
            }catch(err){
              rej(err)
            }
          })
        }      
      }
    }
    // 到这里基本的promise已经可以运行了，但是如果遇到异步请求的时候，比如setTimeout，res不能按照上下文执行，会导致then失败
  ```
  * 如下情况then方法会失效
  ```
  var test = new MyPromise((resolve, reject) => {
      setTimeout(() => {
          resolve(123);
      }, 2000)
  })
  .then(msg => {
      console.log(msg);
      return 456;
  })

  ```
  * 因为在调用then方法的时候，promise的状态还没有改变，而我们的then方法还没有处理pending状态的逻辑。 这导致执行异步方法的时候，then方法不会返回任何东西
  * 比如，在上面的例子中，javscript已经把then方法执行了，但setTimeout中的方法还在eventloop中等待执行。
  这样需要做的是：

  * 将then中的方法保存起来，等待resolve或reject执行后再调用刚刚保存的then中的方法
  由于在这期间可能会有多个then方法会被执行，所以需要用一个数据来保存这些方法
  根据这两点，再来修改一些代码
  ```
  // 在constructor中新增两个数组分别用于装then中的resolve和reject方法
  constructor(callback) {
      this.resolveArr = [];
      this.rejectArr = [];
  }
  
  // 修改resolve方法
  resolve = (value) => {
      // 判断状态是否需要是pending
          if (this.state === stateArr[0]) {
            this.state = stateArr[1]; // 更新状态为 fulfilled
            this.value = value; // 写入最终的返回值
            
            this.resolveArr.forEach(fun => fun(value)) // 循环执行then已插入的resolve方法
          }
  }
  
  // 修改reject方法
  reject = (reason) => {
      // 判断状态是否需要是pending
          if (this.state === stateArr[0]) {
            this.state = stateArr[1]; // 更新状态为 fulfilled
            this.reason = reason; // 写入最终的返回值
            
            this.rejectArr.forEach(fun => fun(reason)) // 循环执行then已插入的reject方法
          }
  }
  
  // then方法中需要添加捕捉pending状态的逻辑
  then = (onFulilled, onRejected) => {
      // 如果状态为pending
      if (this.state === stateArr[0]) {
          return new Promise((resolve, reject) => {
              // 插入成功时调用的函数
              this.resolveArr.push((value) => {
                  try {
                      const result = onFulilled(value);
                      if (result instanceof MyPromise) {
                          result.then(resolve, reject);
                      } else {
                          resolve(result);
                      }
                  } catch(err) {
                      reject(err);
                  }
              })
              
              // 插入失败时调用的函数
              this.rejectArr.push((value) => {
                  try {
                      const result = onRejected(value);
                      if (result instanceof MyPromise) {
                          result.then(resolve, reject);
                      } else {
                          resolve(result);
                      }
                  } catch(err) {
                      reject(err)
                  }
              })
          })
      }
  }
  ```
