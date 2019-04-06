# 关于 computed 和 watch 的差异

* computed 是计算值；而 watch 是观察的动作
* 从使用场景上说，computed 适用一个数据被多个数据影响；而 watch 适用一个数据影响多个数据
* computed 具有缓存性，页面重新渲染值不变化,计算属性会立即返回之前的计算结果；watch 无缓存性，页面重新渲染时值不变化也会执行

对于以下这个例子来说:
```html
<div id="demo">{{ fullName }}</div>
```

#### watch 实现方式
　　对于 `fullName` 的更新，我们需要同时 watch `firstName` 和 `lastName` 。
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

#### computed 实现方式
　　只需要将 `fullName` 声明为 computed 即可。
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
