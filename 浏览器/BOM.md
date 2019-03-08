# BOM 
　　BOM （浏览器对象模型）提供了很多对象，用于访问浏览器的功能。多年来，缺少事实上的规范导致 BOM 既有意思又有问题。
  
  <br>
  
# window 对象
　　BOM 的核心对象是 window，它表示浏览器的一个实例。它同时扮演着 ECMAScript 中 Global 对象的角色，所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。
　　注意一点，使用`var`定义变量与在 window 对象上直接定义属性有一点差别：
  
```
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
  
###### 识别浏览器
　　调用`navigator.userAgent`来识别浏览器，下表是一些返回值。
  
| 浏览器 | navigator.userAgent 返回值 |
|:------:|:------:|:------:|
|safari|//Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1|
|chrome|//Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.220 Safari/535.1|
|opera|//Opera/9.80 (Windows NT 5.1; U; Edition Next; zh-cn) Presto/2.8.158 Version/11.50|
|firefox|//Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.2.24) Gecko/20111103 Firefox/3.6.24|
|ie|//Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.1; .NET4.0C; .NET4.0E; InfoPath.2)|
