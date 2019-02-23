# BFC

　　BFC（Blocking Formatting Context），块级格式上下文，创建了 BFC 的元素就是一个独立的盒子，**里面的子元素不会在布局上影响外面的元素**，反之亦然，同时 BFC 仍然属于文档中的普通流。
  <br>
　　
### BFC 形成条件
　　BFC 的形成条件主要有（满足以下一条即可）：  
1. 浮动元素（ float 不为 none ）
2. overflow 不为 visible（ hidden，auto，scroll ）
3. position 是 absolute 或 fixed
4. 非块级盒子的块级元素（ display 值为 inline-block、table-cell、table-caption、flex、inline-flex ）
5. fieldset 元素（可将表单内的相关元素分组）

<br>

### BFC 特性及其可解决问题
#### 1. 阻止外边距合并
* 计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算
