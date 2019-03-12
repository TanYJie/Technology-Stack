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
