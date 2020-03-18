### 事件和事件流

  * 事件冒泡
    * 有下往上，从底层往顶层触发
  * 事件捕捉
    * 由上往下，从顶层往低层触发

  * DOM事件流
    * 事件处于捕获阶段
    * 处于目标阶段
    * 事件冒泡阶段
  
   
  * 捕获阶段
    * Document--html--body--div
  * 目标阶段
    * div
  * 冒泡阶段
    * div--body--html--Document

  * 事件处理程序
    ```
      <body onclick="console.log('我是body')">
        <button onclick="console.log('我是button')">
          <span onclick="console.log('我是span')">按钮</span>
        </button>
      </body>
    ```
    * 点击span会出现 我是span 我是button 我是body
    * 点击body会出现 我是body
    * 默认使用事件冒泡
  
  * 事件处理程序-DOM0级
    ```
      <body>
        <button>
          <span>按钮</span>
        </button>
      </body>

      var body = document.getElementsByTagName("body")[0]
      var button = document.getElementsByTagName("body")[0]
      var span = document.getElementsByTagName("body")[0]

      body.onclick = function () {console.log('我是body')}
      button.onclick = function () {console.log('我是button')}
      span.onclick = function () {console.log('我是span')}
    ```
  * 点击span出现 我是span 我是button 我是body
  * 点击body会出现 我是body
  * 也说明DOM0级也是默认使用事件冒泡
  * 事件处理程序-DOM2级
    ```
      var body = document.getElementsByTagName("body")[0]
      var button = document.getElementsByTagName("body")[0]
      var span = document.getElementsByTagName("body")[0]

      function theName() {console.log("我是" + this.nodeName)}

      body.addEventListener("click",theName,false);
      button.addEventListener("click",theName,false);
      span.addEventListener("click",theName,false);

      body.addEventListener("click",theName,true);
      button.addEventListener("click",theName,true);
      span.addEventListener("click",theName,true);
    ```
      * addEventListener() 可以添加3个参数 事件名，函数，bool值
      * 如果bool值不指定，则默认是false
      * 点击span出现 我是span 我是button 我是body
      * 点击body会出现 我是body
      * 也说明DOM2级也是默认使用事件冒泡
      * 当bool值为true时 我是body 我是button 我是span 先触发顶部 先执行事件捕获
      * 

    * 面试题
    ```
      <div class="grandma">
        我是奶奶
        <div class="mother">
        我是妈妈
          <div class="daughter">
          我是女儿
            <div class="baby">
            我是baby
            </div>
          </div>
        </div>
      </div>

      var grandma = document.getElementsByClassName("grandma")[0]
      var mother = document.getElementsByClassName("mother")[0]
      var daughter = document.getElementsByClassName("daughter")[0]
      var baby = document.getElementsByClassName("baby")[0]

      function theName() {console.log("我是" + this.className)}

      baby.addEventListener("click",theName,false) // 冒泡
      daughter.addEventListener("click",theName,true) // 捕获
      mother.addEventListener("click",theName,true) // 捕获
      grandma.onclick = theName // 冒泡
    ```
    * 先触发 捕获 再触发冒泡
    * 冒泡从底部 捕获从顶部
    * mother daughter baby grandma