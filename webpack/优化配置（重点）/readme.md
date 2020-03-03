# webpack 性能优化
# 开发环境 生产环境的优化



### 开发环境
  * 优化打包构建速度，调试开发更加高效
  * 优化代码调试

  * HMR 热更新 改变的模块发生变化 其他的不变化 开发体验更好
    * JS(需要自己配置) CSS（style-loader） html (不用)
  * source-map
    * 针对构建后的代码映射技术，快速找到错误位置
    * 开发环境下 source-map
   
### 生产环境
  * 优化打包构建速度
    * oneOf 
      * 优化打包速度
    * 缓存  
      * babel缓存 优化打包速度（第二次打包速度更快）
    * 多进程打包
      * 针对消耗时间长的 通常是JS代码
    * externals
      * 不打包指定的库
  * 优化代码运行的性能
    * 缓存 （hash-chunkhash-contenthash）
      * 3个不用的区别 
        * chunkhash 同一个chaunk同享一个hash值
        * contenthash 内容不同就会生产一个hash
    * tree_shaking 
      * 自动去除无用代码
      * 必须开启ES6
      * 只要是production模式自动开启此模式
      * sideEffect (不想删除的代码可以配置)
    * 代码分割
      * 单入口
        * 只有一个bundle 拆分多个 并行加载
        * options 配置 node_module单独打包一个文件
        * import 语法会将代码进行单独打包
      * 多入口
        * 对指定文件多入口分割
    * 懒加载/预加载
      * 懒加载：使用的时候加载
      * 预加载：其他加载完，再偷偷加载（兼容性问题）
    * PWA
      * 离线可访问技术（TB）
      * 兼容性问题    
    * dll
      * 单独写一个dll.js 配置
      



