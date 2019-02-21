# script 引入方式

### 2.1 <script>元素
　　向 HTML 页面中插入 JavaScript 的主要方法，就是使用<script>元素，<script>元素由下列6个属性。
  * `src`：可选。表示包含要执行代码的外部文件  
  * `charset`：可选。表示通过 src 属性指定的代码的字符集。
  * `language`：已废弃。原来用于表示编写代码使用的脚本语言（ JavaScript 、 VBScript 等）。
  * `type`：可选。可以看成 language 的替代属性。表示编写代码使用的脚本语言的内容类型（也称MIME类型）。默认值为`text/javascript`。考虑约定俗成和最大限度的兼容性，目前 type 属性的值依旧还是`text/javascript`。  
  * `async`：可选。表示应该立即下载该脚本，只对外部脚本文件有效。  
  * `defer`：可选。表示脚本可以延迟到文档被完全解析和显示之后再执行，只对外部脚本文件有效。  
 
### 2.2 标签的位置  
　　传统的做法中，所有<script>元素都放在页面的<head>元素中，例如：
```html
 <!DOCTYPE html>
 <html>
   <head>
     <title>This is title</title>
     <script type="text/javascript" src="example1.js"></script>
     <script type="text/javascript" src="example2.js"></script>
   </head> 
   <body>
     <!--这里放内容-->
   </body>
 </html>
```
　　这种做法意味着必须等到全部 JavaScript 代码都被下载、解析和执行完成后，才能开始呈现页面的内容。如果某些页面 JavaScript 代码很多，那么就会出现界面显示的延迟。为了避免这个问题，现在 Web 应用程序一般**把 JavaScript 引用放在<body>元素中页面内容的后面**。如下：
```html
 <!DOCTYPE html>
 <html>
   <head>
     <title>This is title</title>
   </head> 
   <body>
     <!--这里放内容-->
     <script type="text/javascript" src="example1.js"></script>
     <script type="text/javascript" src="example2.js"></script>
   </body>
 </html>
```
  
### 2.3 延迟脚本  
　　这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。
```html
 <!DOCTYPE html>
 <html>
   <head>
     <title>This is title</title>
     <script type="text/javascript" defer="defer" src="example1.js"></script>
     <script type="text/javascript" defer="defer" src="example2.js"></script>
   </head> 
   <body>
     <!--这里放内容-->
   </body>
 </html>
```
　　这个例子中，虽然把<script>元素放在<head>元素中，但这两个脚本会延迟到浏览器遇到</html>标签后才执行。HTML5规范要求脚本按照它们出现的先后顺序执行。但在现实中，延迟脚本不一定按照顺序执行(?)。**因此最好只包含一个延迟脚本。**
   <br>
　　IE4 、FireFox 3.5 、Safari 5 、Chrome 是最早支持 defer 属性的浏览器。其他浏览器会忽略这个属性，向平常一样处理脚本。为此，**把延迟脚本放在页面底部仍然是最佳选择。** 
  
### 2.4 异步脚本  
　　制定async属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。为此，**建议异步脚本不要在加载期间修改DOM。**
```html
 <!DOCTYPE html>
 <html>
   <head>
     <title>This is title</title>
     <script type="text/javascript" async="async" src="example1.js"></script>
     <script type="text/javascript" async="async" src="example2.js"></script>
   </head> 
   <body>
     <!--这里放内容-->
   </body>
 </html>
```
　　以上代码中，两个脚本文件的执行顺序是不确定的，因此要确保两者不相互依赖。这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。异步脚本一定会在页面的 load 事件前执行。
  
### 2.5 \<noscript\>元素  
　　使用<noscript>元素对付不支持 JavaScript 的浏览器，例如：
```html
 <!DOCTYPE html>
 <html>
   <head>
     <title>This is title</title>
     <script type="text/javascript" defer="defer" src="example1.js"></script>
     <script type="text/javascript" defer="defer" src="example2.js"></script>
   </head> 
   <body>
     <noscript>
       <p>本页面需要浏览器支持JavaScript</p>
     </noscript>
   </body>
 </html>
```

