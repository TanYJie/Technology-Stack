//闭包=======================================================================

function closure(){
	var result = new Array(10);
	for(var i=0; i<10; i++){
		result[i] = function(num){
			return function(){
				return num;
			}
		}(i);
	}
	return result;
}

//改进后
function closure_new(){
	var result = new Array(10);
	for(var i=0; i<10; i++){
		result[i] = function(num){
			return function(){
				return num;
			}
		}(i);
	}
	return result;
}

// 测试代码
var res = closure();
var res_new = closure_new();

for(var i=0; i<10; i++){
	console.log(res[i]());
}
for(var i=0; i<10; i++){
	console.log(res_new[i]());
}


