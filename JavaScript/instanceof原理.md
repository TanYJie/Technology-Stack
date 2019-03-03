```javascript
//这个函数可以起到和 instanceof 相同的效果
function myInstanceof(obj,category){
    //console.log(typeof category);
    while(obj != null){
        if(obj == category.prototype){
	    return true;
        }
        obj = obj.__proto__;
    }
    return false;
}


//以下皆为测试代码
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
      alert(this.name);
    }
}
var person1 = new Person("Nicholas",29);

var arr=[];
console.log(myInstanceof(arr,Array));      //true
console.log(myInstanceof(arr,Object));     //true

console.log(myInstanceof(person1,Array));  //false
console.log(myInstanceof(person1,Person)); //true
console.log(myInstanceof(person1,Object)); //true

```
　　要注意的是，像 myInstanceof(arr,Array) 中的 Array，myInstanceof(arr,Object) 中的 Object 代表的都是 **构造函数**，可以去掉代码中的注释发现 typeof Object 为 function，因此判断时是用 category.prototype 而不是 category
