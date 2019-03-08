# W3C 上的 get 和 post 区别

<div align="center">
  <img src="https://github.com/TanYJie/Technology-Stack-Interview-Experience/blob/master/服务端与网络/image/get和post.png" />
</div>

### POST 方法比 GET 方法安全？
　　按照网上大部分文章的解释，POST 比 GET 安全，因为数据在地址栏上不可见。
  
　　然而，从传输的角度来说，他们都是不安全的，因为 HTTP 在网络上是明文传输的，只要在网络节点上捉包，就能完整地获取数据报文。要想安全传输，就只有加密，也就是 HTTPS。

<br>

### GET 方法的长度限制是怎么回事？
　　在网上看到很多关于两者区别的文章都有这一条，提到浏览器地址栏输入的参数是有限的。
  
　　首先说明一点，HTTP 协议没有 Body 和 URL 的长度限制，对 URL 限制的大多是浏览器和服务器的原因。浏览器原因就不说了，服务器是因为处理长 URL 要消耗比较多的资源，为了性能和安全（防止恶意构造长 URL 来攻击）考虑，会给 URL 长度加限制。

<br>

### POST 方法会产生两个TCP数据包？
　　有些文章中提到，post 会将 header 和 body 分开发送，先发送 header，服务端返回 100 状态码再发送 body。
  
　　HTTP 协议中没有明确说明 post 会产生两个 TCP 数据包，而且实际测试发现，header 和 body 不一定会分开发送。**所以，header 和 body 分开发送是部分浏览器或框架的请求方法，不属于 post 必然行为**。

<br>

# 如何取消 get 请求的缓存
**1.URL 随机后缀**

　　在要传的数据中加上新的随机参数，如`www.baidu.com?data=1&&stamp=Math.random()`，由于每次请求数据不一样，故请求后返回的数据不会缓存。

**2.JQuery 简便设置 cache: false**

　　用 JQuery 封装好的 ajax 中设置 `cache: false` 可以取消缓存。
  
**3.服务器端设置不缓存**
