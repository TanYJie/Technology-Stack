var mySingleton = (function(){
	var instance;

	function init(){
		var privateVariable = "This is a privateVariable";
		function privateMethod(){
			console.log("This is a privateMethod");
		}
		return {
			getPrivateVariable:function(){
				return privateVariable;
			},
			setPrivateVariable:function(value){
				privateVariable = value;
			},
			getPrivateMethod:function(){
				privateMethod();
			}
		}
	};
	return function(){
		if(!instance){
			instance = init();
		}
		return instance;
	};
}());

console.log(mySingleton()==mySingleton());        //检查是否单例
console.log(mySingleton().getPrivateVariable());  //通过公开函数输出私有变量
mySingleton().setPrivateVariable("new privateVariable");  //通过公开函数设置新的私有变量
console.log(mySingleton().getPrivateVariable());  //通过公开函数输出私有变量
mySingleton().getPrivateMethod();                 //通过公开函数调用私有方法
