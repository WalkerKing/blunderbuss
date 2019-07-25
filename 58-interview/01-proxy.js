// // 验证
// let validator = {
//     set: function (obj, prop, value) {
//         if (prop === 'age') {
//             if(!Number.isInteger(value)){
//                 throw new TypeError('The age is not a integer')
//             }
//         }
//         if (value > 200){
//             throw new RangeError('The age seems invalid')
//         }
//         obj[prop] = value
//     }
// }
// let person = new Proxy({}, validator);
// person.age = 120

let target = {}
let p = new Proxy(target, {
    get: function(target, property) {
        return 35
    }
})

console.log(p.a)

var person = {
    name: "张三"
  };
  
  var proxy = new Proxy(person, {
    get: function(target, property) {
      if (property in target) {
        return target[property];
      } else {
        throw new ReferenceError("Property \"" + property + "\" does not exist.");
      }
    }
  });
  
  proxy.name // "张三"
  proxy.age // 抛出一个错误

  