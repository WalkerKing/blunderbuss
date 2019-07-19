// 1. 构造函数继承
const P1 = function(pName){
    this.pName = pName;
    this.sayName = function() {
        console.log(this.pName)
    }
} 

const S1 = function() {
    P1.apply(this, arguments);
    this.sName = '子类的名字'
}

let s1 = new S1('名字');

// s1.sayName();

// 优点: 简单,可以传参,原型的引用类型属性不会被所有实例共享
// 缺点: 没有实现函数复用

// 2. 原型继承
const P2 = function(pName) {
    this.pName = pName;
    this.arr = [1,2,3,4]
    this.sayName = function() { console.log(this.pName)
    } 
}

let S2 = function() {
    this.sName = '子类的名字'
}
S2.prototype = new P2()
S2.prototype.constructor = S2;

let s21 = new S2()
s21.arr.push(5)
// console.log(s21.arr)

let s22 = new S2();
// console.log(s22.arr)

// 优点:没有优点
// 缺点:原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享。
// 创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数。

// 3. 组合方式 
let P3 = function() {

}
let S3 = function() {
    P3.apply(this, arguments)
} 
S3.prototype = new P3()
S3.prototype.constructor = S3;
// 缺点: 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
// 优点: 可以向超类传递参数
// 每个实例都有自己的属性
// 实现了函数复用

// 4. 寄生组合方式

