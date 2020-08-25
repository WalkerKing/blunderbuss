class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return 'Hello,' + this.greeting;
    }
}
let greeter = new Greeter('world');
console.log(greeter.greet());

class Animal {
    public name: string;
    public constructor(theName: string) {
        this.name = theName;
    }
    public move(distanceInmeters: number = 0) {
        console.log(`Animal moved ${distanceInmeters}.`)
    }
}
//Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

// const dog = new Dog();
// dog.bark();
// dog.move(10);
// dog.bark();

// 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInmeters = 5) {
        console.log('Slithering......');
        super.move(distanceInmeters);
    }
}
class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInmeters = 45) {
        console.log('Galloping...');
        super.move(distanceInmeters);
    }
}

let sam = new Snake('Sammy the python');
let tom: Animal = new Horse('Tommy the Palomino');
sam.move();
tom.move(34);
