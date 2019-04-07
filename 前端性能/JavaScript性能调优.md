# 1.函数防抖与节流
　　函数防抖（debounce）是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。多用 `clearTimeout()` 进行重新计算。
```javascript
/**
 * @desc 函数防抖
 * @param method 函数
 * @param time 延迟执行毫秒数
 * @param context 执行上下文
 */
// 防抖函数
debounce: function(method,context,time){
    let id;
    return function(...args){
        clearTimeout(id);
        method.tId = setTimeout(() => {
            method.apply(context,args);
        },time);
    };
},
```

<br>

　　函数节流（throttle）是指连续触发事件但是在 n 秒中只执行一次函数。对于节流，一般有两种方式可以实现，分别是时间戳版和定时器版。
 
### 时间戳版
```javascript
function throttle(method, time) {
    let previous = 0;
    return function(...args) {
        let now = Date.now();
        let context = this;
        if (now - previous > time) {
            method.apply(context, args);
            previous = now;
        }
    }
}
```

### 定时器版
```javascript
function throttle(method, time) {
    let id;
    return function(...args) {
        let context = this;
        if (!id) {
            id = setTimeout(() => {
                id = null;
                method.apply(context, args);
            }, time)
        }
    }
}
```
　　函数防抖的关键是 **打断之前的操作**，函数节流的关键是 **等待之前的操作**。
