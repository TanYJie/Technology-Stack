# SPA 及其实现原理
　　单页 Web 应用（single page web application，SPA），就是只有一张 Web 页面的应用，是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序。

　　通常 SPA 中前端路由有 2 种实现方式：
* [`window.history`](#windowhistory)
* [`location.hash`](#locationhash)

# window.history
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

<br>

# location.hash
　　hash 实现路由背后的原理是在 window 对象监听 `onhashchange` 事件。

### 一、# 的含义
　　# 代表网页中的一个位置。如：http://localhost：8080/cbuild/index.html#one 就代表网页 index.html 的 one 位置。浏览器读取这个 URL 后，会自动将 one 位置滚动至可视区域。

　　为网页制定标识符：
 * 使用锚点，比如`<a name="print"></a>`
 * 使用 id 属性，比如`<div id="print"></div>`

### 二、HTTP 请求不包括 #
　　比如： http://localhost:8081/cbuild/index.html#first 浏览器实际发出的请求是这样的，不包含 #first
```http
GET /index.html  
```

### 三、# 后的字符
　　在第一个 # 后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。

　　比如，下面URL的原意是指定一个颜色值：http://www.example.com/?color=#fff

　　但是，浏览器实际发出的请求是：
```http
GET /?color=
Host: www.example.com
```
　　可以看到，#fff 被省略了，只有将 # 转码为 %23，浏览器才会将其作为实义字符处理。也就是说，上面的网址应该被写成：http://www.example.com/?color=%23fff

### 五、改变 # 会改变浏览器的访问历史
　　每一次改变 # 后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。


### 六、window.location.hash 读取 # 值
　　window.location.hash 这个属性可读可写。读取时，可以用来判断网页状态是否改变；写入时，则会在不重载网页的前提下，创造一条访问历史记录。

### 七、onhashchange 事件
　　这是一个 HTML5 新增的事件，当 # 值发生变化时，就会触发这个事件。

<br>

# 两种模式的对比
* 最大的区别：
  * hash 内容不会放到 http 请求中，仅 # 之前的内容包含在 http 请求中
  
* history 模式的优点：
  * pushState 设置的 url 可以是同源下的任意 url ；而 hash 只能修改 # 后面的部分，因此只能设置当前 url 同文档的 url。
  * pushState 通过 stateObject 参数可以将任何数据类型添加到记录中；hash 只能添加短字符串。
  * pushState 可以设置额外的 title 属性供后续使用。
  
* history 模式的缺点：
  * history 在刷新页面时，如果 URL 匹配不到服务器的任何静态资源，就会出现 404。hash 模式下，仅 # 之前的内容包含在 http 请求中，对后端来说，即使没有对路由做到全面覆盖，也不会报 404。
  
