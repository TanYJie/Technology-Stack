# BOM 
　　BOM （浏览器对象模型）提供了很多对象，用于访问浏览器的功能。多年来，缺少事实上的规范导致 BOM 既有意思又有问题。本文中介绍以下几个对象：
  * [window 对象](#window-对象)
  * [location 对象](#location-对象)
  * [navigator 对象](#navigator-对象)
  * [screen 对象](#screen-对象)
  * [history 对象](#history-对象)
  
  <br>
  
# window 对象
　　BOM 的核心对象是 window，它表示浏览器的一个实例。它同时扮演着 ECMAScript 中 Global 对象的角色，所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。
  
　　注意一点，使用`var`定义变量与在 window 对象上直接定义属性有一点差别：
  
```javascript
var age = 29;
window.color = "red";

delete window.age;   //返回 false

delete window.color; //返回 true

console.log(window.age);    //29
console.log(window.color);  //undefined
```
　　实质上是使用`var`语句添加的属性的 [[Configurable]] 的特性值被设置为 false。
  
  <br>
  
# location 对象
　　location 对象即是 window 对象的属性，也是 document 对象的属性；window.location 和 document.location 引用的是同一个对象。下表为 location 对象的所有属性。
  
| 属性名 | 例子 | 说明 | 
|:------:|:------:|:------:|
|hash|"#contents"|返回 URL 中的 hash（#号后跟 0 或多个字符）|
|host|"www.wrox.com:8080"|返回服务器名称和端口号|
|hostname|"www.wrox.com"|返回服务器名称|
|hostname|"http://www.wrox.com"|返回完整 URL，和 toString（）方法返回值相同|
|port|"8080"|返回端口号|
|protocal|"https:"|返回协议|
|search|"?q=javascript"|返回 URL 的查询字符串|

<br>

　　以下方法可以改变浏览器位置：
```javascript
location.assign("http://www.wrox.com");
window.location = "http://www.wrox.com";   //本质上也会调用 assign()
location.href = "http://www.wrox.com";     //本质上也会调用 assign()
location.replace("http://www.wrox.com");   //若如此做，用户不能回到之前一个页面
```

　　使用 `reload()` 可以重新加载当前显示页面，如果不传递任何参数，页面会以**最有效的方式**重新加载，也就是说可能使用浏览器缓存。如果要强制从服务器加载，需要传递参数 true。
　　
  
  <br>
  
# navigator 对象
　　navigator 对象现在成为 **识别客户端浏览器** 的实施标准，另外常用的还包括 **检测插件**。
  
#### 识别浏览器
　　调用`navigator.userAgent`来识别浏览器，下表是一些返回值。
  
| 浏览器 | navigator.userAgent 返回值 |
|:------:|:------:|
|safari|//Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1|
|chrome|//Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.220 Safari/535.1|
|opera|//Opera/9.80 (Windows NT 5.1; U; Edition Next; zh-cn) Presto/2.8.158 Version/11.50|
|firefox|//Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.24) Gecko/20111103 Firefox/3.6.24|

#### 检测插件
　　使用 `navigator.plugins` 获取插件的数组，数组的每一项包含以下属性：
  * `name`：插件名
  * `description`：插件描述
  * `filename`：插件文件名
  * `length`：插件所处理的 MIME 类型数量
    
  <br>
  
# screen 对象
# history 对象
　　history 对象保存着**用户上网的历史记录**，出于安全考虑，开发人员无法得知用户浏览过的 URL，history 对象有 `go()`、`back()`、`forward()`方法模拟浏览器的 "后退" 和 "前进"。

* `history.back()`：与在浏览器点击后退按钮相同
* `history.forward()`：与在浏览器中点击按钮向前相同
* `history.go(n)`：参数为整数或字符串，移动到整数或字符串指定的页面
* 如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是静默失败

　　在 HTML5，history 对象提出了 `pushState()` 方法和 `replaceState()` 方法，这两个方法可以用来向历史栈中添加数据，就好像 url 变化了一样，这样就可以很好的模拟浏览历史和前进后退了，现在的前端路由也是基于这个原理实现的。

### history.pushState()
`pushState(stateObj, title, url)` 方法向历史栈中写入数据，其第一个参数是要写入的数据对象（不大于 640KB)，第二个参数是页面的 title, 第三个参数是 url。`pushState()`方法不会触发页面刷新，只是导致地址栏和 history 对象发生变化

* `stateObj` ：一个与指定网址相关的状态对象，popstate 事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填 null。
* `title`：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填 null。
* `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

### history.replaceState()
`replaceState(stateObj, title, url)` 和 `pushState()` 的区别就在于它不是写入而是替换修改浏览历史中当前纪录，其余和 `pushState()` 一模一样。

### popstate 事件
　　每当同一个文档的浏览历史（即 history 对象）出现变化时，就会触发 popstate 事件。

* 需要注意的是调用 `pushState()` 或 `replaceState()` 不会触发 popstate 事件。只有在做出浏览器动作时，或者在 Javascript 代码中调用 `go()`、`back()`、`forward()`，才会触发该事件。

* 使用的时候，可以为 popstate 事件指定回调函数。这个回调函数的参数是一个 event 事件对象，它的 state 属性指向 `pushState()` 和 `replaceState()` 方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。

