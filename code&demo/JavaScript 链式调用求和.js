var sum = function(...arg){
	var value = 0;
	for(val of arg){
		value += val;
	}
  
	var result = function(...args){
		for(val of args){
			value += val;
		}
		return result;
	}
  
	result.value = function(){
		console.log(value);
	}
	return result;
}

sum(2,3,4,5,6)(1)(10,20)(7).value();  //58
