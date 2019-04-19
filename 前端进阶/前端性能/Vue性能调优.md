# Vue 性能调优

　　Vue 性能调优有以下几种方法：
  * [异步组件](#异步组件)
  * [利用`Object.freeze()`提升性能](#利用objectfreeze提升性能)
  * 计算属性缓存机制
  * 路由懒加载
  
  
<br>
 
## 异步组件
　　在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。一个推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：
```javascript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```
  
　　你也可以在工厂函数中返回一个 Promise，所以把 webpack 2 和 ES2015 语法加在一起，我们可以写成这样：
```javascript
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

```
　　当使用局部注册的时候，你也可以直接提供一个返回 Promise 的函数：
```javascript
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

<br>

## 利用`Object.freeze()`提升性能
　　`Object.freeze()`可以冻结一个对象，冻结之后不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。
  
　　当你把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 `Object.defineProperty` 把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改。**但是如果某些数据只为展示，我们可以使用`Object.freeze()`跳过这个阶段。Vue 在遇到 configurable 为 false 对象属性时，不会为对象加上 getter/setter 等数据劫持的方法**。
  
```javascript
 if (property && property.configurable === false) {
    return
 }
```
