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
  
　　因为是异步引入模块，所以 AMD 需要在声明模块时指定所有的依赖。
  ```javascript
  define(['dep1','dep2'],function(dep1,dep2){
      return function(){};
  });
  ```
  
### CMD
　　CMD 规范由国内的玉波提出，和 AMD 规范相比，CMD 模块规范更接近 Node 对 CommonJS 规范的定义。CMD 支持动态引入，依赖即插即用，符合同步的思想。
  ```javascript
  define(function(require, exports, module){
      //引入
      var $ = require('jquery');
      //可以使用
      //...
      //继续引入
  });
  ```
