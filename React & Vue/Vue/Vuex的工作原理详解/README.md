## Vuex的工作原理详解
  * 通过官方的文档提供的流程图可以归类为一下
    * 数据从state中渲染到页面
    * 在页面中通过dispath来触发action
    * action通过调用commit，来触发mutation
    * 只有mutation能更改state中的数据，数据更改后就会触发dep对象中的notify，通知所有的wather对象来进行组件更新（这也就是vue的双向绑定原理）
  
  * Vuex的工作流程
    * 首先通过dispatch提交一个action
    * 在action中我们可以执行一些异步的操作，或者根据不同的情况分发不同的mutation
    * 接着在action中调用commit，触发一个mutation
    * 所有修改state的操作，全部应该放在mutation中来做
    * 而state更新之后，会调用Vue的底层方法，通知视图进行更新渲染

  * Vuex的核心属性及使用
    * state存储了Vuex的基本数据，在state中存储的数据都是经过Vue底层watcher侦听的数据，可以实现响应式数据

    * actions存放了Vuex中所有的异步操作，可以在actions中通过commit分发不同的mutation，在不同的情况下执行不同的方法

    * mutations存放了Vuex中所有关于state的操作，修改state只能通过mutations，否则的话数据不会响应式更新

    * getters就类似与Vue实例中的computed，计算属性，所有关于数据的复杂计算应该放在getters中来操作
    
    * modules，类似于redux中的reducer，每一个module都拥有自己的state、mutations、actions、getters；将整个store根据功能或者数据分解成不同的模块，最后合并在一个Store中


  * mutaions特点
    * 每个mutation都有一个字符串的事件类型（type）和一个回调函数（handler），这个回调函数就是我们实际更改状态的地方，并且他会接收一个state作为第一个参数
    ```
    const store = new Vuex.Store({
      state: {
        count: 1
      },
      mutations: {
        increment (state) {
          // 变更状态
          state.count++
        }
      }
    })
    // ...
    mutations: {
      increment (state, n) {
        state.count += n
      }
    }

    store.commit('increment', 10)
    ```

  