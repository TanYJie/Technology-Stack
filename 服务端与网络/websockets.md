# Web Sockets

　　Web Socket 是一种协议，与 HTTP 协议一样位于应用层，都是 TCP/IP 协议的子集。WebSocket 协议的目标是**在一个独立的持久连接上提供全双工双向通信**。客户端和服务器可以向对方主动发送和接受数据。

## Web Socket 建立过程
　　WebSocket 协议的建立需要先借助 HTTP 协议。在 JavaScript 中创建 WebSocket 后，客户端发起一个请求。
```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade 
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

* `Connection`：Connection 必须设置为 Upgrade，表示客户端希望连接升级

* `Upgrade`：Upgrade 必须设置为 WebSocket，表示在取得服务器响应之后，将 HTTP 协议转换（升级）为 WebSocket 协议。

* `Sec-WebSocket-key`：随机字符串，用于验证协议是否为 WebSocket 协议而非 HTTP 协议

* `Sec-WebSocket-Version`：表示使用 WebSocket 的哪一个版本。


　　**服务器回应**：
```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```
　　101 状态码表示升级协议，在返回 101 状态码后，HTTP 协议完成工作，转换为 WebSocket 协议。此时就可以进行全双工双向通信了。

* `Sec-WebSocket-Accept`：key 和 固定字符串 串接之后经过 SHA-1 处理，处理后的数据再经过一次 Base64 加密。

* `Sec-WebSocket-Location`：与 Host 字段对应，表示请求 WebSocket 协议的地址。


