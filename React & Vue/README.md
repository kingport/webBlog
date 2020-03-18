## React & Vue

## 相同点
  * 都有组件化的开发和虚拟Dom
  * 都支持props进行父子组件数据通信
  * 都支持数据驱动试图，不直接操作真实Dom，更新数据状态界面会自动更新
  * 都支持服务端渲染
  * 都有native的方案
## 不同点
  * Vue双向绑定，React数据是单向流动
  * 数据跟新React中必须使用setState，vue中state不是必须的，数据由data属性在vue对象中管理
  * 虚拟don不一样，vue中跟踪每一个组件，不需要更新的不会更新，而react中会重新渲染所有组件，但是可以在钩子中进行优化，16.3—+版本的使用prueComponent会自动优化。

## React
  * React生命周期
    * 16.0之前的生命周期

      * 初始化阶段
        * getDefaultProps
        * genInitialState
        * 通常用ES6的写法
        ```
          constructor(){
            super(props);
            this.state = {}
          }
        ```

      * 挂载阶段
        * componentWillMount: 该钩子函数在组件挂载到DOM之前调用，这个函数里，可以调用setState修改状态，不会导致组件重新渲染。
          * ⚠️: 有人会在此钩子函数中进行AJAX，AJAX是一个异步IO的过程，而生命周期过程是一个同步，在SSR模式下，该函数也会在服务端调用，有可能会触发多次此钩子函数）
        * render: 不会实际的渲染工作，回根据Props和state的数据状态返回新的ReactUI组件，随后由React内部机构去渲染DOM，同时render函数必须是一个纯函数，它的输出只能依赖props和state的数据状态
          * ⚠️: 不能在render中进行SetState,否则会导致组件渲染进入死循环
        * componentDidMount: 组件完成挂载到DOM后调用，在整个生命周期中只会调用一次，于是在这个函数中进行AJAX请求，数据交换最合适

      * 更新
        * 父组件的重新渲染：因为Props是一个对象，每当父组件重渲染时，都回将props对象传递个自组件，导致子组件进行更新（不管props是否有变化），最终导致重渲染，这些渲染大多数是不必要的，可以利用shoudComponentUpdate函数进行优化（比pureComponent定制化更强）
        ```
        class Child extends Component {
          shouldComponentUpdate(nextProps){ 
            // 通过比较 props 里面的一些值来决定该函数是返回 false 还是 true
            // 已决定后面的渲染操作时候继续
            if(nextProps.someThings === this.props.someThings){
              return false
            }
            return true;
          }
          
          render() {
            return <div>{this.props.someThings}</div>
          }
        }
        ```
        
        * 组件本身进行更新setState：无论state是否有变化，都会重新渲染组件。同上进行优化

        * 那么就有3种情况进行组件更新
          * 只有父组件传过来的props变化引发更新，就会涉及到componentWillReceiveProps（如果返回false后面的钩子不会执行）、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate这五个函数的调用
          
          * 自身组件state变化，就会涉及 shouldComponentUpdate（如果这个函数返回 false，那么后续的函数就不会执行）、componentWillUpdate、render 和 componentDidUpdate 这四个函数的调用

          * 父组件传过来的props和组件自身的state进行变化，就会涉及componentWillReceiveProps（如果返回false后面的钩子不会执行）、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate这五个函数的调用

        * 这几个函数做了什么？
          * componentWillReceiveProps(nextProps)：当父组件传递的 props 即将引起组件更新时会被调用，该方法接受一个参数指的是当前父组件传递给组件的最新的 props 状态数据。在这个生命周期方法中，我们可以根据比较 nextProps 和 this.props 新旧 props 的值查明 props 是否改变，依次做一些数据处理的逻辑。

          * shouldComponentUpdate(nextProps, nextState)：这个生命周期函数是 rerender 前必须调用的，不管是 props 引起的重渲染还是 setState 引起的重渲染。这个函数有一个极其重要的特性：它需要返回true 或者 false 来标识组件更新渲染是否继续，如果是返回 true 就继续重渲染逻辑，如果是返回 false 就停止重渲染逻辑。我们可以根据该生命周期函数的这一特性通过比较 nextProps 和 this.props、nextState 和 this.state 减少组件不必要的渲染，优化组件性能。

          * componentWillUpdate(nextProps, nextState)：当 shouldComponentUpdate 函数返回 true 时，接下来就会执行该声明周期方法，可以执行一些组件更新之前的一些操作，一般用得比较少。

          * render：调用时机和作用同上面挂载（Mounting）阶段的 render

          * componentDidUpdate（prevProps, prevState）：此生命周期方法在组件更新完后被调用。因为组件已经重新渲染了，这里可以对组件当前的最新的 DOM 元素进行操作。该方法接受 prevProps 和 prevState 这两个参数，分别指的是组件更新前的 props 和 state。
      
      * 卸载
        * componentWillUnmount： 清除定时器，解绑事件等等工作，防止内存泄漏

    * 16.3以后的版本生命周期有些变化

## Vue
  * vue生命周期
    * beforeCreate: 在这个钩子中，开始初始化实例，拿不到实例中的任何数据，比如data，methods和事件监听
    * created: 实例创建完成后立即调用，这里实例已完成以下的配置：数据观测，属性和方法的运算，watch/event事件回调，然而在挂载阶段还没有开始，$el属性目前是不可见的，这是最早能拿到实例的钩子，应用场景：异步数据的获取和对实例数据的初始化操作都在此进行
    * beforeMount：挂载开始之前被调用，render函数首次被调用，无论created还是beforeMount中都拿不到真实的DOM，想要拿到必须在mounted中操作
    * mounted: mounted中可以获取DOM元素，但是也只能拿到初始化的DOM元素，如果存在异步对DOM元素进行更改（比如setTimeOut中的逻辑），必须在updated中进行获取。场景：初始数据，可以获取DOM
    * beforeUpdate：数据更新后发出的钩子函数，这个钩子中拿到更改之前的数据，虚拟DOM重新渲染调用
    * updated：上面虽然能在update里拿到更改后的数据，但是并不建议在这里面进行对异步数据得到的dom操作，因为有可能你当前的数据不止更改一次，而update只要相关的数据更改一次就会执行一次，注意：updated是指mouted钩子后（包括mounted）的数据更改，在created里的数据更改不叫更改叫做初始化，所以我们下面在created里修改数据是通过一个异步来确保updated可以执行的。我们一般都是在事件方法里更改数据，然后通过updated对其操作。应用场景：如果dom操作依赖的数据是在异步操作中获取，并且只有一次数据的更改 ，也可以说是数据更新完毕：如果对数据更新做一些统一处理在updated钩子中处理即可。
    * beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用
    * destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

