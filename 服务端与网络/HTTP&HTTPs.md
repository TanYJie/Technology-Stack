## HTTP 请求报文
<div align="center">
<img src="https://github.com/TanYJie/Technology-Stack-Interview-Experience/blob/master/服务端与网络/image/HTTP请求.png"/>
</div>

<br>

## HTTP 响应报文
<div align="center">
<img src="https://github.com/TanYJie/Technology-Stack-Interview-Experience/blob/master/服务端与网络/image/HTTP响应.png"/>
</div>

<br>

## HTTPs
HTTP 有以下安全性问题：
1. 通信使用明文，内容可能会被窃听；
2. 不验证通信方的身份，因此有可能遭遇伪装；
3. 无法证明报文的完整性，所以有可能已遭篡改。

　　HTTPs 并不是新协议，而是 HTTP 先和 SSL（Secure Socket Layer）通信，再由 SSL 和 TCP 通信。通过使用 SSL，HTTPs 提供了加密、认证和完整性保护。通过使用 **证书** 来对通信方进行认证。证书中有公开密钥数据，如果可以验证公开密钥的确属于通信方的，那么就可以确定通信方是可靠的。
  
　　数字证书认证机构（CA，Certificate Authority）颁发的公开密钥证书，可以通过 CA 对其进行验证。进行 HTTPs 通信时，服务器会把证书发送给客户端，客户端取得其中的公开密钥之后，就可以开始加密过程。
  
　　使用 OpenSSL 这套开源程序，每个人都可以构建一套属于自己的认证机构，从而自己给自己颁发服务器证书。浏览器在访问该服务器时，会显示“无法确认连接安全性”或“该网站的安全证书存在问题”等警告消息。

<div align="center">
<img src="https://github.com/TanYJie/Technology-Stack-Interview-Experience/blob/master/服务端与网络/image/HTTPs.png"/>
</div>


## HTTP1.1 和 1.0 的区别
* 缓存处理：在 HTTP1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，HTTP1.1 则引入了更多的缓存控制策略例如 Entity tag，If-Unmodified-Since, If-Match, If-None-Match 等更多可供选择的缓存头来控制缓存策略。

* 长连接：HTTP 1.1 支持长连接和请求的流水线处理，在一个 TCP 连接上可以传送多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1 中默认开启 Connection： keep-alive，一定程度上弥补了 HTTP1.0 每次请求都要创建连接的缺点。

## HTTP2.0 的特点
* 新的二进制格式：HTTP/2 采用二进制格式而非文本格式 
* 多路复用：HTTP/2 是完全多路复用的，而非有序并阻塞的——只需一个 HTTP 连接就可以实现多个请求响应 ： 
* header 压缩：使用报头压缩，HTTP/2 降低了开销 
* 服务器推送：HTTP/2 让服务器可以将响应主动"推送"到客户端缓存中
