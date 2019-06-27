const Person = function (age, name) {
    this.age = age;
    this.name = name;
}

let man = new Person(10, 'Jim');

let youngMan = {};
youngMan.__proto__ = man;

console.log(man.hasOwnProperty('age'));
// 子对象的__proto__属性、构造函数的prototype属性都指向原型对象
console.log(Person.prototype === man.__proto__);
// Object.getPrototypeOf获取对象的原型对象
console.log(Person.prototype === Object.getPrototypeOf(man));
console.log(man.isPrototypeOf(youngMan))
man.age = 11;
console.log(youngMan.age);
