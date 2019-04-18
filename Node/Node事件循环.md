# Node 事件循环

<div align="center">
  <img src="https://github.com/TanYJie/Technology-Stack/blob/master/Node/image/Node事件循环.png"/>
</div>

* 阶段概述
  * timer：**定时器**，本阶段执行已经安排的 `setTimeout()` 和 `setInterval()` 的回调函数。
  * pending callbacks：**待定回调**，执行延迟到下一个循环迭代的 I/O 回调。
  * idle, prepare：仅系统内部使用。`process.nextTick()`属于 idle 观察者
  * poll：**轮询**，检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 `setImmediate()` 排定的之外），其余情况 node 将在此处阻塞。
  * check：**检测**，`setImmediate()` 回调函数在这里执行。
  * close callbacks：**关闭的回调函数**，一些准备关闭的回调函数，如：`socket.on('close', ...)`。
