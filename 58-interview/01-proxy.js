// 验证
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'age') {
            if(!Number.isInteger(value)){
                throw new TypeError('The age is not a integer');
            }
        }
        if (value > 200){
            throw new RangeError('The age seems invalid')
        }
        obj[prop] = value;
    }
}
let person = new Proxy({}, validator);
person.age = 120

