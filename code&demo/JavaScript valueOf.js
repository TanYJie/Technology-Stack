console.log(Object.prototype.valueOf.call(1));             // Number {1}
console.log(typeof Object.prototype.valueOf.call(1));      // object
console.log(Object.prototype.valueOf.call(true));          // Boolean {true}
console.log(typeof Object.prototype.valueOf.call(true));   // object
console.log(Object.prototype.valueOf.call("2333"));        // String {"2333"}
console.log(typeof Object.prototype.valueOf.call("2333")); // object
console.log(Object.prototype.valueOf.call(undefined));     // Uncaught TypeError: Cannot convert undefined or null to object
console.log(Object.prototype.valueOf.call(null));          // Uncaught TypeError: Cannot convert undefined or null to object
