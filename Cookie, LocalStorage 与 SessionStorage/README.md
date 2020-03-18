## 浏览器中的Cookie, LocalStorage 与 SessionStorage
  * LocalStorage和SessionStorage
    * 储存大小都在5M左右
    * 都有同源策略的限制
    * 仅在客户端保存，不参与服务端的通信
  * 两者的不同点在于
    * 生命周期不同
      * localStorage是永久性的，除非用户主动删除否则会一直存在
      * sessionStorage是与所在的标签页的有效期是相同的。一旦窗口或者标签页被关闭，那么通过sessionStorage储存的数据也会被删除
    * 作用域的不同 
      * localStorage是在同一个浏览器内，同源文档共享数据，可以互相读取更改
      * sessionStorage是在同一个浏览器内，同源文档共享数据，可以互相读取更改，但是只有同一浏览器同一窗口的同源文档才能共享数据
  
  * Cookie的特点
    * 非常小，大概4kb
    * 主要用途是保存登录信息用户标记，不过随着localStorage的出现，cookie的使用比较少了
    * 一般由服务器生成，可以设置失效时间，默认是关闭浏览器后失效
    * 每次会携带http头 如果使用cookie保存过多数据会有性能问题
    * 使用不方便没有Storage好，需要自己封装函数
    