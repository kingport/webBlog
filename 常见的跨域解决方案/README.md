## 常见的几种跨域方式


  * 1、 通过jsonp跨域
  * 2、 document.domain + iframe跨域
  * 3、 location.hash + iframe
  * 4、 window.name + iframe跨域
  * 5、 postMessage跨域
  * 6、 跨域资源共享（CORS）
  * 7、 nginx代理跨域
  * 8、 nodejs中间件代理跨域
  * 9、 WebSocket协议跨域

    * 一、 通过jsonp跨域
      * 通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。

    * 六、 跨域资源共享（CORS）
      * 普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

      * 需注意的是：由于同源策略的限制，所读取的cookie为跨域请求接口所在域的cookie，而非当前页。如果想实现当前页cookie的写入，可参考下文：七、nginx反向代理中设置proxy_cookie_domain 和 八、NodeJs中间件代理中cookieDomainRewrite参数的设置。

      * 目前，所有浏览器都支持该功能(IE8+：IE8/9需要使用XDomainRequest对象来支持CORS）)，CORS也已经成为主流的跨域解决方案。
      
    * 七、 nginx代理跨域
      * 1、 nginx配置解决iconfont跨域 浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。
      ```
        location / {
          add_header Access-Control-Allow-Origin *;
        }
      ```
      * 2、 nginx反向代理接口跨域
        * 跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。
        * 实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。
        nginx具体配置：
      ```
        #proxy服务器
        server {
            listen       81;
            server_name  www.domain1.com;

            location / {
                proxy_pass   http://www.domain2.com:8080;  #反向代理
                proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
                index  index.html index.htm;

                # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
                add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
                add_header Access-Control-Allow-Credentials true;
            }
        }
      ```
        