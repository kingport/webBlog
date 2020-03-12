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
    let t = new obj.constructor;
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj !== 'object') return obj
    for(let key in obj) {
      t[key] = clone(obj[key])
    }
    return t
  }

/**
 * 实现一个bind方法
 * @param {}  
 */
  Function.prototype.bind = Function.prototype.bind ||
  function (context) {
      let that = this;
    return function() {
      // 使用apply改变this的指向
      return that.apply(context,arguments)
    }
  }

  /**
   * 将多维数组（尤其是二维数组）转化为一维数组是业务开发中的常用逻辑，
   * 除了使用朴素的循环转换以外，我们还可以利用Javascript的语言特性实现更为简洁优雅的转换
   * @param {array} arr
   * @return {array} reduced
   */
  function reducedDimension(arr){
    let reduced = [];
    for(var i =0; i<arr.length; i++) {
      for(var j = 0; j<arr[i].length; j++) {
        reduced.push(arr[i][j])
      }
    }
    return reduced;
  }
  // 将多维数组（尤其是二维数组）转化为一维数组是业务开发中的常用逻辑 使用concat转换
  function reduceDimension(arr) {
      var reduced = [];
      for (var i = 0; i < arr.length; i++){
          reduced = reduced.concat(arr[i]);
      }
      return reduced;
  }

  /**
   *  手动实现一个Promise 
   */

  // 定义3种状态 pending 进行中  fulfilled 成功返回 rejecrted失败返回
  let sates = ['pending','fulfilled','rejected']
  class MyPromise{
    constructor(callback) {
      // 定义默认状态
      this.state = this.states[0];
      this.value = null;
      this.error = null;
      this.resolveArr = [];
      this.rejectArr = [];
      callback(this.res,this.rej)
    }
    // res 方法
    res(val) {
      // 如果状态为成功
      if(this.state !== this.states[0]) {
        // 赋值状态�且返回值
        this.state = this.states[1];
        this.value =  val;
        this.resolveArr.forEach(fun => fun(value))
        
      }
    }
    // rej 方法
    rej(err) {
      if(this.state !== this.states[2]) {
        // 赋值状态�且返回值
        this.state = this.states[2];
        this.error =  err;

        this.rejectArr.forEach(fun => fun(error))
      }
    }
    // then方法 （返回一个promise）
    then(onFulfilled,onRejected) {
      // 判断参数是否是函数
      if(typeof onFulfilled !== 'function') {return }
      if(typeof onRejected !== 'function') {return }

      // 成功的方法
      if(this.state === this.states[1]) {
        return new MyPromise((rej,res) => {
          try{
            // 执行传入的方法
            const result = onFulfilled(this.value);
            if(result instanceof MyPromise) {
              result.then(res,rej);
            }
          }catch(err){
            rej(err)
          }

        })
      }
      if(this.state === this.states[2]) {
        return new MyPromise((rej,res) => {
          try{
            // 执行传入的方法
            const result = onRejected(this.value);
            if(result instanceof MyPromise) {
              result.then(res,rej);
            }
          }catch(err){
            rej(err)
          }

        })
      }
      
    }
  }

  /**
   * 几种常见的冒泡排序
   * 
   */
  function bubbleSort(arr) {
    for(var j = 0;j<arr.length - 1; j++) {
      for(var i = 0; i<arr.length - 1 -j; i++) {
        if(arr[i]>arr[i+1]) {
          let temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
      }
    }
    return arr;
  }

  /**
   * 快速排序
   * 在平均状况下，排序n个项目要Ο(n log n)次比较。在最坏状况下则需要Ο(n2)次比较，但这种状况并不常见。
   * 事实上，快速排序通常明显比其他Ο(n log n)算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。
   * 找到该数组的基准点(中间数)，并创建两个空数组left和right；
   * 遍历数组，拿出数组中的每个数和基准点进行比较，如果比基准点小就放到left数组中，如果比基准点大就放到right数组中；
   * 对数组left和right进行递归调用。
   */
  function quickSort(arr) {
    if (arr.length <= 1) {return arr;}
    var left = [],
      right = [],
      baseDot = Math.round(arr.length / 2),
      base = arr.splice(baseDot, 1)[0];
  
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < base) {
        left.push(arr[i])
      }else {
        right.push(arr[i])
      }
    }
    return quickSort(left).concat([base], quickSort(right));
  }

  /**
   * 几种常见的去重方式
   * 不考虑兼容性 但是无法去除{}
   * 适用于大部分数据
   */
  function unique (arr) {
    return Array.from(new Set(arr))
  }

  function unique(arr) {
    for(var i = 0; i<arr.length; i++) {
      for(var j = i+1; j<arr.length; j++) {
        if(arr[i] === arr[j]) {
          arr.splice(j,1);
          j--; // 重复的数组去除了一个 所以往前进1
        }
      }
    }
    return arr;
  }

  function unique(arr) {
    let newArr = []
    for(var i = 0; i<arr.length; i++) {
      if(arr.indexOf(arr[i] === -1)){
        newArr.push(arr[i])
      }
    }
    return newArr;
  }

  function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return;
    }
    arr = arr.sort();
    var arrry= [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            arrry.push(arr[i]);
        }
    }
    return arrry;
  }
