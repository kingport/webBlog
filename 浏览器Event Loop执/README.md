## 浏览器Event Loop执行流程,彻底搞懂代码执行顺序


## 单线程的含义
  * 在chrome中，一个tab对应一个Render process，Render process是main thread负责页面渲染，执行JS和Event Loop

## 浏览器端的Event Loop
  * 一个函数执行栈，一个事件队列和一个微任务队列。
  * 每从事件队列中取一个事件时有微任务就把微任务执行完，然后才开始执行事件
  * 宏任务和微任务
    * 宏任务：队列中只取出一个来执行，然后在第二个宏任务中，如果有微任务队列就把微任务队列全部执行完再执行宏任务，一些异步任务的回调会依次进入，等待后续被调用，这些异步任务包括：
      * setTimeout
      * setInterval
      * serImmediate (node独有)
      * requestAnimationFrame(浏览器独有)
      * I/O (文件读取 网络获取)
      * UI rendering
    * 微任务：另一些异步任务的回调会一次进入微任务队列，等待后续被调用，这些异步任务包括：
      * process.nextTick(node 独有)
      * Promise.then()
      * Object.observer
      * MutationObserver
    * ⚠️ promise构造函数里的代码是同步执行的（优先级高）

    * 一道经典的面试题
    ```
      console.log('script start')

      setTimeout(() => {
        console.log('setTimeout')
      },0)

      Promise.resolve().then(() => {
        console.log('promise1')
      }).then(() => {
        console.log('promise2')
      })

      console.log('end start')
    ```
    * 执行顺序
    * script start 同步代码执行
    * setTimeout 放入宏队列 等待下一轮
    * promise 回调放入微队列 等待下一轮
    * end start 同步代码执行
    * 所以第一轮是 script start-----end start----setTimeout（等待）----promise(等待)
    * 第二轮到宏任务要先把所有的微任务队列执行完，结果：
    script start-----end start----promise1----promise2---setTimeout

## NodeJS的Event Loop
  * 机制在libuv（node中的库）中
  * 宏任务队列中的所有宏任务执行完毕后才会执行下一个宏任务队列
  * Node中分为6个阶段（有多个宏任务队列）
    * timers（计时器）执行setTimeout以及setInterval的回调
    * I/O callbacks 处理网络 流 tcp的错误callback
    * idle.prepare node内部使用
    * poll（轮询）执行poll中的i/o队列，检查定时器是否到时
    * check(检查) 存放setTimediate回调
    * close callbacks 关闭的回调

## Node端和浏览器端的不同
  * 实现机制不一样
  * node中可以理解为4个宏任务队列和2个微任务队列，执行宏任务时有6个阶段
  * node中，先执行全局JS代码，执行完同步代码调用栈清空后，先从微任务队列next tick queue中依次取出所有任务放入调用栈中执行。（⚠️浏览器只取一个宏任务），每个阶段宏任务执行完后，开始执行微任务，再执行下一阶段宏任务，一次构成循环


## 面试常考细节
  * 微任务有2种，哪种比较快
    * process.nextTick(优先) promise.then(()=>{})
  * setTimeout和setImmediate
    * 输出结果先后都有可能：setTimeOut 中时间参数0是没有意义的，最小取值范围是1ms
    * 那么表示代码执行时间如果大于1ms 那么就后执行，如果代码的执行时间小于1ms那么就先执行