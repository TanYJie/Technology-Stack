function Car(options){
	this.height = options.height || 0;
	this.weight = options.weight || 0;
	this.price = options.price || 0;
}

function Trunk(options){
	this.height = options.height || 0;
	this.weight = options.weight || 0;
	this.price = options.price || 0;
}

var Factory = (function(){
	var type = Car;
	return {
		getInstance: function(instanceType,options){
			if(instanceType=="Car")
				type = Car;
			else if(instanceType=="Trunk")
				type = Trunk;
			else
				return null;
			return new type(options);
		}
	}
})();

console.log("工厂模式:");
console.log(Factory.getInstance("Car",{
	height: 100,
	weight: 200,
	price: 300
}));
console.log(Factory.getInstance("Trunk",{
	height: 100,
	weight: 200,
	price: 300
}));

var abstractFactory = (function(){
	var types = {};
	return {
		addType: function(typeName,constructor){
			//这里可以加关于类型的限制
			types[typeName] = constructor;
			return abstractFactory;
		},
		getInstance: function(instanceType,options){
			return new types[instanceType](options);
		}
	}
})();

console.log("抽象工厂模式:");
abstractFactory.addType("Car",Car);
abstractFactory.addType("Trunk",Trunk);
console.log(abstractFactory.getInstance("Car",{
	height: 100,
	weight: 200,
	price: 300
}));
console.log(abstractFactory.getInstance("Trunk",{
	height: 100,
	weight: 200,
	price: 300
}));
