
//类型判断=====================================================================
function typeJudge(value){
	var basicType = {
		"undefined" : "基本类型：Undefined",
		"number"    : "基本类型：Number",
		"boolean"   : "基本类型：Boolean",
		"string"    : "基本类型：String",
		"symbol"    : "基本类型：Symbol",
	}
	var typeOfValue = typeof value;
	if(typeOfValue != "object" && typeOfValue != "function"){
		//若是基本类型,要注意有些浏览器对正则表达式使用typeof操作符会返回"function"
		return basicType[typeOfValue];
	}
	if(value == null){
		//若是null
		return "空对象或NULL类型";
	}
	var referenceType = {
		"[object String]"  : "基本包装类型：String",
		"[object Number]"  : "基本包装类型：Number",
		"[object Boolean]" : "基本包装类型：Boolean",
		"[object Date]"    : "引用类型：Date",
		"[object RegExp]"  : "引用类型：RegExp",
		"[object Array]"   : "引用类型：Array",
		"[object Function]": "引用类型：Function",
		"[object Window]"  : "内置对象：Global对象",
		"[object Math]"    : "内置对象：Math对象",
	}
	var protoClass = Object.prototype.toString.call(value);
	if(referenceType[protoClass]!=undefined){
		//引用类型中的一种（除自定义类型）
		return referenceType[protoClass];
	}
	//自定义类型
	return "自定义类："+value.__proto__.constructor.name;
}

//测试代码
//基本类型值检测
console.log(typeJudge(1));
console.log(typeJudge("a"));
console.log(typeJudge(true));
console.log(typeJudge(undefined));
var id = Symbol("id"); 
console.log(typeJudge(id));

//null检测
console.log(typeJudge(null));

//基本包装类型检测
var str = new String();
console.log(typeJudge(str));
var myBool = new Boolean();
console.log(typeJudge(myBool));
var myNumber = new Number();
console.log(typeJudge(myNumber));

//Date,RegExp,Function类型检测
var date = new Date();
console.log(typeJudge(date));
var reg = /at/g;
console.log(typeJudge(reg));
console.log(typeJudge(typeJudge));

//window,Math内置对象检测
console.log(typeJudge(window));
console.log(typeJudge(Math));

//自定义类型检测
function Person(name,age){
    this.name = name;
    this.age = age;
}
var person1 = new Person("Nicholas",29);
console.log(typeJudge(person1));

