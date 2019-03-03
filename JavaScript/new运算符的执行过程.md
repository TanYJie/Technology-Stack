# new 运算符的执行过程

　　借助 **使用构造函数模式** 创建对象的代码来理解：
  ```javascript
  function Person(name,age){
      this.name = name;
      this.age = age;
      this.sayName = function(){
        alert(this.name);
      }
  }
  
  var person1 = new Person("Nicholas",29);
  ```
　　用 new 方式调用构造函数会经历以下步骤：

   1. 创建一个新对象（暂时命名为 obj）
   2. 把 obj 的 \_\_proto\_\_ 指向构造函数 Person 的原型对象 Person.prototype，此时便建立了 obj 对象的原型链：obj -> Person.prototype-> Object.prototype -> null
   3. 将构造函数的作用域赋给新对象 obj
   4. 执行构造函数中的代码（为 obj 添加属性）
   5. 返回新对象 obj
   
   
　　完全可以用代码模拟以上过程，如下（1）（2）（3）三行代码效果等于用 new 创建对象：
```JavaScript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        alert(this.name);
    }
}

var obj = new Object();              //（1）创建一个新对象
obj.__proto__ = Person.prototype;    //（2）把 obj 的 __proto__ 指向 Person.prototype
Person.call(obj,"Nicholas",29);      //（3）将构造函数的作用域赋给新对象 obj，执行构造函数中的代码

console.log(obj instanceof Person);  //true
   ```
