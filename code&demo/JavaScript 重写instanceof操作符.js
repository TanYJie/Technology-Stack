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
console.log(myInstanceof(1,Number)); //true
console.log(myInstanceof("a",String)); //true
console.log(myInstanceof(true,Boolean)); //true
var id = Symbol("id"); 
console.log(myInstanceof(id,Symbol)); //true

//Date,RegExp,Function类型检测
var date = new Date();
console.log(myInstanceof(date,Date)); //true
var reg = /at/g;
console.log(myInstanceof(reg,RegExp)); //true
console.log(myInstanceof(myInstanceof,Function)); //true

//Math,window内置对象检测
console.log(myInstanceof(window,Window)); //true
console.log(myInstanceof(Math,Math.__proto__.constructor)); //true

//自定义类型检测
function Person(name,age){
    this.name = name;
    this.age = age;
}
var person1 = new Person("Nicholas",29);
console.log(myInstanceof(person1,Person)); //true
console.log(myInstanceof(person1,Object)); //true

//数组类型检测
var arr=[];
console.log(myInstanceof(arr,Array));      //true
console.log(myInstanceof(arr,Object));     //true
