## Redux的工作流程
  * Store 保存数据的地方，整个应用只能有一个store
  * State Store对象包含所有的数据，如果想获取某个时点的数据，就要对Store进行快照。类似映射？
  * Action state的变化会导致view的变化，但是必须通过action来对view发出通知，才能发生变化
  * dispath 是view发出action的唯一方法
  * reducer Store收到Action后，必须返回一个新的state，这样view才会更新，这种State的计算过程就叫做reducer，reducer是一个函数，它接收action和当前的state做为参数，返回一个新的state

  * 首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。
  * 然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
  * State一旦有变化，Store就会调用监听函数，来更新View。
  * 到这儿为止，一次用户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种方式保证了流程的清晰。

## Redux的工作流程