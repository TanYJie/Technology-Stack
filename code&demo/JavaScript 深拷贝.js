function deepCopy(obj){
	var result = (obj instanceof Array) ? [] : {};
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]);   //递归复制
            } 
            else {
                result[key] = obj[key];
            }
        }
     }
     return result;
}
