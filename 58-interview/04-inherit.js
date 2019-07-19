const Animal = function () { }
Animal.prototype.species = '动物';

let Cat = function (name, color) {
    this.name = name;
    this.color = color;
}

// 如何实现继承
// 1. 构造函数绑定
Cat = function (name, color) {
    Animal.apply(this, arguments);

}

let cat = new Cat('大毛', '黄')
// console.log(cat.species);

//2. prototype模式

let Cat2 = function (name, color) {
    this.name = name;
    this.color = color;
}
// Cat2的原型对象指向Animal的实例，此时Cat2的原型对象的构造函数也指向了Animal的构造函数
Cat2.prototype = new Animal();
// 将cat2的原型的构造函数重新指回Cat2
Cat2.prototype.constructor = Cat2;
let cat2 = new Cat2('小毛', '黑');
console.log(Cat2.prototype.constructor);
console.log(cat2.constructor);
console.log(cat2.name);

// 3. 直接继承prototype
let Cat3 = function (name, color) {
    this.name = name;
    this.color = color;
}
// 与第二个方法相比，这里跳过创建Animal实例这一步
Cat3.prototype = Animal.prototype;
Cat3.prototype.constructor = Cat3;
let cat3 = new Cat3('小毛', '黑')

console.log(cat3);

// 4. 利用空对象作为中介
const extend = function (child, parent) {
    let F = function () { };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.uber = parent.prototype;
}

let Cat4 = function (name, color) {
    this.name = name;
    this.color = color;
}

extend(Cat4, Animal);
let cat4 = new Cat4('大毛', '黄色');
console.log(cat4.species);

// 5 拷贝继承
function extend2(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
}

// 使用实例找到原型对象，并修改原型对象的属性
let P = function (name, color) {
    this.name = name;
    this.color = color;
}

P.prototype = {
    place: 'Beijing'
}

P.prototype.constructor = P;

let p = new P('张三', '红');
let p2 = new P('李四', '白');
Object.getPrototypeOf(p).id = '123'

// 使用es6的class
class P2 {
    constructor(name) {
        this.name = name;
    }

    getName() {
        console.log(`My name is ${this.name}`);
    }
}
let p3 = new P2('王五')
p3.getName();

console.log('----------分割线,以下是7.1补充---所谓的圣杯模式-----------')

// 所谓的圣杯模式
const inherit = function (c, p) {
    let F = function () { };
    F.prototype = p.prototype;
    c.prototype = new F();
    c.prototype.constructor = c;
    c.uber = p.prototype;
}
let P4 = function () {
    this.pName = 123;
}
P4.prototype.getName = function () {
    console.log(this.pName)
}
let C4 = function () {
    this.cName = 123;
}

inherit(C4, P4)
let c4 = new C4();
// console.log(c4.__proto__.__proto__ === P4.prototype)

// class extends 语法糖

class Parent {
    constructor(name) {
        this.name = name;
        
    }
    static asyHello() {
        console.log(this.name)
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    sayHello() {
        console.log(this.age)
        return this.age;
    }
}

let parent = new Parent("Parent")
let child = new Child("Child", 18)
child.sayHello()

const fs = require('fs')
const path = require('path')
console.log(__dirname)
fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    console.log(entry)
    if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        
    }
}, {})