# AMD 和 CMD

### CommonJS / Node 与其他概念的关系
<table align="center">
   <tr>
        <td text-align:center colspan="3">浏览器</td>
        <td colspan="5">CommonJS</td>  
   </tr>
   <tr>
   	<td>BOM</td>
	<td>DOM</td>
	<td>ECMAScript</td>
	<td>FS</td>
	<td>TCP</td>
	<td>Stream</td>
	<td>Buffer</td>
	<td>...</td>
   </tr>
   <tr>
        <td colspan="2">W3C</td>
        <td colspan="6">Node</td> 
   </tr>
</table>


### CommonJS
　　CommonJS 就是为 JavaScript 的表现来制定规范，因为 JavaScript 没有模块的功能所以 CommonJS 应运而生，它希望 JavaScript 可以在任何地方运行，不只是浏览器中。
  
  
### AMD
　　Node 的模块引入过程，几乎全都是同步的。但如果前端模块也采用同步方式引入，那将会在用户体验上造成很大问题。CommonJS 为 JavaScript 制定的围观不完全适合前端的应用场景。最终 AMD 规范在前端应用场景胜出，它的中文名称是 **异步模块定义**。
  
　　因为是异步引入模块，所以 AMD 需要在声明模块时指定所有的依赖。下面是一些例子：
#### Examples
　　设置ID为 "alpha" 的模块，使用 require，exports 和 ID 为 "beta" 的模块：
  ```javascript
   define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
       exports.verb = function() {
           return beta.verb();
           //Or:
           return require("beta").verb();
       }
   });
  ```
  
　　一个返回对象文字的匿名模块：
   ```javascript
   define(["alpha"], function (alpha) {
       return {
         verb: function(){
           return alpha.verb() + 2;
         }
       };
   });
   ```
　　使用简化的CommonJS包装定义的模块：
   ```javascript
   define(function (require, exports, module) {
       var a = require('a'),
           b = require('b');

       exports.action = function () {};
   });
   ```
### CMD
　　CMD 规范由国内的玉伯提出，和 AMD 规范相比，CMD 模块规范更接近 Node 对 CommonJS 规范的定义。CMD 支持动态引入，依赖即插即用，符合同步的思想。
  ```javascript
  define(function(require, exports, module){
      //引入
      var $ = require('jquery');
      //可以使用
      //...
      //继续引入
  });
  ```

#### ES6 模块与 CommonJS 模块的差异。

它们有两个重大差异。
* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

第二个差异是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
