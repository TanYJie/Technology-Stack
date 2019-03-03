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
