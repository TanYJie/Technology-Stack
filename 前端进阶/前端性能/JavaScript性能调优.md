# JavaScript 性能调优

2019 年 JavaScript 性能优化解析 https://mp.weixin.qq.com/s/IbjY4HLDiUZGz5tAhqeaIw

本章内容：
* JavaScipt 脚本篇
  * [减少作用域链查找](#1减少作用域链查找)
  * [函数防抖与节流](#2函数防抖与节流)
  * [Web Workers](#3web-workers)
* DOM 操作优化篇
  * [事件委托](#1事件委托)
  * [最小化现场更新](#2最小化现场更新)
  * [注意 HTMLCollection](#3注意-htmlcollection)


<br>

# JavaScript 脚本篇

<br>

## 1.减少作用域链查找
　　随着作用域中的作用域数量的增加，访问当前作用域以外的变量的时间也在增加。所以，访问全局变量总是比访问局部变量要慢，因为需要遍历作用域链。只要能减少花费在作用域链上的时间，就能增加脚本的整体性能。
  
<br>

## 2.函数防抖与节流
　　函数防抖（debounce）是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。多用 `clearTimeout()` 进行重新计算。
```javascript
/**
 * @desc 函数防抖
 * @param method 函数
 * @param time 延迟执行毫秒数
 * @param context 执行上下文
 */
// 防抖函数
debounce: function(method,context,time){
    let id;
    return function(...args){
        clearTimeout(id);
        id = setTimeout(() => {
            method.apply(context,args);
        },time);
    };
},
```

<br>

　　函数节流（throttle）是指连续触发事件但是在 n 秒中只执行一次函数。对于节流，一般有两种方式可以实现，分别是时间戳版和定时器版。
 
### 时间戳版
```javascript
function throttle(method, time) {
    let previous = 0;
    return function(...args) {
        let now = Date.now();
        let context = this;
        if (now - previous > time) {
            method.apply(context, args);
            previous = now;
        }
    }
}
```

### 定时器版
* 当定时器不存在，说明可以执行函数，于是定义一个定时器来向任务队列注册目标函数 
  * 目标函数执行后设置保存定时器 ID 变量为空
* 当定时器已经被定义，说明已经在等待过程中。则等待下次触发事件时再进行查看。 
```javascript
function throttle(method, time) {
    let id;
    return function(...args) {
        let context = this;
        if (!id) {
            id = setTimeout(() => {
                method.apply(context, args);
                id = null;
            }, time)
        }
    }
}
```
　　函数防抖的关键是 **打断之前的操作**，函数节流的关键是 **等待之前的操作**。

<br>

## 3.Web Workers
　　JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

　　Web Worker 的作用，就是 **为 JavaScript 创造多线程环境**，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。

　　Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

Web Worker 有以下几个使用注意点:

（1）同源限制

　　分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

（2）DOM 限制

　　Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法操作 DOM，也无法使用 document、window、parent 这些对象。但是，Worker 线程可以访问 navigator 对象和 location 对象。
  
（3）通信联系

　　Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。


<br>

# DOM 操作优化篇
## 1.事件委托
　　在 JavaScript 中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。首先，每个函数都是对象，都会占用内存；其次，必须事先指定所有事件处理程序，造成 DOM 访问次数过多。事实上，利用好事件处理程序还是可以提升性能的。

　　"事件处理程序过多" 问题的解决方案就是 **事件委托**。事件委托利用了事件冒泡，比如一个列表：
```html
<ul id="mylink">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>
```
　　我们只需要在`<ul>`元素上加一个事件处理程序，即可处理多个`<li>`元素的事件。

<br>

## 2.最小化现场更新
　　如果你要访问的 DOM 是已经显示的页面的一部分，那么你就是在进行一个 **现场更新**。对现场的每一个更改，都会使得浏览器重新计算尺寸进行更新。
  
　　为解决这个问题 Javascript 提供了一个文档片段 DocumentFragment 的机制。如果将文档中的节点添加到文档片段中，就会从文档树中移除该节点。把所有要构造的节点都放在文档片段中，这样可以不影响文档树，也就不会造成页面渲染。当节点都构造完成后，再将文档片段对象添加到页面中，这时所有的节点都会一次性渲染出来，这样就能减少浏览器负担，提高页面渲染速度。
```javascript
var fragment = document.createDocumentFragment(); // 创建DocumentFragment
for(var i=0; i<10; i++){
    fragment.appendChild(item);  // 向DocumentFragment中加入元素
}
father.appendChild(fragment);    // 此时DocumentFragment中子节点被添加到目标，片段本身不被添加
```

　　或者还有以下方式优化多次重排（reflow）造成的性能问题：
* 不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 CSS 的 class，然后修改 DOM 的 className。
* 不要把 DOM 节点的属性值放在一个循环里当成循环里的变量。不然这会导致大量地读写这个结点的属性。
* 把 DOM 离线后修改。如：
  - 使用 documentFragment 对象在内存里操作 DOM。
  - 先把 DOM 给 `display:none`，然后再修改，然后再把它显示出来。
  - clone 一个 DOM 节点到内存里，然后再修改，改完后，和在线的那个的交换一下。
* 为动画的 HTML 元件设置 `position: fixed` 或 `position: absolute` ，让其脱离文档流，不影响父级；

<br>

## 3.注意 HTMLCollection
以下情况会返回 HTMLCollection 对象：
  * 调用 `getElementByTagName()`
  * 获取了元素的`childNodes`属性
  * 获取了元素的`attributes`属性
  * 访问了特殊的集合，如 document.forms、document.images 等
　　任何访问 HTMLCollection，都是在文档上进行查询，这个开销很昂贵。所以要最小化访问 HTMLCollection。最重要的地方是循环。
```javascript
var images = document.getElementByTagName("img");
var len;
for(var i=0, len=images.length; i<len; i++){   // 注意这里要把元素个数的初始化放在for循环中，不能每次访问 images.length
    var image = images[i];                     // 注意这里把每个img元素保存下来，不能每次访问images[i]
    // 处理
}
```
