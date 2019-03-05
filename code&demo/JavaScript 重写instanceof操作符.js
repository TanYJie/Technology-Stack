//重写instanceof操作符========================================================
function myInstanceof(obj,category){
	obj = obj.__proto__;
	while(obj != null){
		if(obj == category.prototype){
			return true;
		}
		obj = obj.__proto__;
	}
	return false;
}

//测试代码
//基本类型值检测
console.log(myInstanceof(1,Number));
console.log(myInstanceof("a",String));
console.log(myInstanceof(true,Boolean));
var id = Symbol("id"); 
console.log(myInstanceof(id,Symbol));

//Date,RegExp,Function类型检测
var date = new Date();
console.log(myInstanceof(date,Date));
var reg = /at/g;
console.log(myInstanceof(reg,RegExp));
console.log(myInstanceof(myInstanceof,Function));

//Math,window内置对象检测
console.log(myInstanceof(window,Window));
console.log(myInstanceof(Math,Math.__proto__.constructor));

//自定义类型检测
function Person(name,age){
    this.name = name;
    this.age = age;
}
var person1 = new Person("Nicholas",29);
console.log(myInstanceof(person1,Person));
