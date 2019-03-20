在 HTML 中定义样式的方式有 3 种：
  1. 通过`<link/>`元素引入外部样式表文件
  2. 使用`<style/>`元素定义嵌入式样式
  3. 元素内联样式

# link 和 @import 区别

1. 从属关系区别  
　　@import 是 CSS 提供的语法规则，只有导入样式表的作用；`<link>`是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。

2. 加载顺序区别  
　　加载页面时，`<link>`标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。（link 异步加载，@import 同步加载）

3. 兼容性区别  
　　@import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link标签作为 HTML 元素，不存在兼容性问题。

4. DOM可控性区别  
　　可以通过 JavaScript 操作 DOM ，插入`<link>`标签来改变样式；无法使用 @import 的方式动态插入样式。
