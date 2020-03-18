## this关键字
  * this的4种绑定规则
    * 默认绑定，指向window
    ```
      function add() {
        console.log(this)
      }
      add() // window
    ```

    * 隐式绑定
      ```
        var girl = {
          name: 'sa',
          age: '20',
          detail: function() {
            console.log(this.name)
          }
        }
        girl.detail();
      ```
      * 此时this默认指向对象girl
      * 隐式绑定直指this的调用对象

    * 硬绑定
      ```
        var girlName = {
          name: '小红',
          sayName: function () {
            console.log(this.name)
          }
        }
        var girl1 = {
          name: '小黑'
        }
        var girl2 = {
          name: '小白'
        }

        girlName.sayName.call(girl1) // 小黑
        girlName.sayName.call(girl2) // 小白

        apply() 方法也是一样
        此时使用call方法绑定this，直指girl1 girl2 不会将小红暴露出来
      ```
    * 构造函数绑定
      ```
        function Love(name) {
          this.name = name;
          this.sayname = function () {
            console.log(this.name)
          }
        }

        var name = '小白'
        var xiaoHong = new Love('小红')
        xiongHong.sayName();
      ```
      * 对实例化对象进行绑定，此时实例化对象是xiaoHong

## 面试题
  ```
    function a() {
      function b() {
        console.log(this)
        function c() {
          "usr strict"
          console.log(this)
        }
        c()
      }
      b();
    }
    a();
  ```
  * 执行了函数a，函数b中输出this，没有指明this调用的对象，那就是默认指向window
  * 在函数c中，使用了严格模式，那么此时的this是undefined

  ```
    var name = 'xiaobai'

    fucntion special() {
      console.log(this.name)
    }

    var girl = {
      name: 'xiaohong',
      detail: function() {
        console.log(this.name)
      },
      woman: {
        name: 'xiaohuang',
        detail: function() {
          console.log(this.name)
        }        
      },
      special: special
    }

    girl.detail(); // xiaohong
    girl.woman.detail(); // xiaohuang
    girl.special(); // xiaohong
  ```

  ```
    var name = 'xiaohong'

    function a() {
      var name = 'xiaobai'
      console.log(this.name)
    }

    function d(i) {
      return i();
    }

    var b = {
      name: 'xiaohuang',
      detail: function() {
        console.log(this.name)
      }
      bibi: function() {
        return function() {
          console.log(this.name)
        }
      }
    }
    var c = b.detail;
    b.a = a;
    var e = b.bibi()

    a(); // xiaohong 没有指明对象 指向全局window
    
    c(); // xiaohong
    c是b中的detail方法 而b中的方法this指向b这个对象，但是c是一个变量，此时c是一个在全局范围内定义的一个函数，因此和函数a一样指向window

    b.a(); // xiaohuang
    b对象中给a定义了一个a属性，而全局中已经声明了函数a，但是是在b对象中使用，a这个全局方法是在b中执行，那么此时this的指向是b中的name属性xiaohuang

    d(b.detail); // xiaohong
    函数d在全局中定义了，并且传了一个b.detail这个参数，b.detail这个方法参数是在全局函数d中执行的所以指向xiaohong

    e(); // xiaohong
    执行bibi()方法，是一个闭包，那么赋值了一个bibi方法，但是e是一个全局声明，所以还是全局windo中name xiaohong
  ```