
var str = '{"name":"huangxiaojian","age":"23"}'

let jon = JSON.parse(str);

console.log(typeof jon);

console.log(jon.name);

console.log(typeof JSON.stringify(jon));