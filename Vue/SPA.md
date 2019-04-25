# SPA 及其实现原理
　　单页 Web 应用（single page web application，SPA），就是只有一张 Web 页面的应用，是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web应用程序。

　　通常 SPA 中前端路由有 2 种实现方式：
* [`window.history`](#window.history)
* [`location.hash`]

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
