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
#### 1. BFC 可以防止外边距合并
　　[外边距合并](https://github.com/TanYJie/Technology-Stack/blob/master/CSS/外边距合并.md)的一种常见状况为：块级标签之间竖直方向的 margin 会以大的为准，这就是 margin 的塌陷现象。此时，将产生合并的两个元素置于不同的 BFC 中，就可以避免外边距合并的现象。 注意，同一个 BFC 中的元素之间仍会发生外边距合并的现象。

#### 2. BFC 可以防止浮动元素造成的 "父元素高度塌陷" 问题
　　在计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算。所以就不会产生 **高度塌陷** 的问题。

#### 3. BFC 可以消除浮动元素造成的 "文字环绕" 现象
　　浮动元素脱离了文档流，但没有脱离文本流，这就导致文字环绕浮动元素，造成了 **文字环绕** 。这是没有创建 BFC 之前的代码。
```html
<div style="height: 100px;
            width: 100px;
            float: left;
            background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; 
            height: 200px;
            background: grey">我是一个没有设置浮动, 也没有触发 BFC 的元素</div>
```
![文字环绕1](https://github.com/TanYJie/Technology-Stack/blob/master/CSS/images/文字环绕-1.png)

　　将灰色元素创建 BFC 后：
```html
<div style="height: 100px;
            width: 100px;
            float: left;
            background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; 
            height: 200px;
            background: grey;
            overflow:hidden">我是一个没有设置浮动, 触发了 BFC 的元素</div>

```
![文字环绕2](https://github.com/TanYJie/Technology-Stack/blob/master/CSS/images/文字环绕-2.png)
