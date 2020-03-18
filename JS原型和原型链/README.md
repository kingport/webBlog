## 原型和原型链

  * 首先要了解原型和原型链必须知道对象，我们先创建2个对象
  ```
    var a = new String("abc");
    var b = new Number(111);
  ```
  * 打开chorme浏览器我们可以看到
  ```
    String{"abc"}
    Number{666}
  ```

  * 其实_proto_是对象中的一个属性，在创建对象的时候就会生成
  * [[prototype]]另外一种写法

  * 我们用3个引用类型来举例 创建3个不同的对象

  * 根据图示我们可以理解为：
    * a的原型是String
    * b的原型是Number
    * c的原型是object
  * 那我们再探讨 proto有没有原型呢

  * 在图中我们发现string 和 number 都有_proto_属性而object没有
  * 而且_proto_属性是object
  * 所以下图很容易的看出他们的关系

  * 每当新对象被创建的时候，除了各自的属性以外，还有一个隐式的_proto_属性被创建，这个属性会指向各自的原型对象
  * 各自的原型对象还会有自己的_proto_属性，最终会指向object，object是所有对象的基础，理解为object是老祖宗
  * 那么 a b c 的父级就是String Number object
  * 他们都有一个prototype属性 可以理解为 Number.prototype === b._proto_ 都是指向同一个原型对象的
  * a b c 相比是小孩 那么 string number object 是他们的父母 String原型 Number原型 Object原型是他们爷爷奶奶
  * a有_proto_属性可以找到爷爷奶奶，String有prototype可以找到爷爷奶奶
  * constructor 会指向构造abc的对象


## JS new一个对象的过程
  * 一道经典的面试题
  ```
    function Mother(lastName) {
      this.lastName = lastName
    }
    var son = new Mother('Wang')
  ```
  * son 是Mother的实例
  * 那么过程分为以下
    * 创建一个对象son
    * 新对象会被执行_proto_链接
      * son._proto_ = Mother.pototype
    * 新对象和函数调用的this会绑定起来
      * this关键字（略）
    * 执行构造函数中的代码
      * son.lastName
    * 如果函数没有返回值就返回这个新对象 return this


## 原型链
  ```
    function Supermarket() {
      Supermarket.prototype.product = '口罩'
    }
    function Shop() {
      Shp.prototype = new Supermarket()
    }
    var person = new Shop();
    console.log(person.product)
  ```
  * 我们看上代码执行的过程
    * 首先我们去找实例person的属性product 很遗憾我们没有设置
    * 那么会在_proto_上去找那么我们可以理解为
      * person._proto_ === Shop.prototype
    * 那么新实例 Supermarket 那么
      * person._proto_ === Supermarket.prototype
    * 那么再去找 Supermarket，然后就有该属性

  * 如何准确判断一个变量是数组类型？
    *


  * 一道经典的面试题
  * f 是否有a或者b的方法？
  ```
    var F = function(){}
    Object.prototype.a = fucntion(){}
    Function.prototype.b = function() {}

    var f = new F();
  ```
  * 我们理解为 f 是小孩 F是父母
  * 那么小孩去找a b方法我们先找父母，发现F中没有a b方法
  * 我们再向上找爷爷奶奶，通过proto隐式属性来进行查找
  * 可以看到是Object原型对象 里面有a的方法
  * 所以小孩只有a的方法 方法b没有
  * 方法b保存在Fucntion原型对象中



