## Vue双向绑定的实现、详解
  * 实现的核心是 object.definedproperty()
  * 对data的每个属性进行了get、set的拦截
  * 观察者模式，在双向绑定的模式中会更有效率，他是一对多的模式，
    * 一：改了某一个date数据就是一
    * 多： 就是页面上用了该数据的地方，都更新
  
  * object.definedproperty()有3个参数
    * 属性所在的对象
    * 你要操作的属性
    * 被操作的属性的特性，这个参数的格式是{},一般是2个
      * get, 读取时触发
      * set, 写入时触发

## 双向绑定的几种主流做法
  * 脏值检测（angular.js）定时轮询检查数据变动
  * 订阅发布 （效率比较低）
  * 数据劫持 （vue.js）
    * object.definedproperty()通过get set去劫持
## 实现MVVM的双向绑定
  * 实现一个数据监听器Observr,能够对数据对象的所有属性进行监听
    * 数据对象是什么意思呢？
      ```
        new Vue({
          el: '#app',
          data: {
            name: 'zhangsan'
          }
        })
      ```
      * 那么它监听的就是这个data
  * 实现一个compile指令解析器，对元素的每个节点进行扫描和解析，根据指令替换数据，以及绑定相应的更新函数
  * 实现一个wathcer，作为链接observer和compile的桥梁，能够订阅收到每个属性的变动，执行相应的回调函数，从而更新view
  * MVVM入口函数，整合以上三者
## 实现observer
  * 我们知道可以利用Object.defineProperty()方法来监听属性的变动，那么将需要observer的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter
  * 这样得话，给对象的某个赋值，就会触发setter，就能监听到数据变化
    ```
      // 定义一个observer方法
      function observer(data) {
        // 检查data是否是对象类型
        if(!data || typeof data !== 'object') {
          return 
        }
        // 取出对象中所有的属性进行便利
        Object.keys(data).forEach((key) => {
          // 调用defineReactive方法
          defineReactive(data,key,data[key])
        })
      }

      // 定义defineReactive方法用来监听
      function defineReactive(data,key,val) {
        // 这里调用observer是为了监听对象中的子属性，相当于是对象中的对象的属性
        observer(val)
        Object.defineProperty(data,key,{
          configurable: false,
          get: function() {
            return val;
          },
          set: function(newVal) {
            console.log(val,"--->",newVal)
            val = newVal
          }
        })
      }
      var data = {name: 'zhangsan'}    
    ```
  * 以上实现了监听数据的变化，那么还有一步就是通知订阅者，实现一个消息订阅器，如下
    ```
      function defineReacive(data,key,val) {
        let dep = new Dep()
        observer(val);
        Object.defineProperty(data,key,{
          configurable: false,
          get: function() {
            return val;
          },
          set: function(newVal) {
            console.log(val,"--->",newVal)
            val = newVal
            //在这里去通知所有的订阅者
            dep.notify() 
          }
        })
      }
      // 此方法就是创建构造函数中的subs属性为一个数组
      function Dep() {
        this.subs = []
      }
      Dep.prototype = {
        addSub: function(sub) {
          this.subs.push(sub)
        },
        notify: function() {
          this.subs.map((sub) => {
            sub.update()
          })
        }
      }
    ```
  * 那么现在谁是订阅者，如何添加订阅者，上文中明确订阅者是wather，而且在dep实例中，在defineReactive中定义得，所以想通过dep添加订阅者，就要在闭包中进行操作，我们可以在getter中添加
    ```
      get: function() {
        // 由于是在闭包中添加wather，所以在全局中定义
        一个target属性，暂存wather，添加完后移除
        Dep.target && dep.addSub(Dep.target)
      }

      // watcher中得prototype
      watcher.prototype = {
        get: function() {
          Dep.target = this;
          this.value = data[key]; // 触发getter
          Dep.target = null
        }
      }
    ```
## Vue通信的几种方式
  * 父子组件之间的通信
  * 非父子组件之间的通信（兄弟组件，隔代组件等）

  * 大概分为以下几类
    * props/$emit
    * $children/$parent
    * provide/ reject
    * ref
    * eventBus
    * vuex
    * localStorage/sessionStorage
    * $atter/$listeners
  
  * 1、props/$emit
    * 父组件通过props的方式向子组件传递数据，而通过$emit自定义事件子组件可以像父组件通信，父组件通过v-on来监听接收
  * 2、$children/$parent
    * 通过$children/$parent可以访问组件的实例，拿到实例代表可以访问组件的所有方法和data
    ```
      父组件中定一个方法
      change() {
        // 获取子组件A
        this.$children[0].messageA = 'kkk'

      }
      子组件中获取父组件的值
      <p>获取父组件的值为:  {{parentVal}}</p>
      parentVal(){
        return this.$parent.msg;
      }
      注意：$parent是一个对象，而$children是一个数组
    ```
    * 3、provide（准备）/inject(注入)
      * 简单来说就是父组件中通过provide来提供变量，然后在子组件中通过inject来注入变量
      * ⚠️ 这里无论子组件嵌套多深，都可以通过inject来注入provide中的数据，不局限与当前的父组件的props属性中回去的数据
      ```
        // A组件 （父）
          provide: {
            for: "demo"
          },
        // B组件 （子）
          inject: ['for'],
          data() {
            return {
              demo: this.for
            }
          }
        // C组件 （B的子）
          inject: ['for'],
          data() {
            return {
              demo: this.for
            }
          }
          都可以访问到demo的值
      ```
    * 4、ref/refs 
      * ref如果在普通DOM上使用，引用指向的就是DOM元素，如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法
      ```
        // 子 A.vue
        export default {
          data() {
            return {
              name: 'vue'
            }
          },
          methods: {
            sayHellow() {
              console.log('hello')
            }
          }
        }

        // 父 app.vue
        <template>
          <component-a ref="comA"></component-a>
        </template>
        <script>
          export default {
            mounted () {
              const comA = this.$refs.comA;
              console.log(comA.name);  // Vue.js
              comA.sayHello();  // hello
            }
          }
        </script>
      ```
    * 5、eventBus
      * 可以理解为事件中心，通过向中心注册发送或者接收事件，所有组件都可以通知其他组件（项目大时难以维护）
      ```
        首先创建一个将其导出
        export const EventBus = new Vue()

        发送一个事件
          比如在A组件中发送事件
          import {EventBus} from './event-bus.js'
          console.log(EventBus)
          export default {
            data(){
              return{
                num:1
              }
            },
            methods:{
              additionHandle(){
                EventBus.$emit('addition', {
                  num:this.num++
                })
              }
            }
          }
          在B组件中接收
          import { EventBus } from './event-bus.js'
          export default {
            data() {
              return {
                count: 0
              }
            },
            mounted() {
              EventBus.$on('addition', param => {
                this.count = this.count + param.num;
              })
            }
          }
      ```
    * 6、Vuex(常用)
      * Vuex是一个专门为vue开发的状态管理模式，集中式管理应用中的所有组件的状态
      * Vuex中的各个模块
        * state 用于数据的储存，是store中的唯一数据源
        * getters 基于state数据的二次包装，常用数据的筛选和多个数据的相关性计算
        * mutations 类似函数，改变state数据的唯一途径，不能用于异步事件
        * actions 类似于mutation，用于提交改变mutations的状态，不能直接更改状态，可以包含异步操作
        * modules 类似于命名空间，用于项目中将各种模块的状态分开定义和操作，便于维护
        ```
          // vuex中 store.js
          import Vue from 'vue'
          import Vuex from 'vuex'
          Vue.use(Vuex)
          const state = {
            // 初始化A和B组件的数据，等待获取
            AMsg: '',
            BMsg: ''
          }

          const mutations = {
            receiveAMsg(state, payload) {
              // 将A组件的数据存放于state
              state.AMsg = payload.AMsg
            },
            receiveBMsg(state, payload) {
              // 将B组件的数据存放于state
              state.BMsg = payload.BMsg
            }
          }

          export default new Vuex.Store({
            state,
            mutations
          })

           this.$store.state.AMsg 获取store中的A组件值
           // 触发receiveBMsg方法。将B组件的数据存入store
           this.$store.commit('receiveBMsg', {
              BMsg: this.BMessage
            })
        ```

