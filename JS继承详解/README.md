## 面向对象的类和继承
  * 构造函数绑定：使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上
  ```
  function Cat(name,color){
  　Animal.apply(this, arguments);
  　this.name = name;
  　this.color = color;
  }
  ```

  * 实例继承：将子对象的 prototype 指向父对象的一个实例
  ```
  Cat.prototype = new Animal();
  Cat.prototype.constructor = Cat;
  ```

  * 拷贝继承：如果把父对象的所有属性和方法，拷贝进子对象
  ```
  function extend(Child, Parent) {
  　　　var p = Parent.prototype;
  　　　var c = Child.prototype;
  　　　for (var i in p) {
  　　　   c[i] = p[i];
  　　　}
  　　　c.uber = p;
  }
  ```

  * 原型继承：将子对象的 prototype 指向父对象的 prototype
  ```
  function extend(Child, Parent) {
      var F = function(){};
      　F.prototype = Parent.prototype;
      　Child.prototype = new F();
      　Child.prototype.constructor = Child;
      　Child.uber = Parent.prototype;
  }
  ```
  * ES6 语法糖 extends：class ColorPoint extends Point {}
  ```
  class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
  }
  ```

## JS继承方式及其优缺点
  * 原型链继承的缺点

    * 一是字面量重写原型会中断关系，使用引用类型的原型，并且子类型还无法给超类型传递参数。
    借用构造函数（类式继承）

    * 借用构造函数虽然解决了刚才两种问题，但没有原型，则复用无从谈起。所以我们需要原型链+借用构造函数的模式，这种模式称为组合继承
    组合式继承

    * 组合式继承是比较常用的一种继承方法，其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。