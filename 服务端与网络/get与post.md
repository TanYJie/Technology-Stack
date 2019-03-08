# get 请求特点

* get 请求可被缓存
* get 请求会保留在浏览器历史记录中
* get 请求的参数会接在 url 后，不应在处理敏感数据时使用
* get 请求 url 会有最大长度限制，不同浏览器限制长度不同


# post 请求特点

* post 请求不可会缓存
* post 请求不会保留在浏览器历史记录中
* post 请求安全性较高
* post 请求数据没有长度限制

# W3C 上的 get 和 post 区别

<div align="center">
  <img src="https://github.com/TanYJie/Technology-Stack-Interview-Experience/blob/master/服务端与网络/image/get和post.png" />
</div>

# 如何取消 get 请求的缓存
**1.URL 随机后缀**

　　在要传的数据中加上新的随机参数，如`www.baidu.com?data=1&&stamp=Math.random()`，由于每次请求数据不一样，故请求后返回的数据不会缓存。

**2.JQuery 简便设置 cache: false**

　　用 JQuery 封装好的 ajax 中设置 `cache: false` 可以取消缓存。
  
**3.服务器端设置不缓存**
