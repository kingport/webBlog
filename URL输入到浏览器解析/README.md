## URL的输入到浏览器解析
  *  DNS解析
  *  发起TCP连接
  *  发送Http请求
  *  服务器处理请求并且返回HTTP报文
  *  浏览器解析渲染页面
  *  连接结束

# DNS解析
  * 将网址和IP地址进行转换，首先在本地域名服务器中查找，没有找到就去根域名服务器查找，没有再去com域名服务器中查找，依次类推下去，直到找到IP地址，大致过程 .---->.com---->google.com--->www.google.com
  * DNS优化 DNS缓存 DNS负载均衡
  * 缓存有很多种，例如浏览器缓存，系统缓存，路由器缓存，服务器缓存
  * 系统缓存主要在hosts中
  * 负载均衡则是每次响应并不是同一个服务器，DNS返回一个合适机器的IP给用户，根据每台机器的负载量，这样的过程叫做负载均衡

# Tcp链接
  * TCP提供一种可靠的传输，这个过程涉及到三次握手，四次挥手
    * 三次握手
      * 1.客户端发送syn包到服务器，并且进入SYN_SEND发送状态，等待服务器确认
      * 2.服务器收到syn包，必须确认客户端的syn，同时自己也发送一个syn包，即SYN+ACK包，此时服务器进入SYN_RECV接受状态
      * 3.客户端收到服务器的SYN+ACK包，向服务器发送确认，此包发送完毕，客户端和服务器进入ESTABLISHED （已确定）状态
    * 四次挥手
      * 1.客户端发送一个FIN，用来关闭客户端到服务端的数据传送
      * 2.服务端收到FIN包后，发送一个ACK给对方并且带上自己的序列号，此时服务端进入关闭等待的状态，这时处于半关闭状态，客户端没有数据发送了，服务器发送数据，客户端依然要接受，客户端进入终止等待状态，等待服务器发送连接释放报文
      * 3.服务器发送一个FIN,用来关闭服务器到客户端的数据传送，也就是告诉客户端，我的数据也发送完了，不会再发送数据了，此时服务器进入最后确认状态，等待客户端的确认
      * 4.主动关闭方收到FIN收，发送一个ACK给被动关闭方，此时客户端进入时间等待状态，服务器只要收到了客户端发出的确认，立即进入关闭状态

# 发送Http请求
  * https的端口为443 http的端口为80/8080
  * 发送http请求的过程就是构建http请求报文并通过TCP协议中发送到服务器	指定	端口，请求报文由请求行，请求报头，请求正文组成

  * 请求行
    * 请求行常用的方法有：GET POST PUT DELETE OPTIONS HEAD
    * GET和POST的区别
      * 1.GET参数通过URL传递，POST放在body中
      * 2.GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
      * 3.GET只接受ASCLL字符，而POST没有限制
      * 4.GET请求会被浏览器主动缓存，而POST不会，除非手动设置
      * 5.GET 只能进行URL编码，而POST可以支持多种编码方式
      * 6.GET在URL上参数长度有限制，而POST没有
  * 请求报头 
    * 请求报头允许客户端向服务器传送请求的附加信息和客户端自身的信息
    * 报头使用字段：Accept Accept-Encoding Accept-Language Cache-Contril	等字段，指定客户端用户接受哪些类型的信息
  * 请求正文
    * 当使用POST， PUT方法时，通常需要向服务端传递数据，这些数据存储	在正文中，数据格式一般为json，一般设置成applictaion/json

  * HTTP缓存（重要）：
    * Http属于客户端缓存，常认为浏览器有一个缓存数据库，用来保存一些静态	文件
    * 缓存的规则
      * 1.强制缓存：当缓存数据中有客户端需要的数据，客户端直接将数据从其中拿出来使用，当缓存服务器中没有需要的数据时，客户端才会向服务端请求，对于强制缓存，服务器响应中使用两个字段来表明
        * Expires: 为服务器但会数据的到期时间，当再次请求的时间小于返回的此时间，则直接使用缓存数
        * Cache-Control: 有较多属性
        * Private: 客户端可以缓存
        * Public: 客户端服务端都可以缓存 
        * Max-age=t: 缓存内容在t秒后失效
        * no-cache: 需要使用协商缓存来验证缓存数据
        * no-store: 所有类容都不会缓存
      * 2.协商缓存：客户端先从缓存数据中拿出一个缓存标识，向服务端验证标识是否有效，如果有效返回304，如果失效，服务端返回新的数据，通过请求报文，判断缓存是否失效
        * Last-Modified: 服务器在响应请求时，会告诉浏览器资源的最后修改时间
        * Etag: 服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识，实际应用时Etag的计算是使用算法得出的，会占用服务端的资源，所有服务端的资源都是宝贵的，所以就很少使用Etag
      * 缓存的优点：
        * 减少了冗余的数据传递，节省了带宽流量
        * 减少了服务器的负担，大大提高了网站性能
        * 加快了客户端的网页加载速度

  * 服务器处理请求并返回HTTP报文
    * 1XX： 指示信息-表示请求已接受，继续处理
    * 2XX: 成功表示请求已被成功接收，理解
    * 3XX: 重定向 要完成请求必须进行下一步的操作
    * 4XX: 客户端错误
    * 5XX: 服务端的一些错误

  * 浏览器解析渲染页面
    * 解析HTML形成DOM树
    * 解析CSS形成CSSOM树
    * 合并DOM树和CSSOM树形成渲染树
    * 浏览器开始渲染并绘制页面，过程中涉及2个重要的概念，回流和重绘
      * 回流： DOM节点都是盒模型形式存在，需要浏览器去计算位置和宽度等
      * 绘制： 等到页面宽高，大小，颜色属性确定后，浏览器开始绘制内容
    * 这2个过程是非常非常消耗性能的，所以我们应该尽量减少页面的回流和重绘。
    * 优化：
      * CSS：
      * 避免使用table布局
      * 尽可能在DOM树末端改变class
      * 避免设置多层内联样式
      * 将动画效果应用到posititon属性为absolute或者fixed上
      * 避免使用CSS表达式（calc()）
      * JS:
      * 避免重复操作DOM，
      * 避免重复操作样式
      * 避免使用复杂的动画，如果使用使他脱离文档流
